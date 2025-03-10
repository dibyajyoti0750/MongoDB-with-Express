const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Chat = require("./models/chat");
const ExpressError = require("./ExpressError");

const app = express();
const port = 8080;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mongodbwithexpress2");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.get("/", (req, res) => {
  res.redirect("/chats");
});

app.get(
  "/chats",
  asyncWrap(async (req, res, next) => {
    let chats = await Chat.find();
    res.render("index", { chats });
  })
);

app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.post(
  "/chats",
  asyncWrap(async (req, res, next) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
      from: from,
      msg: msg,
      to: to,
      created_at: new Date(),
    });

    await newChat.save();
    res.redirect("/chats");
  })
);

// Show Route
app.get(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(500, "Chat not found"));
    }
    res.render("edit", { chat });
  })
);

app.get(
  "/chats/:id/edit",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", { chat });
  })
);

app.put(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg, updated_at: new Date() },
      { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
  })
);

app.delete(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  })
);

const handleValidationErr = (err) => {
  console.log("This is a Validation Error. Please follow rules");
  console.dir(err.message);
  return err;
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
