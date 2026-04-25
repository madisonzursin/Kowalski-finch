# Script running the website and combining the frontend and backend!
from time import sleep
from flask import Flask
#from json import jsonify
from flask import request
from lib.BirdBrain import Finch

from flask_socketio import SocketIO

robot = Finch('A')  # Connect to the Finch robot on port A


TOTALLY_SECURE_KEY = 'meow'
PORT = 5555

socketio = SocketIO(cors_allowed_origins='*', transports=['websocket'], ping_interval=3)

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
    robot.playNote(68, 0.5)
    robot.playNote(74, 0.5)
    robot.setBeak(100, 40, 0)  # yellow beak
    robot.setTurn('L', 30, 150)
    robot.setTurn('R', 30, 150)
    robot.setTurn('L',30,150)
    robot.setTurn('R', 30, 150)
    robot.setBeak(0, 0, 0)  # reset beak to default

#Movement functions

def move_forward():
    robot.setMotors(50, 50)

def move_backward():
    #robot.setMotors(-100, -100)
    robot.setMotors(-50, -50)
    socketio.emit('moved?')

def turn_left():
    robot.setMotors(-50, 50)

def turn_right():
    robot.setMotors(50, -50)

def stop():
    robot.setMotors(0, 0)

#connecting the movement functions to the API endpoints
@socketio.on('move')
def move(data):
    # Reset beak and tail to default positions before moving
    direction = data.get("direction")

    robot.setBeak(0,0,0) 
    robot.setTail("all",0,0,0)

    distance = robot.getDistance()


    # Checks for obstacles before moving forward
    if direction == "w":
        distance = robot.getDistance()
        if distance < 50:
            robot.setMotors(0, 0)
            return {"status": "blocked"}
        else:
            move_forward()
    elif direction == "s": 
        move_backward()
    elif direction == "a":
        turn_left()
    elif direction == "d":
        turn_right()
    elif direction == "stop": stop()
    else:
        return {"status": "error", "message": "Invalid direction"}, 400
    return {"status": "success", "action": direction}

#individual notes and their correspondng beak colors
#@app.route('/api/note', methods=['POST'])
@socketio.on('note')
def note(data):
    note = data.get("keynote")
    
    if note == "1":
        robot.playNote(30, 0.5)
        robot.setBeak(100,0,0) #red
        robot.setTail("all",100,0,0)
    elif note == "2":
        robot.playNote(35, 0.5)
        robot.setBeak(100,20,0) #orange
        robot.setTail("all",100,20,0)
    elif note == "3":
        robot.playNote(40, 0.5)
        robot.setBeak(100,40,0) #yellow
        robot.setTail("all",100,40,0)
    elif note == "4":
        robot.playNote(45, 0.5)
        robot.setBeak(50,100,0) # light green
        robot.setTail("all",50,100,0)
    elif note == "5":
        robot.playNote(50, 0.5)
        robot.setBeak(0,100,0) #green
        robot.setTail("all",0,100,0)
        
    elif note == "6":
        robot.playNote(55, 0.5)
        robot.setBeak(0,100,50) # light blue
        robot.setTail("all",0,100,50)
        
    elif note == "7":
        robot.playNote(60, 0.5)
        robot.setBeak(0,0,100) #blue
        robot.setTail("all",0,0,100)

    elif note == "8":
        robot.playNote(65, 0.5)
        robot.setBeak(50,0,50) #purple
        robot.setTail("all",50,0,50)
        
    elif note == "9":
        robot.playNote(70, 0.5)
        robot.setBeak(100,0,50) #pink
        robot.setTail("all",100,0,50)
    else:
        return {"status": "error", "message": "Invalid note"}, 400

    return {"status": "success", "note": note}

@socketio.on('mary')
def mary():
    counter = 0
    c = 60
    d = 62
    e = 64
    f = 66
    g = 68
    a = 70

    notePauseList = [5,6,7,8,9,10,12,13,18,19,20,21,22,32,33,34,35,36,38,39,44,45,46,47,48]
    notes = [e,d,c,d,e,e,e,d,d,d,e,g,g,e,d,c,d,e,e,e,e,d,d,e,d,c]
    for i in notes:
        # Check for either button presses to stop the song
        if robot.getButton("A"):
            robot.stopAll()
            break
        if robot.getButton("B"):
            robot.stopAll()
            break

        light_valueLeft = robot.getLight('L')
        light_valueRight = robot.getLight('R')

        if light_valueLeft < 10 and light_valueRight < 10:
            robot.setTail(1,60,10,30)
            robot.setTail(2,70,15,10)
            robot.setTail(3,50,50,50)
            robot.setTail(4,50,10,0)
        else: 
            robot.setTail("all",0,0,0)

        counter+=1
        if counter ==26:
            robot.playNote(int(i),1)
            sleep(1.4)
        elif counter == 28 or counter ==41:
            robot.playNote(int(i),1.5)
            sleep(0.8)
        elif counter in notePauseList:
            robot.playNote(int(i),0.6)
            sleep(0.7)
        else:
            robot.playNote(int(i),0.5)
            sleep(0.6)

@socketio.on('boat')
def boat():
    c = 60
    d = 62
    e = 64
    f = 66
    g = 68
    c2 = 74

    notes = [c,c,c,d,e,e,d,e,f,g,c2,c2,c2,g,g,g,e,e,e,c,c,c,g,f,e,d,c]

    counter =0
    fastNotes = [11,12,13,14,15,16,17,18,19,20,21,22]
    for i in notes:
        # Check for either button presses to stop the song
        if robot.getButton("A"):
            robot.stopAll()
            break
        if robot.getButton("B"):
            robot.stopAll()
            break

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
        if counter == 1 or counter ==2 or counter ==5:
            robot.playNote(int(i),0.6)
            sleep(0.8)
            
        elif counter == 4 or counter == 7 or counter == 9 or counter == 24:
            robot.playNote(int(i),0.6)
            sleep(0.3)
            
        elif counter == 10 or counter == 27:
            robot.playNote(int(i),1.1)
            sleep(1.4)
            
        elif counter in fastNotes:
            robot.playNote(int(i),0.4)
            sleep(0.2)
            
        else:
            robot.playNote(int(i),0.7)
            sleep(0.6)
            

#song function that plays twinkle twinkle little star and changes the tail colors based on the light sensor values
@socketio.on('twinkle')
def twinkle():
    c =60
    g = 68
    a = 70
    f = 66
    e = 64
    d = 62

    #twinkle twinkle little star notes with the corresponding midi numbers for the notes
    notes = [c,c,g,g,a,a,g,f,f,e,e,d,d,c,g,g,f,f,e,e,d,g,g,f,f,e,e,d,c,c,g,g,a,a,g,f,f,e,e,d,d,c]
    #notes = [60,60,68,68,70,70,68,66,66,64,64,62,62,60,68,68,66,66,64,64,62,68,68,66,66,64,64,62,60,60,68,68,70,70,68,66,66,64,64,62,62,60]
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
            robot.setTail(1,30,0,70)
            robot.setTail(2,50,0,100)
            robot.setTail(3,15,10,80)
            robot.setTail(4,30,3,35)
        else:
            robot.setTail("all",0,0,0)
            
        counter+=1
        if counter%7==0:
            robot.playNote(int(i),1)
            sleep(1.4)
        else:
            robot.playNote(int(i),0.5)
            sleep(0.6)


#song endpoint that plays either twinkle twinkle little star in the future will play more songs
#@app.route('/api/songs', methods=['POST'])
def songs():
    print("SONG ROUTE HIT")
    song = request.json.get("song")
    if song == "t":
        twinkle()
    elif song == "m":
        mary()
    elif song == "b":
        boat()
    else:
        return {"status": "error", "message": "Invalid note"}, 400
    return {"status": "success", "song": song}
            
#Optional: cleanup endpoint

if __name__ == '__main__':
    app = configure()
    socketio.run(app, port=PORT)
