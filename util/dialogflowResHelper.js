
const registerReqJSON = (req, res, next) => {
  if (!res.body) {
    res.body = {};
  }
  res.body.fulfillmentText = JSON.stringify(req.body);
  console.log(res.body.fulfillmentText);
  next();
};

const setResMessage = (res, message) => {
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
