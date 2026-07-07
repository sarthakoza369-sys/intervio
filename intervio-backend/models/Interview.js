const mongoose = require('mongoose');
const {Schema} = mongoose;

const interviewSchema = new Schema({
    interviewee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    topic:{
        type: String
    },
    difficulty:{
        type: String,
        required: true
    },
    questions:[
        {
        question: String,
        intervieweeAnswer: String,
        aiFeedback: String,
        score: Number,
        idealAnswer: String
        }
    ],
    overallScore:{
        type: Number
    },
    strengths: [String],
    weaknesses: [String],
    improvements: [String],

    startedAt:{
        type: Date,
        default: Date.now
    },
    endedAt:{
        type: Date,
        default: Date.now
    },
    duration:{
        type: Number
    },
});

const Interview = mongoose.model('interview', interviewSchema);
module.exports = Interview;