const express = require("express");
const path = require("path");
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`Server is running at PORT:${port}`));