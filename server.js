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

app.get("/", (req, res) => {
  res.send("Zyvaron AI backend running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({
      reply: response.output_text || "No AI response."
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      reply: "AI connection error."
    });
  }
});

app.listen(3000, () => {
  console.log("Zyvaron AI backend running on port 3000");
});
