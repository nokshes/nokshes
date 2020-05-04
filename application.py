from flask import Flask, request, make_response, jsonify
import facebook
app = Flask(__name__)

@app.route("/")
def hello_world():
    print("Handling Request to Home Page")
    return "Hello, World! Azure 637"

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    req = request.get_json(force=True)
    user_id = req.get("originalDetectIntentRequest").get("payload").get("data").get("sender").get("id")
    # TODO: Refactor the following code into load profile
    page_access_token = "EAADwzWGxszoBANpu8MZCZANCOWFxQtw4ZBsIsG2xPsba56OinacxXUBkLYrrKl6OZAXKGa8CKK6AJ5Y11ZAJESn4haADCh0r4712xjeHsT2LIcFhwMZCOgsAGZCByKLsOwZAQcd1kV47tLrvT0aI3sOJiUj5ZBKFTIAi4KLDUmnzhvrjIkeimZCaBk"
    graph = facebook.GraphAPI(page_access_token)
    # fields = ["first_name", "last_name", "gender"]
    profile = graph.get_object(user_id)
    result = {
            "fulfillmentText": str(request.get_json(force=True)),
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": ["Hello " + profile["first_name"] + ".\nHooray!!! Fb, Ggl, MS, and Python works together!!!"]
                        }
                    }
                ]

            }
    return make_response(jsonify(result))

if __name__ == "__main__":
    app.run(debug=True)
