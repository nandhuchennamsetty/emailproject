const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  // Hash password logic here
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model('User', userSchema);
