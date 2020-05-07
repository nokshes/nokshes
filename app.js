
const express = require("express");
const app = express();

const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
