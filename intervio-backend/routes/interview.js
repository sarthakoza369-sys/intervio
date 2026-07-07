const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const Questions = require('../models/Question');
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const VALID_TOPICS = [
    'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 
    'MERN Stack', 'HTML/CSS', 'Data Structures', 
    'Operating Systems', 'DBMS', 'OOP', 'HR Interview'
];
//ROUTE 1: Start an interview using POST: "/api/interview/start". Login required

router.post('/start', fetchuser, [
    body("topic", "Invalid topic").isIn(VALID_TOPICS),
    body("difficulty", "Difficulty must be Easy, Medium, or Hard").isIn(['Easy', 'Medium', 'Hard'])
],
    async(req, res)=>{
        try{
            const {topic, difficulty} = req.body;

        //if there are errors, return BAD REQUEST
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const interview = await Interview.create({
            topic, difficulty, interviewee: req.user.id
        });
        res.json(interview);

        }catch(err){
         console.log(err.message);
         res.status(500).send({error: err.message});
        }
    });

module.exports = router;
