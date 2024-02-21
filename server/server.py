from flask import Flask, request, g, send_file
from intramural_db import IntramurallDB
from passlib.hash import bcrypt
from session_store import SessionStore

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

@app.route("/<path:path>")
def load_page(path):
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
    adminID = g.session_data["admin_id"]
    print("adminID:", adminID)

    db = IntramurallDB()
    db.makeLeague(league_name, description, organization, adminID)
    return "Created league", 201

@app.route("/leagues", methods=["GET"])
def get_league():
    league = request.args.get("league")
    organization = request.args.get("organization")
    db = IntramurallDB()
    league_info = db.getLeague(league, organization)
    print(league_info)
    return league_info, 200

@app.route("/admin-leagues", methods=["GET"])
def getAdminLeagues():
    adminID = g.session_data["admin_id"]
    db = IntramurallDB()
    leagues = db.getAdminLeagues(adminID)
    print(leagues)
    return leagues, 200

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

    '''
        TODO
        -verify email is the same as the user logged in
    '''
    
    db = IntramurallDB()
    if not db.verifyTeamCaptain(email, league, organization):
        return "Already Created Team", 405
    
    #if not db.verifyTeamName(teamName, league, organization):
        #return "Team Name Already In Use", 405

    db.createTeam(teamName, email, league, organization)
    return "Created team", 201

def main():
    app.run(port=8080)

if __name__ == '__main__':
    main()