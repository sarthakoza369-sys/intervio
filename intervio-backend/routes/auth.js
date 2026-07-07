const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require('dotenv').config();

//ROUTE 1: Create a user using: POST: "api/auth/createUser" Dosent require AUTH
router.post('/createUser',[
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    async (req, res)=>{
    const errors = validationResult(req);

    // If there are validation errors, return BAD REQUEST
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a user in DataBase
        let user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

      // Prepare payload for JWT
      const data = {
        user: {
          id: user.id,
        },
      };

      //Asign Token and send back
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      return res.json({authToken});

    }catch(err){
        // If MongoDB rejects the creation because the email isn't unique
      if (err.code === 11000) {
        return res.status(400).json({error: "Sorry, a user with this email address already exists!"});
      }

      // Fallback for any other random server errors
      console.error(err.message); // This helps you debug in your console
      return res.status(500).send("Internal server error");
    }
});

//ROUTE 2: Authenticate a user using POST: "api/auth/login"
router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
   ],
    async (req, res)=>{
    const errors = validationResult(req);

    // If there are validation errors, return BAD REQUEST
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    try {
         const {email, password} = req.body;

         let user = await User.findOne({email});
         if(!user){
            return res.status(400).json({error: "Please login with correct credentials" })
         }

         const passwordCompare = await bcrypt.compare(password, user.password);
         if(!passwordCompare){
            return res.status(400).json({error: "Please login with correct credentials" })
         }

         const data = {
            user: {
                id: user.id,
            },
         };

          const authToken = jwt.sign(data, process.env.JWT_SECRET);
          res.json({authToken});

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 3: Get logged in User details, POST "/api/auth/getUser". Login required

router.post("/getUser", fetchuser, 
    async (req, res)=>{
      try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      }catch(err){
        // Fallback for any other random server errors
        res.status(500).send("Internal server error");
      }
    });

module.exports = router;