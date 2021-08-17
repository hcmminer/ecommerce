const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(async function (password) {
    console.log(password);
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = await this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    try {
      const hash = crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
      return hash;
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
