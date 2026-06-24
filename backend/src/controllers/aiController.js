const Groq = require("groq-sdk");

const Goal = require("../models/goal");
const Island = require("../models/island");
const Task = require("../models/task");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getCoachAdvice = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    const tasks = await Task.find({
      userId: req.user.id,
    });

    const island = await Island.findOne({
      userId: req.user.id,
    });

    const prompt = `
You are an AI productivity coach for the Strive app.

Current Streak:
${island?.currentStreak || 0}

Trees:
${island?.trees || 0}

Flowers:
${island?.flowers || 0}

Goals:
${JSON.stringify(goals)}

Tasks:
${JSON.stringify(tasks)}

Give:
- One motivational insight
- Two recommendations

Format exactly like:

🌱 Insight:
...

✅ Recommendation 1:
...

✅ Recommendation 2:
...

Maximum 80 words.
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

    const advice =
      completion.choices[0].message.content;

    res.json({
      advice,
    });
  } catch (error) {
    console.log("AI COACH ERROR");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const askCoach = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question required",
      });
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a mentor inside the Strive productivity app. Give concise helpful advice.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
      });

    const reply =
      completion.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.log("AI CHAT ERROR");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCoachAdvice,
  askCoach,
};