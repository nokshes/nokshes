
const registerReqJSON = (req, res) => {
	res.body.fulfillmentText = JSON.stringify(req);
};

const setResMessage = (message) => {
	res.body.fulfillmentMessages = [
		{
      text: {
        text: [
					message
        ]
      }
    }
	];
};

module.exports = {registerReqJSON, setResMessage};
