const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

//settings
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //Allows input data from forms
app.use(express.json()); //Allows JSON format
app.use(cors());

//routes
app.use("/api/guia", require("./routes/guia.js"));
app.use("/api/cliente", require("./routes/cliente.js"));
app.use("/api/tracking", require("./routes/tracking.js"));

//starting
app.listen(app.get("port"), () => {
  console.log("Server on port 3001");
});
