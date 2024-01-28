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

    def __exit__(self):
        self.cnx.close()

'''
DESCRIBE intramurall.users;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| userID    | int          | NO   | PRI | NULL    | auto_increment |
| firstName | varchar(255) | YES  |     | NULL    |                |
| lastName  | varchar(255) | YES  |     | NULL    |                |
| email     | varchar(255) | YES  |     | NULL    |                |
| password  | varchar(255) | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
'''