const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import title schema from Title.js
// const titleSchema = require("./Title");
// const actorSchema = require("./Actor");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // set savedTitles to be an array of data that adheres to the titleSchema
  },
  // set this to use virtual below
  
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `titleCount` with the number of saved titles we have
// userSchema.virtual("titleCount").get(function () {
//   return this.savedTitles.length;
// });

const User = model("User", userSchema);

module.exports = User;
