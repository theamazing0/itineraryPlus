from flask import Flask, render_template, request
import sqlite3 as sql

app = Flask('__name__')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# * Routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getuniqueid')
def getuniqueid(methods=['GET', 'POST']):
    givemethenextid = request.args.get('givemethenextid')
    print('givemethenextid from request:  '+givemethenextid)
    if givemethenextid == 'true' :
        conn = sql.connect('database/myData.db')
        cursor = conn.execute("SELECT currentID from CURRENT")
        for row in cursor:
            print ("CurrentID is ", row[0])
            currentId = str(row[0])

    return currentId

# TODO Route itinerary.html

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0') # ! Remove debug = True after development

# * Ajax Template
# @app.route('/ajaxroute') #! Add Route
# def addtask(methods=['GET', 'POST']):
#     name = request.args.get('ARGUMENT') #! Get an Argument
#     print('ARGUMENT from request:  '+name)
#     conn = sql.connect('todo.db')
#     return "thisreturnstatementdoesnotmatter"
