const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        address: { type: String, required: true },
        district: { type: Number, required: true },
        price: { type: Number, required: true },
        sqft: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        photo1: { type: String, data: Buffer },
        photo2: { type: String, data: Buffer },
        photo3: { type: String, data: Buffer },
        username: { type: String, required: true },
    }, 
    { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
