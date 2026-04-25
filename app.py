# Script running the website and combining the frontend and backend!
from time import sleep
from flask import Flask, render_template, jsonify, request
import os
import sys
import subprocess
from lib.BirdBrain import Finch
from flask_socketio import SocketIO, emit
robot = Finch('A')  # Connect to the Finch robot on port A



PORT = 5555
SECURE_KEY = 'meow'

app = Flask(__name__, template_folder='frontend')
app.config['SECRET_KEY'] = SECURE_KEY
socketio = SocketIO(app, cors_allowed_origins='*', transport=['websocket'], ping_interval=3)

def connectRobot( port = 'A'):

    try:
        return Finch('A')
    
    except Exception as e:
        print(f"Failed to connect to Finch: {e}")
        return None
@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def test_connect():
    print("Client connected")
    emit('status', {'Message': 'Connected to server'})

@socketio.on('disconnect')
def test_disconnect():
    print("Client disconnected")

@socketio.on('finch_test')
def finch_test():
    print("Running Finch Test...")
    bot = connectRobot()
    if bot is not None:
        bot.setMove('F', 100, 100)
        bot.setTurn('R', 360, 30)
        emit('test_result', {'Message': 'Finch moved!'})
    else:
        emit('test_result', {'Message': 'Error: Finch not connected.'})





if __name__ == '__main__':
    print(f"Server starting on http://localhost:{PORT}")
    socketio.run(app, port=PORT, debug=True)

