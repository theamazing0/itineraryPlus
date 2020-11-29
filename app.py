from flask import Flask, render_template, request, session
import sqlite3

app = Flask('__name__')
app.secret_key = '(svfq%$&$*&%^&'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# * Routes


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/itinerary')
def itinerary():
    itineraryInUseID = session['itineraryInUse']
    print(itineraryInUseID)
    conn = sqlite3.connect('database/myData.db')
    itineraryInUseForHtml = conn.execute(
        "SELECT id, name from ITINERARY")
    for row in itineraryInUseForHtml:
        if row[0] == int(itineraryInUseID):
            myName = row[1]
    return render_template('itinerary.html', itineraryInUseID=itineraryInUseID, myName = myName)


@app.route('/getuniqueid')
def getuniqueid(methods=['GET', 'POST']):
    givemethenextid = request.args.get('givemethenextid')
    print('givemethenextid from request:  '+givemethenextid)
    if givemethenextid == 'true':
        conn = sqlite3.connect('database/myData.db')
        cursor = conn.execute("SELECT currentID from CURRENT")
        for row in cursor:
            print("CurrentID is ", row[0])
            currentId = str(row[0])

    return currentId


@app.route('/finaladdbutton')
def finaladdbutton(methods=['GET', 'POST']):
    name = request.args.get('name')
    print('name from request:  '+name)
    conn = sqlite3.connect('database/myData.db')

    cursorcurrentid = conn.execute("SELECT currentID from CURRENT")
    for row in cursorcurrentid:
        print("CurrentID is ", row[0])
        currentId = str(row[0])
    cursordayid = conn.execute("SELECT currentdayID from CURRENTDAY")
    for row in cursordayid:
        print("CurrentdayID is ", row[0])
        currentdayid = str(row[0])
    cursoreventid = conn.execute("SELECT currenteventID from CURRENTEVENT")
    for row in cursoreventid:
        print("CurrenteventID is ", row[0])
        currenteventid = str(row[0])

    conn.execute("INSERT INTO ITINERARY (id, name) \
      VALUES (?, ?)", (currentId, name))
    conn.execute("INSERT INTO DAY (dayid,itineraryid, name) \
      VALUES (?, ?, ?)", (currentdayid, currentId, 'Day 1'))
    conn.execute("INSERT INTO EVENT (dayID, type, timestarted, timeended, eventid) \
      VALUES (?, ?, ?, ?, ?)", (currentdayid, 'Travel', '7:00 AM EST', '8:00 AM EST', currenteventid))

    newcurrentid = str(int(currentId) + 1)
    newcurrentdayid = str(int(currentdayid) + 1)
    newcurrenteventid = str(int(currenteventid) + 1)

    conn.execute("UPDATE CURRENT set currentID = ? where currentID = ?",
                 (newcurrentid, currentId))
    conn.execute("UPDATE CURRENTDAY set currentdayID = ? where currentdayID = ?",
                 (newcurrentdayid, currentdayid))
    conn.execute("UPDATE CURRENTEVENT set currenteventID = ? where currenteventID = ?",
                 (newcurrenteventid, currenteventid))

    conn.commit()

    session['itineraryInUse'] = currentId

    return "thisreturnstatementdoesnotmatter"


if __name__ == '__main__':
    # ! Remove debug = True after development
    app.run(debug=True, host='0.0.0.0')

# * Ajax Template
# @app.route('/ajaxroute') #! Add Route
# def addtask(methods=['GET', 'POST']):
#     name = request.args.get('ARGUMENT') #! Get an Argument
#     print('ARGUMENT from request:  '+name)
#     conn = sql.connect('todo.db')
#     return "thisreturnstatementdoesnotmatter"
