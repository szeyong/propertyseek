const router = require("express").Router();
const Agent = require("../models/Agent");
const Property = require("../models/Property");

// CREATE/ADD NEW PROPOERTY
router.post("/", async (req, res) => {
    const newProperty = new Property(req.body);
    try {
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE PROPERTY DETAILS
router.put("/edit/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property.username === req.body.username) {
            try {
                const updatedProperty = await Property.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedProperty);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You are not authorised to update this property.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE PROPERTY
router.delete("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property.username === req.body.username) {
            try {
                await property.delete();
                res.status(200).json("Success: Property has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You are not authorised to delete this property.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// VIEW PROPERTY
router.get("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json(err);
    }
});

// VIEW ALL PROPERTIES
router.get("/", async (req, res) => {
    // query by ?
    const username = req.query.user;
    const categoryType = req.query.category;

    try {
        let properties;
        if (username) {
            properties = await Property.find({ username });
        } else if (categoryType) {
            properties = await Property.find({
                category: { $in: categoryType },
            });
        } else {
        properties = await Property.find();
        }
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;