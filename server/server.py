from flask import Flask, request, g
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
            g.session_data["user_id"] = g.session_id
            return "Logged in", 201
        else:
            return "Unable to authenticate", 401
    else:
        return "Unable to authenticate", 401



def main():
    app.run(port=8080)

if __name__ == '__main__':
    main()