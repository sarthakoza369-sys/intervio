const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const { generateFirstQuestion, evaluateAndGetNextQuestion } = require('../services/aiservices');

const VALID_TOPICS = [
    'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB',
    'MERN Stack', 'HTML/CSS', 'Data Structures',
    'Operating Systems', 'DBMS', 'OOP', 'HR Interview'
];

// ROUTE 1: Start an interview + generate the first question — POST /api/interview/start
router.post('/start', fetchuser, [
    body("topic", "Invalid topic").isIn(VALID_TOPICS),
    body("difficulty", "Difficulty must be Easy, Medium, or Hard").isIn(['Easy', 'Medium', 'Hard'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { topic, difficulty } = req.body;

        const interview = await Interview.create({ topic, difficulty, interviewee: req.user.id });

        const { interactionId, question } = await generateFirstQuestion(topic, difficulty);

        interview.currentInteractionId = interactionId;
        await interview.save();

        const questionDoc = await Question.create({
            interview: interview._id, topic, difficulty, question
        });

        res.json({ interview, question: questionDoc });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});

// ROUTE 2: Submit an answer, get evaluation + next question — POST /api/interview/:id/answer
router.post('/:id/answer', fetchuser, [
    body("questionId", "questionId is required").notEmpty(),
    body("answer", "Answer cannot be empty").notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ error: "Interview not found" });

        // Ownership check — prevents answering someone else's interview
        if (interview.interviewee.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized" });
        }
        if (interview.status !== 'in-progress') {
            return res.status(400).json({ error: "This interview is not in progress" });
        }

        const { questionId, answer } = req.body;
        const questionDoc = await Question.findById(questionId);
        if (!questionDoc || questionDoc.interview.toString() !== interview._id.toString()) {
            return res.status(404).json({ error: "Question not found for this interview" });
        }

        const { interactionId, evaluation, nextQuestion } = await evaluateAndGetNextQuestion({
            topic: interview.topic,
            difficulty: interview.difficulty,
            question: questionDoc.question,
            answer,
            previousInteractionId: interview.currentInteractionId
        });

        // Save evaluation onto the answered question
        questionDoc.intervieweeAnswer = answer;
        questionDoc.score = evaluation.score;
        questionDoc.strengths = evaluation.strengths;
        questionDoc.weaknesses = evaluation.weaknesses;
        questionDoc.improvements = evaluation.improvements;
        questionDoc.idealAnswer = evaluation.idealAnswer;
        questionDoc.overallFeedback = evaluation.overallFeedback;
        await questionDoc.save();

        // Store the next question as a new document
        const nextQuestionDoc = await Question.create({
            interview: interview._id,
            topic: interview.topic,
            difficulty: interview.difficulty,
            question: nextQuestion
        });

        interview.currentInteractionId = interactionId;
        await interview.save();

        res.json({ evaluatedQuestion: questionDoc, nextQuestion: nextQuestionDoc });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});

// ROUTE 3: Stop the interview — POST /api/interview/:id/stop
router.post('/:id/stop', fetchuser, async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ error: "Interview not found" });

        if (interview.interviewee.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        const answeredQuestions = await Question.find({
            interview: interview._id,
            score: { $exists: true }
        });

        const overallScore = answeredQuestions.length
            ? answeredQuestions.reduce((sum, q) => sum + q.score, 0) / answeredQuestions.length
            : 0;

        interview.status = 'completed';
        interview.endedAt = Date.now();
        interview.duration = interview.endedAt - interview.startedAt;
        interview.overallScore = overallScore;
        await interview.save();

        res.json({ interview, questionsAnswered: answeredQuestions.length });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;