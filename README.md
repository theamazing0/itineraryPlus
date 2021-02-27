# itineraryPlus

## How To Run

1. Install Python from python.org (Python 3.9 originally used)
2. Open the project from the Terminal
3. Create a Vitual Enviroment (Proccess May Differ from Operating System and Shell Used)

Python Docs show how to create a venv: https://docs.python.org/3/library/venv.html

4. Activate the venv (Proccess May Differ from Operating System and Shell Used)

On Windows: tutorial-env\Scripts\activate.bat

On Unix or Macos: source tutorial-env/bin/activate

(From Python Docs)

5. Install Required Packages with pip (Proccess May Differ from Operating System and Shell Used)

pip is a package manager included with python

Pip Docs on how to install packages (Install from requirements.txt): https://pip.pypa.io/en/stable/reference/pip_install/

6. Run the database.py file to generate Database
``` 
python database/database.py
``` 

7. Start the Server

``` 
python app.py
```

8. View the Web Application

From the computer the server is being run on: by going to http://0.0.0.0:5000

From a computer on the same network as the server: http://SERVER_LOCAL_IP:5000

SERVER_LOCAL_IP = The local IP Adress of the server
