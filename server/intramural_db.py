import mysql.connector

cnx = mysql.connector.connect(user='CRAdmin', password='Intramurall2024',
                              host='DESKTOP-DIDQ397', database='intramurall')
cursor = cnx.cursor()
cnx.close()