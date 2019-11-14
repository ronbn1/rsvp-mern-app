const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 8000;
//import Routes
const authRoute = require("./routes/auth");
const guestRoute = require("./routes/guests");

dotenv.config();

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to DB")
);

//Moddlewares
app.use(express.json());

//Routes MiddelWares
app.use("/api/user", authRoute);
app.use("/guests", guestRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("server running..."));
