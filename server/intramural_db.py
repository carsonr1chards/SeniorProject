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

    def makeLeague(self, league_name, description, adminID):
        make_league = ("INSERT INTO leagues (league_name, description, adminID)"
                       "values (%(league_name)s, %(description)s, %(adminID)s)")

        league_data = {
            'league_name': league_name,
            'description': description,
            'adminID': adminID
        }

        self.cursor.execute(make_league, league_data)
        self.cnx.commit()

    def getAdminLeagues(self, adminID):
        get_league = ("SELECT league_name, description FROM leagues WHERE adminID = %(adminID)s")
        admin_data = {
            'adminID': adminID
        }

        self.cursor.execute(get_league, admin_data)
        leagues = self.cursor.fetchall()
        return leagues

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
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| league_name | varchar(255) | YES  |     | NULL    |       |
| description | varchar(255) | YES  |     | NULL    |       |
| adminID     | int          | YES  |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
'''

'''
CREATE TABLE leagues (
    league_name varchar 255,
    description varchar 255,
    adminID int
);
'''