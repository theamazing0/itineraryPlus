import sqlite3 as sql

conn = sql.connect('database/myData.db')

# conn.execute('''CREATE TABLE ITINERARY
#          (id INT PRIMARY KEY     NOT NULL,
#          name           TEXT    NOT NULL,
#          days STRING  NOT NULL);''')

# conn.execute('''CREATE TABLE DAY
#          (dayID INT PRIMARY KEY     NOT NULL,
#          name           TEXT    NOT NULL,
#          events  STRING NOT NULL);''')

# conn.execute('''CREATE TABLE EVENT
#          (eventID INT PRIMARY KEY     NOT NULL,
#          type             TEXT      NOT NULL,
#          timestarted      TEXT    NOT NULL,
#          timeended        TEXT    NOT NULL);''')


conn.close()