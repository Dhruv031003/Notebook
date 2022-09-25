const express = require('express');
const router = express.Router();
const User = require('../mongoModels/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser=require('../middleware/fetchUser')

const JWT_SECRET = "DHRUVDORBIJWTTOKEN";

//
//
//ROUTE-1:creating a user
//
//
// checking if the input data is correct
router.post('/createuser', [
    body('name', "Enter valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be of atleast 5 characters.").isLength({ min: 5 })
], async (req, res) => {

    //checking if erros come or not
    const errors = validationResult(req);
    let success=false;

    if (!errors.isEmpty()) {
        success=false
        return res.status(400).json({success, errors: errors.array() });
    }

    //checking whether the user with email exists already or not
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            success=false;
            return res.status(400).json({success, error: "Sorry a user with this email already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        })

        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken})
    }
    catch (error) {
        success=false
        console.error(error.message);
        res.status(500).send(success,"Internal server error occured.")
    }

})

//
//
//ROUTE-2: login endpoitn
//
//
//Authenticate a user using POST "/api/auth/login". NO login required
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success=false;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false
            return res.status(400).json({error: "Please login with correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please login with correct credentials." })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured.")
    }
})

//
//
//Get info of logged in user
//
//
router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        userId=req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured.")
    }
})
module.exports = router;