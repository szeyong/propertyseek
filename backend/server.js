const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const agentRoute = require("./routes/agents");
const propertyRoute = require("./routes/properties");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/agent", agentRoute);
app.use("/api/property", propertyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});