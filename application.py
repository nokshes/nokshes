from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    print("Handling Request to Home Page")
    return "Hello, World! Azure 637"

