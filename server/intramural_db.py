import mysql.connector

class IntramurallDB:
    
    def __init__(self):
        self.cnx = mysql.connector.connect(user='root', password='Intramurall2024',
                                           host='localhost', database='intramurall')
        self.cursor = self.cnx.cursor()

    def registerUser(self, first_name, last_name, email, password):
        add_user = ("INSERT INTO users "
                    "(firstName, lastName, email, password) "
                    "VALUES (%(firstName)s, %(lastName)s, %(email)s, %(password)s)")
        user_data = {
            'firstName': first_name,
            'lastName': last_name,
            'email': email,
            'password': password
        }

        self.cursor.execute(add_user, user_data)
        self.cnx.commit()

    def emailExists(self, email):
        check_email = ("SELECT * FROM users WHERE email = %(email)s")
        email_data = {
            'email': email
        }
    
        self.cursor.execute(check_email, email_data)
        if not self.cursor.fetchone():
            return False
        return True

    def getPassword(self, email):
        check_email = ("SELECT password FROM users WHERE email = %(email)s")
        email_data = {
            'email': email
        }

        self.cursor.execute(check_email, email_data)
        password = self.cursor.fetchone()
        return password

    def getRole(self, email):
        check_role = ("SELECT role FROM users WHERE email = %(email)s")
        role_data = {
            'email': email
        }

        self.cursor.execute(check_role, role_data)
        role = self.cursor.fetchone()
        return role[0].strip()

    def getUserID(self, email):
        get_userID = ("SELECT userID FROM users WHERE email = %(email)s")
        data = {
            'email': email
        }

        self.cursor.execute(get_userID, data)
        userID = self.cursor.fetchone()
        return userID[0]

    def makeLeague(self, league_name, description, organization, adminID, startDate, endDate, registrationDate,sport):
        make_league = ("INSERT INTO leagues (league_name, description, organization, adminID, startDate, endDate, registrationDate, sport)"
                       "values (%(league_name)s, %(description)s, %(organization)s, %(adminID)s, %(startDate)s, %(endDate)s, %(registrationDate)s, %(sport)s)")

        league_data = {
            'league_name': league_name,
            'description': description,
            'organization': organization,
            'adminID': adminID,
            'startDate': startDate,
            'endDate': endDate,
            'registrationDate': registrationDate,
            'sport': sport
        }

        self.cursor.execute(make_league, league_data)
        self.cnx.commit()

    def getAdminLeagues(self, adminID):
        get_league = ("SELECT league_name, description, organization, startDate, endDate, registrationDate FROM leagues WHERE adminID = %(adminID)s")
        admin_data = {
            'adminID': adminID
        }

        self.cursor.execute(get_league, admin_data)
        leagues = self.cursor.fetchall()
        return leagues

    def getAdminLeague(self, adminID, league_name):
        get_league = ("SELECT league_name, description, organization, startDate, endDate, registrationDate FROM leagues WHERE adminID = %(adminID)s AND league_name = %(league_name)s")
        admin_data = {
            'adminID': adminID,
            'league_name': league_name
        }

        self.cursor.execute(get_league, admin_data)
        league = self.cursor.fetchall()
        return league

    def getSport(self, adminID, league_name):
        get_sport = ("SELECT sport FROM leagues WHERE adminID = %(adminID)s AND league_name = %(league_name)s")

        data = {
            'adminID': adminID,
            'league_name': league_name
        }

        self.cursor.execute(get_sport, data)
        sport = self.cursor.fetchone()
        sport = sport[0]
        return sport
        

    def getOrganizations(self):
        get_org = ("SELECT league_name, organization FROM leagues")

        self.cursor.execute(get_org)
        organizations = self.cursor.fetchall()
        return organizations

    def getOrganization(self, team_name, league):
        get_org = ("SELECT organization FROM teams WHERE league = %(league)s AND team_name = %(team_name)s")

        org_data = {
            'league': league,
            'team_name': team_name
        }

        self.cursor.execute(get_org, org_data)
        organization = self.cursor.fetchone()
        return organization

    def getLeague(self, league, organization):
        get_league = ("SELECT league_name, description, organization FROM leagues WHERE league_name = %(league)s"
                      "AND organization = %(organization)s")
        league_data = {
            'league': league,
            'organization': organization
        }

        self.cursor.execute(get_league, league_data)
        league_info = self.cursor.fetchall()
        return league_info

    def createTeam(self, team_name, team_captain, league, organization):
        make_team = ("INSERT INTO teams (team_name, team_captain, league, organization)"
                    "VALUES( %(team_name)s, %(team_captain)s, %(league)s, %(organization)s)")

        team_data = {
            'team_name': team_name,
            'team_captain': team_captain,
            'league': league,
            'organization': organization
        }

        self.cursor.execute(make_team, team_data)
        self.cnx.commit()

    def verifyTeamCaptain(self, team_captain, league, organization):
        check_captain = ("SELECT * FROM teams WHERE team_captain = %(team_captain)s AND league = %(league)s AND organization = %(organization)s")

        captain_data = {
            'team_captain': team_captain,
            'league': league,
            'organization': organization
        }

        self.cursor.execute(check_captain, captain_data)
        result = self.cursor.fetchall()
        if result:
            return False
        return True

    def getTeams(self, league, organization):
        get_teams = ("SELECT team_name, team_captain FROM teams WHERE league = %(league)s AND organization = %(organization)s")

        teams_data = {
            'league': league,
            'organization': organization
        }

        self.cursor.execute(get_teams, teams_data)
        teams = self.cursor.fetchall()
        return teams

    def getName(self, email):
        get_name = ("SELECT firstName, lastName FROM users WHERE email = %(email)s")

        email_data = {
            'email': email
        }

        self.cursor.execute(get_name, email_data)
        name = self.cursor.fetchall()
        return name

    def getNameViaID(self, userID):
        get_name = ("SELECT firstName, lastName FROM users WHERE userID = %(userID)s")

        user_data = {
            'userID': userID
        }

        self.cursor.execute(get_name, user_data)
        name = self.cursor.fetchall()
        return name
        
    def joinTeam(self, player, userID, team_name, league, organization):
        join_team = ("INSERT INTO teamRosters (player, userID, team_name, league, organization)"
                    "VALUES (%(player)s, %(userID)s, %(team_name)s, %(league)s, %(organization)s)")
        
        data = {
            'player': player,
            'userID': userID,
            'team_name': team_name,
            'league': league,
            'organization': organization
        }

        self.cursor.execute(join_team, data)
        self.cnx.commit()
    
    def verifyPlayer(self, name, league, organization, userID):
        verify_player = ("SELECT * FROM teamRosters WHERE "
                        "player = %(name)s AND league = %(league)s AND organization = %(organization)s AND userID = %(userID)s")
        
        player_data = {
            'name': name,
            'league': league,
            'organization': organization,
            'userID': userID
        }

        self.cursor.execute(verify_player, player_data)
        result = self.cursor.fetchall()

        # returns False if player is on another team in this league
        if result:
            return False
        return True

    def getRoster(self, team_name, league, organization):
        get_roster = ("SELECT player FROM teamRosters WHERE team_name = %(team_name)s AND league = %(league)s AND organization = %(organization)s")

        roster_data = {
            'team_name': team_name,
            'league': league,
            'organization': organization
        }

        self.cursor.execute(get_roster, roster_data)
        roster = self.cursor.fetchall()
        return roster

    def insertSchedule(self, league, adminID, schedule):
        insert_schedule = ("INSERT INTO schedules (league, adminID, schedule)"
                           "VALUES (%(league)s, %(adminID)s, %(schedule)s)")

        schedule_data = {
            'league': league,
            'adminID': adminID,
            'schedule': schedule
        }

        self.cursor.execute(insert_schedule, schedule_data)
        self.cnx.commit()
    
    def getSchedule(self, league, adminID):

        get_schedule = ("SELECT * FROM schedules WHERE league = %(league)s AND adminID = %(adminID)s")

        schedule_data = {
            'league': league,
            'adminID': adminID,
        }

        self.cursor.execute(get_schedule, schedule_data)
        schedule = self.cursor.fetchall()
        return schedule

    def getPlayerGames(self, userID):
        get_teams = ("SELECT * FROM teamRosters WHERE userID = %(userID)s")

        data = {
            'userID': userID
        }

        self.cursor.execute(get_teams, data)
        teams = self.cursor.fetchall()

        if teams == []:
            return []

        schedules = []
        teamNames = []

        for team in teams:

            teamNames.append(team[2])

            get_adminID = ("SELECT adminID FROM leagues WHERE league_name = %(league_name)s AND organization = %(organization)s")

            data = {
                'league_name': team[3],
                'organization': team[4]
            }

            self.cursor.execute(get_adminID, data)
            adminID = self.cursor.fetchone()[0]

            get_games = ("SELECT schedule FROM schedules WHERE adminID = %(adminID)s AND league = %(league)s")

            data = {
                'adminID': adminID,
                'league': team[3]
            }

            self.cursor.execute(get_games, data)
            games = self.cursor.fetchall()
            schedules.append(games)
        
        # Initialize an empty dictionary to store games grouped by date
        games_by_date = {}

        i = 0
        for inner_list in schedules:
            team_name = teamNames[i]
            if inner_list:
                json_string = inner_list[0][0]

                # Convert the JSON string to a dictionary
                game_schedule = eval(json_string)

                # Loop through the keys (dates) in the game_schedule dictionary
                for date in game_schedule.keys():
                    if date not in games_by_date:
                        games_by_date[date] = []

                    # Loop through the time slots and games on each date
                    for time, games in game_schedule[date].items():
                        for game in games:
                            if team_name in game:
                                # Append the game to the list for this date
                                games_by_date[date].append({
                                    "time": time,
                                    "teams": game
                                })
            i += 1

        return games_by_date

    def getAdminGames(self, adminID, league, team_name):
        schedules = []

        get_games = ("SELECT schedule FROM schedules WHERE adminID = %(adminID)s AND league = %(league)s")

        data = {
            'adminID': adminID,
            'league': league
        }

        self.cursor.execute(get_games, data)
        games = self.cursor.fetchall()
        schedules.append(games)
        
        # Initialize an empty dictionary to store games grouped by date
        games_by_date = {}

        i = 0
        for inner_list in schedules:
            if inner_list:
                json_string = inner_list[0][0]

                # Convert the JSON string to a dictionary
                game_schedule = eval(json_string)

                # Loop through the keys (dates) in the game_schedule dictionary
                for date in game_schedule.keys():
                    if date not in games_by_date:
                        games_by_date[date] = []

                    # Loop through the time slots and games on each date
                    for time, games in game_schedule[date].items():
                        for game in games:
                            if team_name in game:
                                # Append the game to the list for this date
                                games_by_date[date].append({
                                    "time": time,
                                    "teams": game
                                })
            i += 1

        return games_by_date

    def getTeamGames(self, organization, league, team_name):
        get_adminID = ("SELECT adminID FROM leagues WHERE league_name = %(league_name)s AND organization = %(organization)s")

        data = {
            'league_name': league,
            'organization': organization
        }

        self.cursor.execute(get_adminID, data)
        adminID = self.cursor.fetchone()[0]

        schedules = []

        get_games = ("SELECT schedule FROM schedules WHERE adminID = %(adminID)s AND league = %(league)s")

        data = {
            'adminID': adminID,
            'league': league
        }

        self.cursor.execute(get_games, data)
        games = self.cursor.fetchall()
        schedules.append(games)
        
        # Initialize an empty dictionary to store games grouped by date
        games_by_date = {}

        i = 0
        for inner_list in schedules:
            if inner_list:
                json_string = inner_list[0][0]

                # Convert the JSON string to a dictionary
                game_schedule = eval(json_string)

                # Loop through the keys (dates) in the game_schedule dictionary
                for date in game_schedule.keys():
                    if date not in games_by_date:
                        games_by_date[date] = []

                    # Loop through the time slots and games on each date
                    for time, games in game_schedule[date].items():
                        for game in games:
                            if team_name in game:
                                # Append the game to the list for this date
                                games_by_date[date].append({
                                    "time": time,
                                    "teams": game
                                })
            i += 1

        return games_by_date
        

    def getTeamsFromLeague(self, league_name, adminID):

        get_organization = ("SELECT organization FROM leagues WHERE league_name = %(league_name)s AND adminID = %(adminID)s")

        data = {
            'league_name': league_name,
            'adminID': adminID
        }

        self.cursor.execute(get_organization, data)
        org = self.cursor.fetchone()

        organization = org[0]

        get_teams = ("SELECT team_name FROM teams WHERE league = %(league_name)s AND organization = %(organization)s")

        data = {
            'league_name': league_name,
            'organization': organization
        }

        self.cursor.execute(get_teams, data)
        teams = self.cursor.fetchall()
        return teams

    def insertStats(self, player, sport, league_name, team, adminID):
        get_organization = ("SELECT organization FROM leagues WHERE league_name = %(league_name)s AND adminID = %(adminID)s")

        data = {
            'league_name': league_name,
            'adminID': adminID
        }

        self.cursor.execute(get_organization, data)
        org = self.cursor.fetchone()

        organization = org[0]

        name = player['Player']

        get_user_id = ("SELECT userID FROM teamRosters WHERE team_name = %(team)s AND player = %(name)s AND league = %(league_name)s")

        data = {
            'team': team,
            'name': name,
            'league_name': league_name
        }

        self.cursor.execute(get_user_id, data)
        userID = self.cursor.fetchone()

        userID = userID[0]

        check_stats = ("SELECT * FROM stats WHERE userID = %(userID)s AND league = %(league_name)s AND team = %(team)s")

        data = {
            'userID': userID,
            'league_name': league_name,
            'team': team
        }

        self.cursor.execute(check_stats, data)
        exists = self.cursor.fetchall()

        if not exists:
            # create new entry in stats table
            
            if sport == 'football':
                touchdowns = player["Touchdowns"]
                catches = player["Catches"]
                passing_touchdowns = player["Passing Touchdowns"]
                sacks = player["Sacks"]
                interceptions = player["Interceptions"]

                create_stats = ("INSERT INTO stats (userID, player, sport, team, league, organization, touchdowns, catches, passing_touchdowns, sacks, interceptions)"
                                "VALUES (%(userID)s, %(name)s, %(sport)s, %(team)s, %(league_name)s, %(organization)s, %(touchdowns)s, %(catches)s, %(passing_touchdowns)s, %(sacks)s, %(interceptions)s)")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization':  organization,
                    'touchdowns': touchdowns,
                    'catches': catches,
                    'passing_touchdowns': passing_touchdowns,
                    'sacks': sacks,
                    'interceptions': interceptions
                }

            elif sport == 'soccer':
                goals = player["Goals"]
                assists = player["Assists"]

                create_stats = ("INSERT INTO stats (userID, player, sport, team, league, organization, goals, assistsSoccer)"
                                "VALUES (%(userID)s, %(name)s, %(sport)s, %(team)s, %(league_name)s, %(organization)s, %(goals)s, %(assists)s)")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization':  organization,
                    'goals': goals,
                    'assists': assists
                }

            elif sport == 'basketball':
                points = player["Points"]
                rebounds = player["Rebounds"]
                assists = player["Assists"]
                steals = player["Steals"]
                blocks = player["Blocks"]

                create_stats = ("INSERT INTO stats (userID, player, sport, team, league, organization, points, rebounds, assists, steals, blocks)"
                                "VALUES (%(userID)s, %(name)s, %(sport)s, %(team)s, %(league_name)s, %(organization)s, %(points)s, %(rebounds)s, %(assists)s, %(steals)s, %(blocks)s)")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization':  organization,
                    'points': points,
                    'rebounds': rebounds,
                    'assists': assists,
                    'steals': steals,
                    'blocks': blocks
                }

            self.cursor.execute(create_stats, data)
            self.cnx.commit()

        else:
            if sport == 'football':
                touchdowns = player["Touchdowns"]
                catches = player["Catches"]
                passing_touchdowns = player["Passing Touchdowns"]
                sacks = player["Sacks"]
                interceptions = player["Interceptions"]

                update_stats = ("UPDATE stats "
                                "SET touchdowns = touchdowns + %(touchdowns)s, catches = catches + %(catches)s, passing_touchdowns = passing_touchdowns + %(passing_touchdowns)s, sacks = sacks + %(sacks)s, interceptions = interceptions + %(interceptions)s "
                                "WHERE userID = %(userID)s AND sport = %(sport)s AND league = %(league_name)s AND organization = %(organization)s AND team = %(team)s")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization': organization,
                    'touchdowns': touchdowns,
                    'catches': catches,
                    'passing_touchdowns': passing_touchdowns,
                    'sacks': sacks,
                    'interceptions': interceptions
                }

            elif sport == 'soccer':
                goals = player["Goals"]
                assists = player["Assists"]

                update_stats = ("UPDATE stats "
                                "SET goals = goals + %(goals)s, assistsSoccer = assistsSoccer + %(assists)s "
                                "WHERE userID = %(userID)s AND sport = %(sport)s AND league = %(league_name)s AND organization = %(organization)s AND team = %(team)s")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization': organization,
                    'goals': goals,
                    'assists': assists
                }

            elif sport == 'basketball':
                points = player["Points"]
                rebounds = player["Rebounds"]
                assists = player["Assists"]
                steals = player["Steals"]
                blocks = player["Blocks"]

                update_stats = ("UPDATE stats "
                                "SET points = points + %(points)s, rebounds = rebounds + %(rebounds)s, assists = assists + %(assists)s, steals = steals + %(steals)s, blocks = blocks + %(blocks)s "
                                "WHERE userID = %(userID)s AND sport = %(sport)s AND league = %(league_name)s AND organization = %(organization)s AND team = %(team)s")

                data = {
                    'userID': userID,
                    'name': name,
                    'sport': sport,
                    'team': team,
                    'league_name': league_name,
                    'organization': organization,
                    'points': points,
                    'rebounds': rebounds,
                    'assists': assists,
                    'steals': steals,
                    'blocks': blocks
                }

            self.cursor.execute(update_stats, data)
            self.cnx.commit()

            
    def getPlayerStats(self, userID):
        get_stats = ("SELECT * FROM stats WHERE userID = %(userID)s")

        data = {
            'userID': userID
        }

        self.cursor.execute(get_stats, data)
        stats = self.cursor.fetchall()

        return stats

    def getPlayerStatsAdmin(self, adminID):
        get_organization = ("SELECT organization FROM leagues WHERE adminID = %(adminID)s")

        data = {
            'adminID': adminID
        }

        self.cursor.execute(get_organization, data)
        org = self.cursor.fetchone()

        organization = org[0]

        self.cursor.fetchall()

        get_stats = ("SELECT * FROM stats WHERE organization = %(organization)s ORDER BY team")

        data = {
            'organization': organization
        }

        self.cursor.execute(get_stats, data)
        stats = self.cursor.fetchall()

        return stats

    def getLeagueLeaders(self, userID):

        get_teams = ("SELECT team_name, league, organization FROM teamRosters WHERE userID = %(userID)s")

        data = {
            'userID': userID
        }

        self.cursor.execute(get_teams, data)
        teams = self.cursor.fetchall()

        
        leaders = []
        for team in teams:
            get_sport = ("SELECT sport FROM stats WHERE userID = %(userID)s AND team = %(team)s AND league = %(league)s AND organization = %(organization)s")

            data = {
                'userID': userID,
                'team': team[0],
                'league': team[1],
                'organization': team[2]
            }

            self.cursor.execute(get_sport, data)
            sport = self.cursor.fetchone()

            sport = sport[0]

            if sport == 'football':
                sql_query = """
                SELECT
                    'football' AS sport,
                    %(team)s AS team,
                    %(league)s AS league,
                    %(organization)s AS organization,
                    (SELECT CONCAT(player, ' - ', touchdowns) FROM stats WHERE touchdowns = (SELECT MAX(touchdowns) FROM stats WHERE sport = 'football' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_touchdowns_player,
                    (SELECT CONCAT(player, ' - ', catches) FROM stats WHERE catches = (SELECT MAX(catches) FROM stats WHERE sport = 'football' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_catches_player,
                    (SELECT CONCAT(player, ' - ', passing_touchdowns) FROM stats WHERE passing_touchdowns = (SELECT MAX(passing_touchdowns) FROM stats WHERE sport = 'football' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_passing_touchdowns_player,
                    (SELECT CONCAT(player, ' - ', sacks) FROM stats WHERE sacks = (SELECT MAX(sacks) FROM stats WHERE sport = 'football' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_sacks_player,
                    (SELECT CONCAT(player, ' - ', interceptions) FROM stats WHERE interceptions = (SELECT MAX(interceptions) FROM stats WHERE sport = 'football' AND league = %(league)s AND team = %(team)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_interceptions_player;
                """

            if sport == 'soccer':
                sql_query = """
                SELECT
                    'soccer' AS sport,
                    %(team)s AS team,
                    %(league)s AS league,
                    %(organization)s AS organization,
                    (SELECT CONCAT(player, ' - ', goals) FROM stats WHERE goals = (SELECT MAX(goals) FROM stats WHERE sport = 'soccer' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_goals_player,
                    (SELECT CONCAT(player, ' - ', assistsSoccer) FROM stats WHERE assistsSoccer = (SELECT MAX(assistsSoccer) FROM stats WHERE sport = 'soccer' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_assistsSoccer_player;
                """

            if sport == 'basketball':
                sql_query = """
                SELECT
                    'basketball' AS sport,
                    %(team)s AS team,
                    %(league)s AS league,
                    %(organization)s AS organization,
                    (SELECT CONCAT(player, ' - ', points) FROM stats WHERE points = (SELECT MAX(points) FROM stats WHERE sport = 'basketball' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_points_player,
                    (SELECT CONCAT(player, ' - ', rebounds) FROM stats WHERE rebounds = (SELECT MAX(rebounds) FROM stats WHERE sport = 'basketball' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_rebounds_player,
                    (SELECT CONCAT(player, ' - ', assists) FROM stats WHERE assists = (SELECT MAX(assists) FROM stats WHERE sport = 'basketball' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_assists_player,
                    (SELECT CONCAT(player, ' - ', steals) FROM stats WHERE steals = (SELECT MAX(steals) FROM stats WHERE sport = 'basketball' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_steals_player,
                    (SELECT CONCAT(player, ' - ', blocks) FROM stats WHERE blocks = (SELECT MAX(blocks) FROM stats WHERE sport = 'basketball' AND league = %(league)s AND organization = %(organization)s) ORDER BY userID LIMIT 1) AS max_blocks_player;
                """

            data = {
                'team': team[0],
                'league': team[1],
                'organization': team[2]
            }

            self.cursor.execute(sql_query, data)
            stats = self.cursor.fetchall()
            leaders.append(stats)

        return leaders


    def getLeagueLeadersAdmin(self, adminID):

        get_leagues_query = ("SELECT league_name, organization FROM leagues WHERE adminID = %s")
        self.cursor.execute(get_leagues_query, (adminID,))
        leagues = self.cursor.fetchall()

        leaders = []
        for league in leagues:
            league_name = league[0]
            organization = league[1]

            get_teams_query = ("SELECT team_name FROM teams WHERE league = %s AND organization = %s")
            self.cursor.execute(get_teams_query, (league_name, organization))
            teams = self.cursor.fetchall()

            for team in teams:
                team_name = team[0]

                get_sport_query = ("SELECT sport FROM stats WHERE team = %s AND league = %s AND organization = %s")
                self.cursor.execute(get_sport_query, (team_name, league_name, organization))
                sport = self.cursor.fetchone()

                if sport:
                    sport = sport[0]

                    if sport == 'football':
                        sql_query = """
                        SELECT
                            'football' AS sport,
                            %s AS team,
                            %s AS league,
                            %s AS organization,
                            (SELECT CONCAT(player, ' - ', touchdowns) FROM stats WHERE touchdowns = (SELECT MAX(touchdowns) FROM stats WHERE sport = 'football' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_touchdowns_player,
                            (SELECT CONCAT(player, ' - ', catches) FROM stats WHERE catches = (SELECT MAX(catches) FROM stats WHERE sport = 'football' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_catches_player,
                            (SELECT CONCAT(player, ' - ', passing_touchdowns) FROM stats WHERE passing_touchdowns = (SELECT MAX(passing_touchdowns) FROM stats WHERE sport = 'football' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_passing_touchdowns_player,
                            (SELECT CONCAT(player, ' - ', sacks) FROM stats WHERE sacks = (SELECT MAX(sacks) FROM stats WHERE sport = 'football' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_sacks_player,
                            (SELECT CONCAT(player, ' - ', interceptions) FROM stats WHERE interceptions = (SELECT MAX(interceptions) FROM stats WHERE sport = 'football' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_interceptions_player;
                        """
                    elif sport == 'soccer':
                        sql_query = """
                        SELECT
                            'soccer' AS sport,
                            %s AS team,
                            %s AS league,
                            %s AS organization,
                            (SELECT CONCAT(player, ' - ', goals) FROM stats WHERE goals = (SELECT MAX(goals) FROM stats WHERE sport = 'soccer' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_goals_player,
                            (SELECT CONCAT(player, ' - ', assistsSoccer) FROM stats WHERE assistsSoccer = (SELECT MAX(assistsSoccer) FROM stats WHERE sport = 'soccer' AND team = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_assistsSoccer_player;
                        """
                    elif sport == 'basketball':
                        sql_query = """
                        SELECT
                            'basketball' AS sport,
                            %s AS team,
                            %s AS league,
                            %s AS organization,
                            (SELECT CONCAT(player, ' - ', points) FROM stats WHERE points = (SELECT MAX(points) FROM stats WHERE sport = 'basketball' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_points_player,
                            (SELECT CONCAT(player, ' - ', rebounds) FROM stats WHERE rebounds = (SELECT MAX(rebounds) FROM stats WHERE sport = 'basketball' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_rebounds_player,
                            (SELECT CONCAT(player, ' - ', assists) FROM stats WHERE assists = (SELECT MAX(assists) FROM stats WHERE sport = 'basketball' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_assists_player,
                            (SELECT CONCAT(player, ' - ', steals) FROM stats WHERE steals = (SELECT MAX(steals) FROM stats WHERE sport = 'basketball' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_steals_player,
                            (SELECT CONCAT(player, ' - ', blocks) FROM stats WHERE blocks = (SELECT MAX(blocks) FROM stats WHERE sport = 'basketball' AND league = %s AND organization = %s) ORDER BY userID LIMIT 1) AS max_blocks_player;
                        """
                    self.cursor.fetchall()
                    self.cursor.execute(sql_query, (team_name, league_name, organization, league_name, organization, league_name, organization, league_name, organization, league_name, organization, league_name, organization))
                    stats = self.cursor.fetchall()
                    leaders.append(stats)

        return leaders

    def getMyTeams(self, userID):

        query = ("SELECT team_name, league, organization FROM teamRosters WHERE userID = %(userID)s")

        data = {
            'userID': userID
        }

        self.cursor.execute(query, data)
        teams = self.cursor.fetchall()
        return teams

    def getMyTeamsAdmin(self, adminID):

        query = ("SELECT league_name, organization FROM leagues WHERE adminID = %(adminID)s")

        data = {
            'adminID': adminID
        }

        self.cursor.execute(query, data)
        leagues = self.cursor.fetchall()

        teams = []
        seen_teams = set()  # To keep track of unique teams
        for league in leagues:
            query = ("SELECT team_name, league, organization FROM teamRosters WHERE league = %(league)s AND organization = %(organization)s")

            data = {
                'league': league[0],
                'organization': league[1]
            }

            self.cursor.execute(query, data)
            teams_in_league = self.cursor.fetchall()
            
            for team in teams_in_league:
                team_name = team[0]
                # Check if the team has already been seen, if not, add it to the list
                if team_name not in seen_teams:
                    teams.append(team)
                    seen_teams.add(team_name)
                    
        return teams

    
    def removeSchedule(self, league, adminID):
        query = ('DELETE FROM schedules WHERE league = %(league)s AND adminID = %(adminID)s')

        data = {
            'league': league,
            'adminID': adminID
        }

        self.cursor.execute(query, data)
        self.cnx.commit()
        


    def __exit__(self):
        self.cnx.close()

'''
mysql> describe intramurall.users;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| userID    | int          | NO   | PRI | NULL    | auto_increment |
| firstName | varchar(255) | YES  |     | NULL    |                |
| lastName  | varchar(255) | YES  |     | NULL    |                |
| email     | varchar(255) | YES  |     | NULL    |                |
| password  | varchar(255) | YES  |     | NULL    |                |
| role      | varchar(255) | YES  |     | user    |                |
+-----------+--------------+------+-----+---------+----------------+
'''

'''
CREATE TABLE users (
    userID int auto_increment, 
    firstName varchar(255), 
    lastName varchar(255), 
    email varchar(255), 
    password varchar(255), 
    role varchar(255) DEFAULT 'user', 
    PRIMARY KEY (userID));
'''

'''
describe intramurall.leagues
+------------------+--------------+------+-----+---------+-------+
| Field            | Type         | Null | Key | Default | Extra |
+------------------+--------------+------+-----+---------+-------+
| league_name      | varchar(255) | YES  |     | NULL    |       |
| description      | varchar(255) | YES  |     | NULL    |       |
| organization     | varchar(255) | YES  |     | NULL    |       |
| adminID          | int          | YES  |     | NULL    |       |
| startDate        | varchar(255) | YES  |     | NULL    |       |
| endDate          | varchar(255) | YES  |     | NULL    |       |
| registrationDate | varchar(255) | YES  |     | NULL    |       |
| sport            | varchar(255) | YES  |     | NULL    |       |
+------------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE leagues (
    league_name varchar(255),
    description varchar(255),
    organization varchar(255),
    adminID int,
    startDate varchar(255),
    endDate varchar(255),
    registrationDate varchar(255)
);
'''

'''
describe intramurall.teams;
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| team_name    | varchar(255) | YES  |     | NULL    |       |
| team_captain | varchar(255) | YES  |     | NULL    |       |
| league       | varchar(255) | YES  |     | NULL    |       |
| organization | varchar(255) | YES  |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE teams (
    team_name varchar(255),
    team_captain varchar(255),
    league varchar(255),
    organization varchar(255)
);
'''

'''
describe intramurall.teamRosters;
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| player       | varchar(255) | YES  |     | NULL    |       |
| userID       | int          | YES  |     | NULL    |       |
| team_name    | varchar(255) | YES  |     | NULL    |       |
| league       | varchar(255) | YES  |     | NULL    |       |
| organization | varchar(255) | YES  |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE teamRosters (
    player varchar(255),
    userID int,
    team_name varchar(255),
    league varchar(255),
    organization varchar(255)
);
'''

'''
describe intramurall.schedules;
+----------+---------------+------+-----+---------+-------+
| Field    | Type          | Null | Key | Default | Extra |
+----------+---------------+------+-----+---------+-------+
| league   | varchar(255)  | YES  |     | NULL    |       |
| adminId  | int           | YES  |     | NULL    |       |
| schedule | JSON          | YES  |     | NULL    |       |
+----------+---------------+------+-----+---------+-------+
3 rows in set (0.03 sec)
'''

'''
CREATE TABLE schedules (
    league varchar(255),
    adminId int,
    schedule JSON
);
'''

'''
describe intramurall.stats;
+--------------------+--------------+------+-----+---------+-------+
| Field              | Type         | Null | Key | Default | Extra |
+--------------------+--------------+------+-----+---------+-------+
| userID             | int          | YES  |     | NULL    |       |
| player             | varchar(255) | YES  |     | NULL    |       |
| sport              | varchar(255) | YES  |     | NULL    |       |
| team               | varchar(255) | YES  |     | NULL    |       |
| league             | varchar(255) | YES  |     | NULL    |       |
| organization       | varchar(255) | YES  |     | NULL    |       |
| touchdowns         | int          | YES  |     | NULL    |       |
| catches            | int          | YES  |     | NULL    |       |
| passing_touchdowns | int          | YES  |     | NULL    |       |
| sacks              | int          | YES  |     | NULL    |       |
| interceptions      | int          | YES  |     | NULL    |       |
| goals              | int          | YES  |     | NULL    |       |
| assistsSoccer      | int          | YES  |     | NULL    |       |
| points             | int          | YES  |     | NULL    |       |
| rebounds           | int          | YES  |     | NULL    |       |
| assists            | int          | YES  |     | NULL    |       |
| steals             | int          | YES  |     | NULL    |       |
| blocks             | int          | YES  |     | NULL    |       |
+--------------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE stats (
    userID int,
    player varchar(255),
    sport varchar(255),
    team varchar(255),
    league varchar(255),
    organization varchar(255),
    touchdowns int,
    catches int,
    passing_touchdowns int,
    sacks int,
    interceptions int,
    goals int,
    assistsSoccer int,
    points int,
    rebounds int,
    assists int,
    steals int,
    blocks int
);
'''