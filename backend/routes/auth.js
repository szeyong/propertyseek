const router = require("express").Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");

// CREATE NEW AGENT 
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new Agent({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
  
        const user = await newUser.save();
        res.status(200).json(user); // 200: OK or Success
    } catch (err) {
        res.status(500).json(err);  // 500: Internal Server Error
    }
  });
  
// // LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await Agent.findOne({ username: req.body.username }); // findOne unique 
        !user && res.status(400).json({message: "Wrong username!", status: 400});
        console.log(user)
        
        // validate encrypted password
        const validated = await bcrypt.compare(req.body.password, user.password);
        // !validated && res.status(400).json({message:"Wrong password!", status: 400});
        !validated && res.send({message:"Wrong password!", status: 400});
        
        // show others data except password
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
// router.post("/login", async (req, res) => {
//     const { username, email, password } = req.body;
//     console.log("get req", req.body)
//     await Agent.findOne({username: req.body.username})
//     .then( user => {
//         try{
//             const validated = bcrypt.compareSync(req.body.password, user.password);
//             if( username && validated) {
//                 const { password, ...others } =user._doc;
//                 res.status(200).json(others).send({message: "Login Successful!"});
//             } else {
//                 res.send("issue")
//             }
//         } catch (err) {
//             console.log("Login Error :", err)
//             res.send("err")
//         }

//     })
// });
  
module.exports = router;