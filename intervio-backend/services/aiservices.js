const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const questionSchema = {
    type: "object",
    properties: {
        question: { type: "string" }
    },
    required: ["question"]
};

const evaluationAndNextSchema = {
    type: "object",
    properties: {
        evaluation: {
            type: "object",
            properties: {
                score: { type: "integer", description: "Score from 0 to 10" },
                strengths: { type: "array", items: { type: "string" } },
                weaknesses: { type: "array", items: { type: "string" } },
                improvements: { type: "array", items: { type: "string" } },
                idealAnswer: { type: "string" },
                overallFeedback: { type: "string" }
            },
            required: ["score", "strengths", "weaknesses", "improvements", "idealAnswer", "overallFeedback"]
        },
        nextQuestion: { type: "string" }
    },
    required: ["evaluation", "nextQuestion"]
};

// First question of the interview — no previous_interaction_id, since nothing to chain onto yet
// previousQuestions: list of question strings from this user's past interviews on this topic,
// used to steer the AI away from repeating the same questions every time
const generateFirstQuestion = async (topic, difficulty, previousQuestions = []) => {
    const avoidClause = previousQuestions.length
        ? `\n\nDo NOT repeat any of these previously asked questions — ask something different:\n${previousQuestions.map(q => `- ${q}`).join('\n')}`
        : '';

    const prompt = `
You are an experienced software engineering interviewer conducting a mock interview.
Generate ONE interview question for the topic "${topic}" at "${difficulty}" difficulty.${avoidClause}
`;
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: prompt,
        response_format: { type: "text", mime_type: "application/json", schema: questionSchema }
    });
    return {
        interactionId: interaction.id,
        question: JSON.parse(interaction.output_text).question
    };
};

// Evaluate the answer just given, and generate the next question, in one chained call
const evaluateAndGetNextQuestion = async ({ topic, difficulty, question, answer, previousInteractionId }) => {
    const prompt = `
The candidate was asked: "${question}"
Their answer was: "${answer}"

As an experienced software engineering interviewer:
1. Evaluate this answer fairly on a 0-10 scale. Identify strengths, weaknesses, and concrete improvements. Provide the ideal answer and overall feedback. Never just say "correct" or "wrong" — always explain your reasoning.
2. Then generate the NEXT interview question for topic "${topic}" at "${difficulty}" difficulty, building naturally on the conversation so far and avoiding repeats.
`;
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: prompt,
        previous_interaction_id: previousInteractionId,
        response_format: { type: "text", mime_type: "application/json", schema: evaluationAndNextSchema }
    });
    const parsed = JSON.parse(interaction.output_text);
    return {
        interactionId: interaction.id,
        evaluation: parsed.evaluation,
        nextQuestion: parsed.nextQuestion
    };
};

module.exports = { generateFirstQuestion, evaluateAndGetNextQuestion };