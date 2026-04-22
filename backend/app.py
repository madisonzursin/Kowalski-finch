# Script running the website and combining the frontend and backend!
from time import sleep
import os
import sys
import subprocess
from tracemalloc import stop
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
from lib.BirdBrain import Finch

TOTALLY_SECURE_KEY = 'meow'
PORT = 5000

# Connect to the Finch robot on port A
app = Flask(__name__, template_folder='frontend')
CORS(app)


socketio = SocketIO(cors_allowed_origins='*', transport=['websocket'], ping_interval=3)


try:
    robot = Finch('A')
except Exception as e:
    print(f"Warning: Finch not found on port A: {str(e)}")
    robot = None

def stop_bot():
    if robot:
        robot.setMottors(0, 0)

@app.route('/')
def index():
    return render_template('index.html')


#connecting the movement functions to the API endpoints
@app.route('/api/move', methods=['POST'])
def move():

    if not robot: return {"status": "error", "message": "Finch not connected"}, 500
    
    # Reset beak and tail to default positions before moving
    direction = request.json.get("direction")
    robot.setBeak(0,0,0) 
    robot.setTail("all",0,0,0)
    

    # Checks for obstacles before moving forward
    if direction == "w":
        #distance = robot.getDistance()
        if distance < 50:
            stop.robot.setMotors(0, 0)
            robot.setMotors(0, 0)
            return {"status": "blocked"}
            robot.setMotors(50, 50)
    elif direction == "s": move_backward()
    elif direction == "a":
        turn_left()
    elif direction == "d":
        turn_right()
    elif direction == "stop": stop()
    else:
        return {"status": "error", "message": "Invalid direction"}, 400
    return {"status": "success", "action": direction}

#individual notes and their correspondng beak colors
@app.route('/api/note', methods=['POST'])
def note():
    key = request.json.get("key")
    
    if key == "1":
        robot.playNote(30, 0.5)
        robot.setBeak(100,0,0) #red
    elif key == "2":
        robot.playNote(35, 0.5)
        robot.setBeak(100,20,0) #orange
    elif key == "3":
        robot.playNote(40, 0.5)
        robot.setBeak(100,40,0) #yellow
    elif key == "4":
        robot.playNote(45, 0.5)
        robot.setBeak(50,100,0) # light green
    elif key == "5":
        robot.playNote(50, 0.5)
        robot.setBeak(0,100,0) #green
        
    elif key == "6":
        robot.playNote(55, 0.5)
        robot.setBeak(0,100,50) # light blue
        
    elif key == "7":
        robot.playNote(60, 0.5)
        robot.setBeak(0,0,100) #blue

    elif key == "8":
        robot.playNote(65, 0.5)
        robot.setBeak(50,0,50) #purple
        
    elif key == "9":
        robot.playNote(70, 0.5)
        robot.setBeak(100,0,50) #pink
    else:
        return {"status": "error", "message": "Invalid note"}, 400

    return {"status": "success", "note": key}

#song function that plays twinkle twinkle little star and changes the tail colors based on the light sensor values
def twinkle():
    notes = [60,60,68,68,70,70,68,66,66,64,64,62,62,60,68,68,66,66,64,64,62,68,68,66,66,64,64,62,60,60,68,68,70,70,68,66,66,64,64,62,62,60]
    counter = 0

    for i in notes:
        # Check for either button presses to stop the song
        if robot.getButton("A"):
            robot.stopAll()
            break
        if robot.getButton("B"):
            robot.stopAll()
            break

        #gets the light sensor values and changes the tail colors based on the values
        light_valueLeft = robot.getLight('L')
        light_valueRight = robot.getLight('R')

        if light_valueLeft < 10 and light_valueRight < 10:
            robot.setTail(1,0,0,100)
            robot.setTail(2,0,50,100)
            robot.setTail(3,0,100,50)
            robot.setTail(4,0,100,100)
        else:
            robot.setTail("all",0,0,0)
            
        counter+=1
        if counter%7==0:
            robot.playNote(int(i),1)
            sleep(1.4)
        else:
            robot.playNote(int(i),0.5)
            sleep(0.8)


#song endpoint that plays either twinkle twinkle little star in the future will play more songs
@app.route('/api/songs', methods=['POST'])
def songs():
    print("SONG ROUTE HIT")
    song = request.json.get("song")
    if song == "t":
        twinkle()
    elif song == "q":
        robot.playNote(60, 0.5)
    else:
        return {"status": "error", "message": "Invalid note"}, 400
    return {"status": "success", "song": song}
            
# Optional: cleanup endpoint
@app.route('/api/shutdown', methods=['POST'])
def shutdown():
    stop()
    robot.disconnect()
    return {"status": "robot disconnected"}

# Route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to serve data to the frontend (route is redundant for now)
@app.route('/api/data')
def get_data():
    data = {"message":"hello world"}
    return jsonify(data)
    # You can return any data here (e.g., from a database)
    # WRITE HERE
    return jsonify({"status": "success", "message": "Finch moved!"})

# Running our first script!
@app.route('/first_finch_test', methods=['POST'])
def first_finch_test():
    script_path = os.path.join('backend','test.py')
    try:
        result = subprocess.check_output(
            [sys.executable, script_path],
            text=True,
            stderr=subprocess.STDOUT
        )
        return jsonify({"status": "sucess", "output": result.strip()})
    except FileNotFoundError:
        error_msg = f"Error: The file '{script_path}' was not found."
        print(error_msg)
        return jsonify({"status": "error", "message": error_msg}), 500

    except Exception as e:
        print(f"General Error: {str(e)}")
        return jsonify({"status": "error", "message": f"Server error: {str(e)}"}), 500


def configure():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = TOTALLY_SECURE_KEY
    socketio.init_app(app)
    return app

@socketio.on('connect')
def test_connect():
    socketio.emit('connected?')

@socketio.on('disconnect')
def test_disconnect():
    socketio.emit('disconnected?')

@socketio.on('finch_test')
def finch_test():
    finch = Finch('A')
    finch.setMove('F', 100, 100)
    finch.setTurn('R', 360, 30)


#Movement functions
#def move_forward():
    #robot.setMotors(50, 50)

#def move_backward():
    #robot.setMotors(-100, -100)
    #robot.setMotors(-50, -50)

##def turn_left():
    #robot.setMotors(-50, 50)

#def turn_right():
    #robot.setMotors(50, -50)

#def stop():
    #robot.setMotors(0, 0)





if __name__ == '__main__':
    app = configure()
    socketio.run(app, port=PORT)

