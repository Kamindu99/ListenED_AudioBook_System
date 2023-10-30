# flask_app.py
from flask import Flask, request, jsonify
from subprocess import Popen, PIPE

app = Flask(__name__)

@app.route('/start_camera', methods=['GET'])
def start_camera():
    # Start your Python script as a subprocess
    process = Popen(['python', 'write.py'], stdout=PIPE, stderr=PIPE)
    
    # You can optionally capture the script's output for further processing
    stdout, stderr = process.communicate()
    
    if process.returncode == 0:
        return 'Camera started successfully' 
    else:
        return 'Failed to start the camera'

if __name__ == '__main__':
    app.run(debug=True)
