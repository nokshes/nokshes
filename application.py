from flask import Flask, request, make_response, jsonify
app = Flask(__name__)

@app.route("/")
def hello_world():
    print("Handling Request to Home Page")
    return "Hello, World! Azure 637"

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    result = {"fulfillmentText": request.get_json(force=True)}
    return make_response(jsonify(result))

if __name__ == "__main__":
    app.run(debug=True)
