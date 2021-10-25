const router = require("express").Router();
const Agent = require("../models/Agent");
const Property = require("../models/Property");
const bcrypt = require("bcrypt");

// UPDATE AGENT ACCOUNT
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedAgent = await Agent.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body }, 
                { new: true }
            );
            res.status(200).json(updatedAgent);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You are not authorised to update this account.");
    }
});

// DELETE AN AGENT ACCOUNT
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await Agent.findById(req.params.id);
            try {
                await Property.deleteMany({ username: user.username });
                await Agent.findByIdAndDelete(req.params.id);
                    res.status(200).json("Agent account deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("Agent not found!");
        }
    } else {
      res.status(401).json("You are not authorised to delete this account.");
    }
  });
  
//GET USER
router.get("/:id", async (req, res) => {
try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;