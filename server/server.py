from flask import Flask, request, g, send_file, jsonify, session
from intramural_db import IntramurallDB
from passlib.hash import bcrypt
from session_store import SessionStore
from datetime import datetime, timedelta
import random
import json
import itertools
from waitress import serve

session_store = SessionStore()

class MyFlask(Flask):
    def add_url_rule(self, rule, endpoint=None, view_func=None, **options):
        return super().add_url_rule(rule, endpoint, view_func, provide_automatic_options=False, **options)

def load_session_data():
    print("the cookies:", request.cookies)

    # load the session ID from cookie data
    session_id = request.cookies.get("session_id")

    # if the session ID is present:
    if session_id:
        # load the session data using the session ID
        session_data = session_store.getSession(session_id)
        
    # if the session ID is missing or invalid:
    if session_id == None or session_data == None:
        # create a new session & session ID
        session_id = session_store.createSession()
        # load the session using the session ID
        session_data = session_store.getSession(session_id)

    # save the session ID and session data for use in other functions
    g.session_id = session_id
    g.session_data = session_data

app = MyFlask(__name__)

@app.before_request
def before_request_fun():
    load_session_data()

@app.after_request
def after_request_func(response):
    response.set_cookie("session_id", g.session_id, samesite="None", secure=True)
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
    response.headers["Access-Control-Allow-Credentials"] =  "true"
    return response

@app.route("/")
def load_page():
    return send_file("../client/index.html")

@app.route("/<path:path>")
def load_files(path):
    print("the path:", path)
    if path:
        return send_file("../client/" + path)

@app.route("/favicon.ico")
def return_icon():
    return send_file("../client/images/favicon.ico")

@app.route("/users", methods=["GET"])
def retrieve_users_collection():
    if "user_session_id" not in g.session_data:
        return "Unauthorized", 401
    return "Authorized", 200

@app.route("/users", methods=["POST"])
def create_in_users_collection():
    print("the request data is:", request.form)
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    password = request.form["password"]

    password = bcrypt.hash(password)

    db = IntramurallDB()
    if not db.emailExists(email):
        db.registerUser(first_name, last_name, email, password)
        return "Created", 201
    return "Duplicate", 422

@app.route("/sessions", methods=["POST"])
def authenticate_user():
    email = request.form["email"]
    password = request.form["password"]
    db = IntramurallDB()
    if db.emailExists(email):
        pw = db.getPassword(email)
        pw = pw[0]
        if bcrypt.verify(password, pw):
            g.session_data["user_session_id"] = g.session_id
            if db.getRole(email) == 'admin':
                g.session_data["role"] = 'admin'
                g.session_data["admin_id"] = db.getUserID(email)
            else:
                g.session_data["role"] = 'user'
                g.session_data["user_id"] = db.getUserID(email)
            return "Logged in", 201
        else:
            return "Unable to authenticate", 401
    else:
        return "Unable to authenticate", 401

@app.route("/logout", methods=["POST"])
def logout_user():
    print(g.session_data)
    if "user_session_id" in g.session_data:
        del g.session_data["user_session_id"]
        if g.session_data["role"] == "admin":
            del g.session_data["admin_id"]
        else:
            del g.session_data["user_id"]
        del g.session_data["role"]
        return "Logged out", 201
    return "Unable to log out", 401

@app.route("/roles", methods=["POST"])
def get_role():
    if g.session_data["role"] == 'admin':
        return "Role: admin", 201
    return "Role: user", 401

@app.route("/leagues", methods=["POST"])
def make_league():
    league_name = request.form["league_name"]
    description = request.form["description"]
    organization = request.form["organization"]
    startDate = request.form["startDate"]
    endDate = request.form["endDate"]
    registration = request.form["registration"]
    sport = request.form["sport"]
    adminID = g.session_data["admin_id"]
    print("adminID:", adminID)

    db = IntramurallDB()
    db.makeLeague(league_name, description, organization, adminID, startDate, endDate, registration, sport)
    return "Created league", 201

@app.route("/leagues", methods=["GET"])
def get_league():
    league = request.args.get("league")
    organization = request.args.get("organization")
    db = IntramurallDB()
    league_info = db.getLeague(league, organization)
    return league_info, 200

@app.route("/admin-leagues", methods=["GET"])
def getAdminLeagues():
    adminID = g.session_data["admin_id"]
    if not adminID:
        return "Unauthorized", 401
    db = IntramurallDB()
    leagues = db.getAdminLeagues(adminID)
    print(leagues)
    return leagues, 200

@app.route("/admin-leagues", methods=["DELETE"])
def removeAdminLeague():
    adminID = g.session_data["admin_id"]
    if not adminID:
        return "Unauthorized", 401
    
    league = request.args.get('league')
    organization = request.args.get('organization')

    if league and organization:
        db = IntramurallDB()
        leagueExists = db.getAdminLeague(adminID, league)

        if leagueExists:
            db.removeAdminLeague(adminID, league, organization)
            return "Removed league", 200

    return "Unauthorized", 401

@app.route("/admin-leagues/<league>", methods=["GET"])
def getAdminLeague(league):
    adminID = g.session_data["admin_id"]
    db = IntramurallDB()
    league = db.getAdminLeague(adminID, league)
    print(league)
    return league, 200

@app.route("/sports", methods=["GET"])
def getSport():
    league = request.args.get("league")
    adminID = g.session_data["admin_id"]
    if not adminID:
        return 401, "Unauthorized"
    
    db = IntramurallDB()
    sport = db.getSport(adminID, league)
    print("The sport is:", sport)
    data = []
    data.append(sport)
    return data, 200

@app.route("/organizations", methods=["GET"])
def getOrganizations():
    db = IntramurallDB()
    organizations = db.getOrganizations()
    return organizations, 200

@app.route("/teams", methods=['POST'])
def createTeam():
    teamName = request.form['team_name']
    email = request.form['email']
    league = request.form['league']
    organization = request.form['organization']
    user_id = g.session_data["user_id"]


    '''
        TODO
        -verify email is the same as the user logged in
        -verify team name is unique within the league
    '''

    db = IntramurallDB()
    player = db.getNameViaID(user_id)
    playerName = player[0][0] + ' ' + player[0][1]
    if not db.verifyTeamCaptain(email, league, organization):
        return "Already Created Team", 401

    #if not db.verifyTeamName(teamName, league, organization):
        #return "Team Name Already In Use", 401

    db.createTeam(teamName, email, league, organization)
    db.joinTeam(playerName, user_id, teamName, league, organization)
    return "Created team", 201

@app.route("/teams", methods=["GET"])
def getTeams():
    league = request.args.get("league")
    organization = request.args.get("organization")

    db = IntramurallDB()

    # Check if organization parameter is included
    if organization:
        teams = db.getTeams(league, organization)
        if teams:
            i = 0
            for team in teams:
                name = db.getName(teams[i][1])
                teams[i] = list(teams[i])
                if name:
                    teams[i][1] = name[0][0] + " " + name[0][1]
                i += 1
            return teams, 200
        return "Unable to find requested teams", 404
    else:
        adminID = g.session_data["admin_id"]
        if not adminID:
            return 401, "Unauthorized"

        teams = db.getTeamsFromLeague(league, adminID)
        if teams:
            return teams, 200
        else:
            return "Unable to find requested teams", 404

@app.route('/rosters', methods=["POST"])
def joinTeam():
    team_name = request.form['team_name']
    league = request.form['league']

    db = IntramurallDB()
    organization = db.getOrganization(team_name, league)
    organization = organization[0]
    print("Organization: ", organization)
    user_id = g.session_data["user_id"]
    player = db.getNameViaID(user_id)
    playerName = player[0][0] + ' ' + player[0][1]

    # checks if player is already on a team in this league
    if db.verifyPlayer(playerName, league, organization, user_id):
        db.joinTeam(playerName, user_id, team_name, league, organization)
        return "Joined team", 201
    return "Unauthorized", 401
    

@app.route('/rosters', methods =["GET"])
def getRoster():
    team = request.args.get('team')
    league = request.args.get('league')
    organization = request.args.get('organization')

    db = IntramurallDB()
    
    if not organization:
        organization = db.getOrganization(team, league)
        organization = organization[0]

    print(team, league, organization)

    roster = db.getRoster(team, league, organization)
    if roster:
        return roster, 200
    else:
        return "Unable to locate roster", 404


def schedule_games(teams, dates, times, num_fields):
    teams_games_count = {team[0]: 0 for team in teams}

    for date in dates:
        random.shuffle(teams)
        teams_remaining = teams[:]

        for time in times:
            dates[date][time] = []

            # Schedule games according to the number of available fields
            for _ in range(num_fields):
                if len(teams_remaining) >= 2:
                    team1 = teams_remaining.pop()
                    team2 = teams_remaining.pop(0) if teams_remaining else None
                    dates[date][time].append((team1[0], team2[0] if team2 else None))
                    teams_games_count[team1[0]] += 1
                    if team2:
                        teams_games_count[team2[0]] += 1
                else:
                    break  # No more teams left to schedule

                if not teams_remaining:
                    break  # No more teams left to schedule

    return teams_games_count

def create_schedules(start_date, end_date, days, num_fields, start_time, end_time, league, organization):
    start_time = datetime.strptime(start_time, '%H:%M')
    end_time = datetime.strptime(end_time, '%H:%M')
    times = [start_time.strftime('%H:%M')]
    current_time = start_time
    while current_time < end_time:
        current_time += timedelta(hours=1)
        times.append(current_time.strftime('%H:%M'))

    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    date_range = [start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)]
    dates = {date.strftime('%Y-%m-%d'): {} for date in date_range if date.weekday() in days}

    db = IntramurallDB()
    teams = db.getTeams(league, organization)

    if num_fields * len(times) < len(teams):
        raise ValueError("Not enough fields available to schedule all teams.")

    teams_games_count = schedule_games(teams, dates, times, num_fields)

    return dates, teams_games_count

@app.route('/schedules', methods=["POST"])
def create_schedules_endpoint():
    start_date = request.form['start_date']
    end_date = request.form['end_date']
    days = json.loads(request.form['days'])  # Parse JSON string to list
    num_fields = int(request.form['num_fields'])
    start_time = request.form['start_time']
    end_time = request.form['end_time']
    league = request.form['league']
    organization = request.form['organization']

    schedule, teams_games_count = create_schedules(start_date, end_date, days, num_fields, start_time, end_time, league, organization)
    
    print("Schedules:")
    print(schedule)
    print("\nNumber of games for each team:")
    for team, games_count in teams_games_count.items():
        print(f"{team}: {games_count} games")

    adminID = g.session_data["admin_id"]
    if not adminID:
        return "Unauthorized", 401
    
    schedule = json.dumps(schedule)
    db = IntramurallDB()
    db.insertSchedule(league, adminID, schedule)
    # dbschedules = db.getSchedules()
    # print(dbschedules)
    return "Created schedule", 201

@app.route('/schedules', methods=["DELETE"])
def delete_schedules_endpoint():
    league = request.args.get('league')
    adminID = g.session_data['admin_id']

    if adminID and league:
        db = IntramurallDB()
        schedule = db.getSchedule(league, adminID)
        if schedule:
            db.removeSchedule(league, adminID)
            return "Removed schedule", 200

        else:
            return "Schedule not found", 404
    else:
        return 'Unauthorized', 401

@app.route('/schedules/<string:league>', methods=["GET"])
def get_schedule(league):
    adminID = g.session_data.get("admin_id")
    if not adminID:
        return "Unauthorized", 401

    db = IntramurallDB() 
    schedule = db.getSchedule(league, adminID)
    
    if schedule:
        return schedule, 200
    return jsonify({}), 200

@app.route('/users/games', methods=["GET"])
def get_users_games():
    team = request.args.get('team')
    league = request.args.get('league')
    organization = request.args.get('organization')

    db = IntramurallDB()

    if not organization and (team and league):
        organization = db.getOrganization(team, league)
        organization = organization[0]

    if g.session_data['role'] == 'admin':
        return [], 200

    userID = g.session_data["user_id"]
    if not userID:
        return "Unauthorized", 401

    games = db.getPlayerGames(userID)

    return games, 200

@app.route('/games', methods=["GET"])
def get_games():
    team = request.args.get('team')
    league = request.args.get('league')
    organization = request.args.get('organization')

    db = IntramurallDB()

    if not organization and (team and league):
        organization = db.getOrganization(team, league)
        organization = organization[0]

    if g.session_data["role"] == "admin":
        if team and league and organization:

            adminID = g.session_data["admin_id"]
            db = IntramurallDB()
            games = db.getAdminGames(adminID, league, team)
            games = remove_games_without_team(games, team)
            return games, 200
            
        else:
            return [], 200

    userID = g.session_data["user_id"]
    if not userID:
        return "Unauthorized", 401

    games = db.getTeamGames(organization, league, team)

    if team and league and organization:
        games = remove_games_without_team(games, team)

    return games, 200

def remove_games_without_team(schedule, team_name):
    print("The schedule is:", schedule)
    updated_schedule = {}
    for date, games in schedule.items():
        updated_games = []
        for game in games:
            if team_name in game['teams']:
                updated_games.append(game)
        if updated_games:
            updated_schedule[date] = updated_games
    return updated_schedule

@app.route('/stats', methods=["POST"])
def add_stats():
    if g.session_data["role"] != 'admin':
        return "Unauthorized", 401

    adminID = g.session_data['admin_id']
    sport = request.args.get('sport')
    league = request.args.get('league')
    team = request.args.get('team')
    
    db = IntramurallDB()

    for player in request.json:
        db.insertStats(player, sport, league, team, adminID)
    return "Stats updated", 201

@app.route('/stats', methods=["GET"])
def get_stats():
    if g.session_data["role"] == 'admin':
        adminID = g.session_data['admin_id']
        db = IntramurallDB()
        stats = db.getPlayerStatsAdmin(adminID)
        return stats, 200
        
    else:
        # only returns the stats that pertain to said user
        userID = g.session_data['user_id']
        if not userID:
            return "Unauthorized", 401

        db = IntramurallDB()
        playerStats = db.getPlayerStats(userID)

        return playerStats, 200

@app.route('/stats/leaders', methods=["GET"])
def get_stat_leaders():
    if g.session_data["role"] == 'admin':
        # if user is an admin, returns the stats for all leagues they are admin of
        adminID = g.session_data['admin_id']
        db = IntramurallDB()
        stats = db.getLeagueLeadersAdmin(adminID)
        return stats, 200
    else:
        # only returns the stats that pertain to said user
        userID = g.session_data['user_id']
        if not userID:
            return "Unauthorized", 401

        db = IntramurallDB()
        leagueLeaders = db.getLeagueLeaders(userID)
        return leagueLeaders, 200

@app.route('/teams/myteams', methods=["GET"])
def get_my_teams():
    if g.session_data["role"] == 'admin':
        # if user is an admin, returns the teams for all leagues they are admin of
        adminID = g.session_data['admin_id']
        db = IntramurallDB()
        teams = db.getMyTeamsAdmin(adminID)
        return teams, 200
    else:
        # only returns the stats that pertain to said user
        userID = g.session_data['user_id']
        if not userID:
            return "Unauthorized", 401

        db = IntramurallDB()
        teams = db.getMyTeams(userID)
        print(teams)
        return teams, 200

def main():
    serve(app, host='0.0.0.0', port=8080)

if __name__ == '__main__':
    main()