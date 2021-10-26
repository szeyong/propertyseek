const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const agentRoute = require("./routes/agents");
const propertyRoute = require("./routes/properties");
const multer = require("multer");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
// app.use(express.json());

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use(cors({ 
    credentials:true,
    origin:"http://localhost:3000",
}))

app.use("/images", express.static(path.join(__dirname, "/images"))); // images folder

mongoose.connect(process.env.MONGO_URL )
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback( null, "images" );
    },
    filename: (req, file, callback) => {
        callback( null, req.body.name );
    },
    });
    
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/agent", agentRoute);
app.use("/api/property", propertyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
