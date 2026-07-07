const mongoose = require('mongoose');
const {Schema} = mongoose;

const questionSchema = new Schema({
    interview: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'interview' 
    }, 
    
    topic: String,        
    
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'] 
    },
    
    question: String,
    
    intervieweeAnswer: String,
    
    strengths: [String],
    
    weaknesses: [String],
    
    improvements: [String],
    
    score: Number,
    
    idealAnswer: String
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;