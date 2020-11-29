import sqlite3 as sql

conn = sql.connect('database/myData.db')

# conn.execute('''CREATE TABLE ITINERARY
#           (id INT PRIMARY KEY     NOT NULL,
#           name           TEXT    NOT NULL);''')

# conn.execute('''CREATE TABLE DAY
#         (dayid INT PRIMARY KEY  NOT NULL,
#         itineraryid INT NOT NULL,  
#         name           TEXT    NOT NULL);''')

# conn.execute('''CREATE TABLE EVENT
#           (dayID         INT     NOT NULL,
#           type             TEXT      NOT NULL,
#           timestarted      TEXT    NOT NULL,
#           timeended        TEXT    NOT NULL,
#           eventid         INT  PRIMARY KEY    NOT NULL);''')

# conn.execute('''CREATE TABLE CURRENT
#           (currentID INT  NOT NULL);''')

# conn.execute('''CREATE TABLE CURRENTDAY
#           (currentdayID INT  NOT NULL);''')

# conn.execute('''CREATE TABLE CURRENTEVENT
#           (currenteventID INT  NOT NULL);''')

# conn.execute("INSERT INTO CURRENT (currentID) \
#       VALUES (1)")

# conn.execute("INSERT INTO CURRENTDAY (currentdayID) \
#       VALUES (1)")

# conn.execute("INSERT INTO CURRENTEVENT (currenteventID) \
#       VALUES (1)")

# conn.commit()

conn.close()