from flask import Flask, request, make_response, jsonify
import facebook
import pyodbc
import requests


app = Flask(__name__)
connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=tcp:noksheserver.database.windows.net,1433;Database=nokshesdb;Uid=nokshesadmin;Pwd=iut@1234;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
cnxn = pyodbc.connect(connectionString)
cursor = cnxn.cursor()
page_access_token = "EAADwzWGxszoBANpu8MZCZANCOWFxQtw4ZBsIsG2xPsba56OinacxXUBkLYrrKl6OZAXKGa8CKK6AJ5Y11ZAJESn4haADCh0r4712xjeHsT2LIcFhwMZCOgsAGZCByKLsOwZAQcd1kV47tLrvT0aI3sOJiUj5ZBKFTIAi4KLDUmnzhvrjIkeimZCaBk"
graph = facebook.GraphAPI(page_access_token)

@app.route("/")
def hello_world():
    print("Handling Request to Home Page")
    return "Hello, World! Azure 637"

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    req = request.get_json(force=True)
    user_id = req.get("originalDetectIntentRequest").get("payload").get("data").get("sender").get("id")
    unid = req.get("queryResult").get("parameters").get("id")
    # TODO: Refactor the following code into load profile
    # fields = ["first_name", "last_name", "gender"]
    profile = graph.get_object(user_id)
    row = cursor.execute("SELECT reg_status from nokshesdb.dbo.t_" + unid[:7] + " where user_id = \'" + user_id + "\'").fetchone()
    if row != None:
        text = "You are already registered."
    else:
        text = f"Hey {profile['first_name']}, your request has been sent to CR. Wait for confirmation."

    result = {
            "fulfillmentText": str(request.get_json(force=True)),
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [text]
                        }
                    }
                ]

            }
    if row != None:
        return make_response(jsonify(result))

    cr_id = cursor.execute(f"SELECT user_id from nokshesdb.dbo.t_{unid[:7]} WHERE is_cr=1").fetchone()[0]
    payload = {"messaging_type": "UPDATE", "recipient": {"id": cr_id}, "message": {"text": f"Hey can you confirm the new registration please.\nID:{unid}\nName:{profile['last_name']} {profile['first_name']}?"}}
    r = requests.post(f"https://graph.facebook.com/v6.0/103442488029740/messages?access_token={page_access_token}", json=payload)
    return make_response(jsonify(result))


if __name__ == "__main__":
    if cursor != None:
        print("Database Up and Running")
    if graph != None:
        print("FB Graph API ready to use")
    app.run(debug=True)
    print("App Running")

