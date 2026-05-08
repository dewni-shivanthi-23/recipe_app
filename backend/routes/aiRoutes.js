import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ai/ask
router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful cooking assistant. Answer questions about recipes, ingredients, and cooking tips.",
        },
        { role: "user", content: question },
      ],
      max_tokens: 4096,
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to get answer from AI" });
  }
});

export default router;
