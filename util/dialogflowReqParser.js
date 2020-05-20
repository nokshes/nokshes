/**
 * This is a little utility library that will parse the incoming JSON Request from Dialogflow and makes it super easy and useful
 */

const dialogflowReqParser = (req, res, next) => {
  const json = req.body;

  const newReqBody = {
    intentName: json.queryResult.intent.displayName,
    psId: json.originalDetectIntentRequest.payload.data.sender.id,
    params: json.queryResult.parameters,
    sessionId: json.session,
    timeStamp: json.originalDetectIntentRequest.payload.data.timestamp,
  };

  console.log("New Request Body", newReqBody);

  req.body = newReqBody;
  return next();
};

module.exports = { dialogflowReqParser };
