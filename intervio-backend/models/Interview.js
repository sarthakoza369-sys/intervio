const mongoose = require('mongoose');
const {Schema} = mongoose;

const interviewSchema = new Schema({
    interviewee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    
    topic: String,
    
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard'] 
    },

    status: { 
        type: String, enum: ['in-progress', 'completed', 'abandoned'], 
        default: 'in-progress' 
    },

    overallScore: Number,

    startedAt: { 
        type: Date, 
        default: Date.now 
    },

    endedAt: Date,
    
    duration: Number,
});

const Interview = mongoose.model('interview', interviewSchema);
module.exports = Interview;