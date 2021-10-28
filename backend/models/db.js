const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("Yoohoo! DB connected");
        
    } catch (err) {
        console.error(err.message);
        process.exit(1); // 1 with issue, 0 without
    }
};

module.exports = connectDB;