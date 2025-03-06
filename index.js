const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const app = express();
const port = 8080;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mongodbwithexpress");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.redirect("/chats");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index", { chats });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
