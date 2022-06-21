const Chance = require("chance");
const slugify = require("slugify");
const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const chance = new Chance();

mongoose.connect(process.env.MONGODB_URI);

const seed = async () => {
  const users = [];
  const items = [];

  const randomNames = chance.unique(chance.name, 100);
  const randomEmails = chance.unique(chance.email, 100);
  const randomAvatars = chance.unique(chance.avatar, 100);

  for (let i = 0; i < 100; i++) {
    const user = new User();
    user.username = slugify(randomNames[i], "");
    user.email = randomEmails[i];
    user.image = randomAvatars[i];
    user.bio = chance.paragraph();
    user.setPassword(chance.string({ length: "8" }));

    console.log(`Creating user: ${user.username} <${user.email}>`);

    await user.save();
    users.push(user);
  }

  for (let i = 0; i < 100; i++) {
    const item = new Item();
    const name = chance.name().split(" ")[0] + " the " + chance.animal();

    item.slug = slugify(name, "-");
    item.title = name;
    item.description = chance.paragraph();
    item.tagList = ["animal"];
    item.image = chance.avatar();
    item.seller = users[Math.floor(Math.random() * users.length)];

    console.log(`Creating item: ${item.title}`);

    await item.save();
    items.push(item);
  }

  for (let i = 0; i < 100; i++) {
    const comment = new Comment();

    comment.seller = users[Math.floor(Math.random() * users.length)];
    comment.item = items[Math.floor(Math.random() * items.length)];
    comment.body = chance.paragraph();

    console.log(`Creating comment on ${comment.item.title}`);

    await comment.save();
  }

  process.exit(0);
};

seed();
