import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: message
});

const reply = response.output_text || "No response";

res.json({ reply });
    
  } catch (error) {
  console.log("FULL ERROR:", error);
  res.status(500).json({ reply: "AI connection error." });
}

app.listen(3000, () => {
  console.log("Zyvaron AI backend running on port 3000");
});
