const express = require("express");
const bcrypt = require("bcrypt")
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const Agent = require ("./models/Agent.js")
const agentRoute = require("./routes/agents");
const propertyRoute = require("./routes/properties");
// const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET;
console.log("secret",secret)

const connectDB = require('./models/db')
const mongoSessions = process.env.SESSION
connectDB(mongoSessions);

const app = express();
app.use(express.json({limit: '50mb', extended:true}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser())

app.use(cors({ 
    credentials:true,
    origin:"http://localhost:3000",
}))


//verify cookie data with token data, to stay logged in
app.get('api/user', (req,res) => {
    const payload = jwt.verify(req.cookies.token, secret)
    Agent.findById(payload.id)
        .then(userInfo =>{
            res.json({
                id:userInfo._id,
                username:userInfo.username,
                email:userInfo.email
            })
        })
})

// REGISTER NEW AGENT 
app.post("/api/auth/register", async (req, res) => {
    const {username, email,password} = req.body;

    if (!username || !email || !password)
        return res.json({ errorMessage: "Please enter all required fields." });
        // return res.send("Please enter all required fields.");

    const hashedPassword = bcrypt.hashSync(password, 10)
    try{
        const user = await new Agent({username,password:hashedPassword,email})

        await user.save().then(userInfo => {
            jwt.sign({
                id:userInfo._id, 
                username:userInfo.username, 
                email:userInfo.email
                },
                secret, 
                (err,token) => {
                    if (err){
                        console.log(err);
                    } else {
                        res.cookie("token",token).json({
                            id:userInfo._id,
                            username:userInfo.username,
                            email:userInfo.email
                        });
                    }
                }
            )
    })
    } catch (err) {
        console.log("blaaas",err);
        return res.json({ errorMessage: "Existing user." });
    }
    
})

// AGENT LOGIN
app.post("/api/auth/login",async (req,res) => {
    const {username,email,password} = req.body;

    await Agent.findOne({email})
    .then(userInfo => {
        try{
            console.log('login password',password)
            console.log('userinfopassword',userInfo.password)

            const passOk = bcrypt.compareSync(password,userInfo.password);
            console.log('passOk:', passOk)   

            if (username && email && passOk){
                jwt.sign({
                    id:userInfo._id,
                    username, 
                    email
                    },
                    secret,
                    (err,token) => {
                    if (err){
                        console.log(err);
                        res.send("Invalid Input")
                        return next(err);
                    } else {
                        res.cookie("token",token).json({
                            id:userInfo._id,
                            username:userInfo.username,
                            email:userInfo.email
                        });
                    }}
                )
            } else {
                res.send("issue")
            }
        } catch(err) {
            console.log('caught error',err)
            res.send("err")
        }
    })
})

//logout
app.post("/logout",(req,res) => {
    res.cookie('token','').send()
})

app.use("/api/agent", agentRoute);
app.use("/api/property", propertyRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
