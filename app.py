from flask import Flask, render_template, request, session
import sqlite3
import json

app = Flask('__name__')
app.secret_key = '(svfq%$&$*&%^&'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

myName = None

# * Routes


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/itinerary')
def itinerary():
    global myName
    itineraryInUseID = session['itineraryInUse']
    print(itineraryInUseID)
    conn = sqlite3.connect('database/myData.db')
    itineraryInUseForHtml = conn.execute(
        "SELECT id, name from ITINERARY")
    for row in itineraryInUseForHtml:
        if row[0] == int(itineraryInUseID):
            myName = row[1]

    usedDays = conn.execute(
        "SELECT dayid, itineraryid, name, description from DAY where itineraryid = ?", (itineraryInUseID,))

    class Day():
        def __init__(self, dayrow, eventrows):
            self.dayrow = dayrow
            self.eventrows = eventrows

    myDays = []

    for row in usedDays:
        usedEvents = conn.execute(
            "SELECT dayID, type, timestarted, timeended, eventid from EVENT where dayID = " + str(row[0]))
        usedSerializableEvents = []
        for eventrow in usedEvents:
            usedSerializableEvents.append(eventrow)
        newDay = Day(row, usedSerializableEvents)
        myDays.append(newDay.__dict__)

    # allEvents = conn.execute(
    #     "SELECT dayID, type, timestarted, timeended, eventid from EVENT")

    # for row in allDays:
    #     if row[1] == int(itineraryInUseID):
    #         myEvents = []
    #         print("rowcount of allEvents: ")
    #         for eventrow in allEvents:
    #             if eventrow[0] == row[0]:
    #                 myEvents.append(eventrow)
    #         newDay = Day(row, myEvents)
    #         myDays.append(newDay.__dict__)
    #         print("One Used Day Over")
    #     print("One Day Over")

    dumpeddays = json.dumps(myDays)
    loadedDays = json.loads(dumpeddays)
    print(loadedDays)

    conn.close()

    return render_template('itinerary.html', itineraryInUseID=itineraryInUseID, myName=myName, myDays=loadedDays)


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

    conn.close()

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

    conn.execute("""INSERT INTO ITINERARY (id, name) \
      VALUES (?, ?)""", (currentId, name))
    conn.execute("""INSERT INTO DAY (dayid,itineraryid, name, description, inUse) \
      VALUES (?, ?, ?, ?, ?)""", (currentdayid, currentId, 'Day 1', 'Travel Day', 0))
    conn.execute("""INSERT INTO EVENT (dayID, type, timestarted, timeended, eventid, inUse) \
      VALUES (?, ?, ?, ?, ?, ?)""", (currentdayid, 'Travel', '7:00 AM', '8:00 AM', currenteventid, 0))

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

    conn.close()

    return "thisreturnstatementdoesnotmatter"


@app.route('/finalOpenModalOpener')
def finalOpenModalOpener(methods=['GET', 'POST']):
    id = request.args.get('id')
    print('id from request:  '+id)

    session['itineraryInUse'] = id

    return "thisreturnstatementdoesnotmatter"


@app.route('/finalAddDayModalAdder')
def finalAddDayModalAdder(methods=['GET', 'POST']):
    name = request.args.get('name')
    print('name from request:  '+name)

    description = request.args.get('description')
    print('description from request:  '+description)

    myInteneraryID = request.args.get('myInteneraryID')
    print('myInteneraryID from request:  '+myInteneraryID)

    conn = sqlite3.connect('database/myData.db')

    cursordayid = conn.execute("SELECT currentdayID from CURRENTDAY")
    for row in cursordayid:
        print("CurrentdayID is ", row[0])
        currentdayid = str(row[0])

    conn.execute("INSERT INTO DAY (dayid,itineraryid, name, description, inUse) \
      VALUES (?, ?, ?, ?, ?)", (currentdayid, myInteneraryID, name, description, 0))

    newcurrentdayid = str(int(currentdayid) + 1)

    conn.execute("UPDATE CURRENTDAY set currentdayID = ? where currentdayID = ?",
                 (newcurrentdayid, currentdayid))

    conn.commit()

    conn.close()

    return "thisreturnstatementdoesnotmatter"


@app.route('/finalDayDelete')
def finalDayDelete(methods=['GET', 'POST']):
    dayToDeleteID = request.args.get('dayToDeleteID')
    print('dayToDeleteID from request: ' + dayToDeleteID)

    conn = sqlite3.connect('database/myData.db')

    conn.execute("UPDATE DAY set inUse = ? where dayid = ?",
                 (1, dayToDeleteID))

    conn.execute("DELETE from DAY where inUse = 1")

    conn.commit()
    # deleteDaySubstitutionArray = (dayToDeleteID,)

    # conn.execute(deleteDaySQL, deleteDaySubstitutionArray)

    conn.close()

    return('thisreturnstatementdoesnotmatter')


@app.route('/addEvent')
def addtask(methods=['GET', 'POST']):

    # Ajax
    dayid = request.args.get('dayid')
    print('dayid from request:  '+dayid)
    eventType = request.args.get('eventType')
    print('eventType from request:  '+eventType)
    timeStarted = request.args.get('timeStarted')
    print('timeStarted from request:  '+timeStarted)
    timeEnded = request.args.get('timeEnded')
    print('timeEnded from request:  '+timeEnded)

    # Sqlite
    conn = sqlite3.connect('database/myData.db')

    cursoreventid = conn.execute("SELECT currenteventID from CURRENTEVENT")
    for row in cursoreventid:
        print("CurrenteventID is ", row[0])
        currenteventid = str(row[0])

    conn.execute("""INSERT INTO EVENT (dayID, type, timestarted, timeended, eventid, inUse) \
      VALUES (?, ?, ?, ?, ?, ?)""", (dayid, eventType, timeStarted, timeEnded, currenteventid, '0'))

    newcurrenteventid = str(int(currenteventid) + 1)

    conn.execute("UPDATE CURRENTEVENT set currenteventID = ? where currenteventID = ?",
                 (newcurrenteventid, currenteventid))

    conn.commit()

    conn.close()

    return "thisreturnstatementdoesnotmatter"

@app.route('/finalEventDelete')
def finalEventDelete(methods=['GET', 'POST']):
    eventToDeleteID = request.args.get('eventToDeleteID')
    print('eventToDeleteID from request: ' + eventToDeleteID)

    conn = sqlite3.connect('database/myData.db')

    conn.execute("UPDATE EVENT set inUse = ? where eventid = ?",
                 (1, eventToDeleteID))

    conn.execute("DELETE from EVENT where inUse = 1")

    conn.commit()
    # deleteDaySubstitutionArray = (dayToDeleteID,)

    # conn.execute(deleteDaySQL, deleteDaySubstitutionArray)

    conn.close()

    return('thisreturnstatementdoesnotmatter')

@app.route('/getItineraries')
def getItineraries(methods=['GET', 'POST']):
    conn = sqlite3.connect('database/myData.db')
    cursor = conn.execute("SELECT id, name from ITINERARY")

    jsonSerializableItineraries = []

    for itineraryRow in cursor:
            jsonSerializableItineraries.append(itineraryRow)

    dumpedItineraries = json.dumps(jsonSerializableItineraries)
    loadedItineraries = json.loads(dumpedItineraries)

    conn.close()

    return str(loadedItineraries)



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
