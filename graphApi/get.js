
const axios = require("axios");
const config = require("./config.js");

const graphUrl = "https://graph.facebook.com/v7.0";

const getNode = async (nodeId, edge, fields, accessToken) => {
	const reqUrl = graphUrl + "/" + nodeId + "/" + edge + "?fields=" + fields.join(",") + "&access_token=" + accessToken;
	console.log(reqUrl);
	try {
		return await axios.get(reqUrl);
	} catch(err) {
		console.log(err);
	}
};

const getPublicProfile = async (_psId) => {
	return (await getNode(_psId, "", ["first_name", "last_name", "profile_pic", "gender"], config.pageAccessToken)).data;
};

module.exports = {getNode, getPublicProfile};
