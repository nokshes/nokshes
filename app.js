
/**
 * This file is the main NodeJS App's Entry Point
 */

// Importing the Express Web Framework
const express = require("express");
// Creating an Express App
const app = express();

// Open connection to database and load the models
const {connect, loadModels} = require("./dbApi/connection.js");
connect();
await loadModels();

/**
 * Every agent in DialogFlow will have a fulfillment webhook
 * And Each Fulfillment Webhook is an Express Route which are available in the ./routes/
 * Agent -> Webhook -> Route -> ./routes/agent.js -> Intent -> ./routes/agent/intent_*.js
 */
const home = require("./routes/home.js");
const basicUser = require("./routes/basicUser.js");

app.use("/", home);
app.use("/basicUser", basicUser);

// Initialize Session IDs Map
global.sessions = {};
//automatically clean up expired session ids
const {autoSessionIdsCleaner} = require("./utils/session.js")
setInterval(autoSessionIdsCleaner, 3000000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))

