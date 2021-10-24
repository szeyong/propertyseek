const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema( {
  title: {
      type: String,
      required: true,
      unique: true,
  },
  description: {
      type: String,
      required: true,
  },
  category: {
      type: String,
      required: true,
  },
  address: {
      type: String,
      required: true,
  },
  district: {
      type: Number,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
  sqft: {
      type: Number,
      required: true,
  },
  bedrooms: {
      type: Number,
      required: true,
  },
  photo1: {
      type: String,
      required: true,
  },
  photo2: {
      type: String,
      required: false,
  },
  photo3: {
      type: String,
      required: false,
  },
  photo4: {
      type: String,
      required: false,
  },
  username: {
      type: String,
      required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
