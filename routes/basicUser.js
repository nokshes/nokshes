
/**
 * This file will handle all incoming requests from Basic Student Manager
 * It will detect the intent and pass it to the respective intent_*.js
 **/

const express = require("express");
const router = express.Router();

// Utility API
const {dialogflowReqParser} = require("../util/dialogflowReqParser.js");
const {sessionHandler} = require("../util/session.js");
const {registerReqJSON, setResMessage} = require("../util/dialogflowResHelper.js");

// Intents
const {register} = require("./basicUser/register.js");

router.use(express.json());
router.use(registerReqJSON);
// router.use(dialogflowReqParser);
// router.use(sessionHandler);
router.post("/", async (req, res) => {
	let message;
	/*
	switch(req.body.intentName) {
		case "Register":
		{
			message = await register(req.body.psId, req.body.params.unId, req.body.params.isAdmin == "true");
		} break;
	};
	*/
	// send the message in response json
	setResMessage(res, res.body.fulfillmentText);
	res.json(res.body);

});

module.exports = router;
