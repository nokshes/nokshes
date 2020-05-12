
/**
 * This is a little utility library that will parse the incoming JSON Request from Dialogflow
 */

export const dialogflowReqParser: (req, res) => {

	const json = req.body;

	const newReqBody = {
		intentName: json.queryResult.intent.displayName,
		psId: json.originalDetectIntentRequest.payload.data.sender.id,
		params: json.queryResult.parameters,
		sessionId: json.session,
		timeStamp: json.originalDetectIntentRequest.payload.data.message.timestamp,
	};

	req.body = newReqBody;

};

