

const axios = require("axios");
const config = require("./config.js");

const graphUrl = "https://graph.facebook.com/v7.0";

const sendReqPostCard = async (profile, _adminPsId) => {
	const postCard = {
		recipient: {
			id: _adminPsId
		},
			message: {
				attachment: {
					type: "template",
						payload: {
							template_type: "generic",
								elements: [
									{
										title: `${profile.first_name} ${profile.last_name}`,
										image_url: profile.profile_pic,
										subtitle: `ID: ${profile.unId}`,
										buttons: [
											{
												type: "web_url",
												url: "https://www.facebook.com/",
												title: "Visit Profile"
											},
											{
												type: "postback",
												title: "CONFIRM",
												payload: `confirm registration of ID ${profile.unId}`
											},
											{
												type: "postback",
												title: "REJECT",
												payload: `reject registration of ID ${profile.unId}`
											}
										]
									}
								]
						}
				}
			}
	};

	try {
		const response = await axios.post(`${graphUrl}/${config.pageId}/messages?`, postCard);
		// TODO (May 11, 2020): Queue the message in receipient inbox if Error 10
		// Error 10: This message is sent outside of allowed window.
	} catch (err) {
		console.log("Couldn't send message.", err);
	}

};

module.exports = {sendReqPostCard};
