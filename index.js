const express = require("express");
const path = require("path");
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:127.0.0.1:27017/short-url").then(
    console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.use("/url", urlRoute);

app.listen(port, () => console.log(`Server is running at PORT:${port}`));