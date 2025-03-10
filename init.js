const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mongodbwithexpress2");
}

let allChats = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, how's it going?",
    created_at: new Date(),
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Hey Alice! I'm good, how about you?",
    created_at: new Date(),
  },
  {
    from: "Charlie",
    to: "David",
    msg: "Did you complete the project?",
    created_at: new Date(),
  },
  {
    from: "David",
    to: "Charlie",
    msg: "Almost done, just finalizing some parts.",
    created_at: new Date(),
  },
  {
    from: "Eve",
    to: "Frank",
    msg: "Let's meet at the cafe at 5 PM.",
    created_at: new Date(),
  },
  {
    from: "Frank",
    to: "Eve",
    msg: "Sounds good! See you then.",
    created_at: new Date(),
  },
  {
    from: "Grace",
    to: "Hank",
    msg: "Did you watch the match last night?",
    created_at: new Date(),
  },
  {
    from: "Hank",
    to: "Grace",
    msg: "Yes! That last-minute goal was insane!",
    created_at: new Date(),
  },
  {
    from: "Ivy",
    to: "Jack",
    msg: "Reminder: Meeting at 3 PM.",
    created_at: new Date(),
  },
  {
    from: "Jack",
    to: "Ivy",
    msg: "Got it, thanks for reminding me!",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)
  .then(() => {
    console.log("Sample data inserted successfully");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
