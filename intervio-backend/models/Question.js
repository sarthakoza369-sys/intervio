// Question.js — brand new file
const questionSchema = new Schema({
    interview: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'interview' 
    }, 
    
    topic: String,        
    
    difficulty: String,
    
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