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
  .virtual("password") //thuoc tinh ao this.password = this._password nhu vay khong luu vao db
  .set(async function (password) {
    this._password = password; // tao moi thuoc tinh object
    this.salt = uuidv1(); // gan gia tri cho thuoc tinh khung
    this.hashed_password = await this.encryptPassword(password);
  })
  .get(function () {
    console.log(this._password);
    return this._password; // tra ve gia tri cho thuoc tinh ao "password"
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
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
