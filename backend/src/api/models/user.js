const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for each user
      unique: true,
      immutable: true, // Prevent updates to the id field
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'First Name too short'],
      maxLength: [50, 'First Name too long'],
      match: [/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'Last Name too short'],
      maxLength: [50, 'Last Name too long'],
      match: [/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'], // Follows E.164 format
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // Do not reveal password
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);