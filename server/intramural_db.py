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

    def makeLeague(self, league_name, description, organization, adminID):
        make_league = ("INSERT INTO leagues (league_name, description, organization, adminID)"
                       "values (%(league_name)s, %(description)s, %(organization)s, %(adminID)s)")

        league_data = {
            'league_name': league_name,
            'description': description,
            'organization': organization,
            'adminID': adminID
        }

        self.cursor.execute(make_league, league_data)
        self.cnx.commit()

    def getAdminLeagues(self, adminID):
        get_league = ("SELECT league_name, description, organization FROM leagues WHERE adminID = %(adminID)s")
        admin_data = {
            'adminID': adminID
        }

        self.cursor.execute(get_league, admin_data)
        leagues = self.cursor.fetchall()
        return leagues

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
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| league_name  | varchar(255) | YES  |     | NULL    |       |
| description  | varchar(255) | YES  |     | NULL    |       |
| organization | varchar(255) | YES  |     | NULL    |       |
| adminID      | int          | YES  |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE leagues (
    league_name varchar(255),
    description varchar(255),
    organization varchar(255),
    adminID int
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