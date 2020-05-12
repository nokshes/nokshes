
export const registerReqJSON = (req, res) => {
	res.body.fulfillmentText = JSON.stringify(req);
};

export const setResMessage = (message) => {
	res.body.fulfillmentMessages: [
		{
      text: {
        text: [
					message
        ]
      }
    }
	];
};
