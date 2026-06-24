import { useEffect, useState } from "react";
import API from "../api/axios";
import "./goals.css";


function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [advice, setAdvice] = useState("");
const [loadingAI, setLoadingAI] = useState(false);
const [question, setQuestion] = useState("");
const [reply, setReply] = useState("");
const [loadingChat, setLoadingChat] = useState(false);

useEffect(() => {
  fetchGoals();
  fetchAdvice();
}, []);

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAdvice = async () => {
    try {
      setLoadingAI(true);
  
      const res = await API.get("/ai/coach");
  
      setAdvice(res.data.advice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAI(false);
    }
  };
  const askAI = async () => {
    try {
      setLoadingChat(true);
  
      const res = await API.post(
        "/ai/chat",
        {
          question,
        }
      );
  
      setReply(res.data.reply);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingChat(false);
    }
  };
  const addGoal = async () => {
    try {
      await API.post("/goals", {
        title,
        target,
      });

      setTitle("");
      setTarget("");

      fetchGoals();
      
fetchAdvice();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      fetchGoals();
      
fetchAdvice();
    } catch (err) {
      console.log(err);
    }
  };

  const completedGoals = goals.filter(
    (g) => g.completed
  ).length;

  const successRate =
    goals.length === 0
      ? 0
      : Math.round(
          (completedGoals / goals.length) * 100
        );

  return (
    <div className="goals-page">

      <div className="goals-header">
        <div>
          <h1>Goals</h1>
          <p>Track your long term goals</p>
        </div>

        <div className="goal-form">

  <input
    type="text"
    placeholder=" Goal Title"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
  />

  <input
    type="number"
    placeholder=" Target"
    value={target}
    onChange={(e) =>
      setTarget(e.target.value)
    }
  />

  <button
    className="add-goal-btn"
    onClick={addGoal}
  >
    Add Goal
  </button>

</div>
</div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{goals.length}</h2>
          <p>Active Goals</p>
        </div>

        <div className="stat-card">
          <h2>{completedGoals}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>{successRate}%</h2>
          <p>Success Rate</p>
        </div>

      </div>

      <div className="goals-layout">

        <div className="goals-left">

          <h2>Active Goals</h2>

          {goals.map((goal) => {
           const progress =
           goal.target > 0
             ? (goal.current / goal.target) * 100
             : 0;

            return (
              <div
                key={goal._id}
                className="goal-card"
              >
                <div className="goal-top">

                  <div>
                    <h3>{goal.title}</h3>

                    <p>
                      Progress:
                      {" "}
                      {goal.current}
                      {" / "}
                      {goal.target}
                    </p>

                    <p>
                      Category:
                      {" "}
                      {goal.category || "General"}
                    </p>

                    <p>
                      {Math.round(progress)}
                      % Complete
                    </p>
                  </div>

                  <span>
                  <span className="goal-status">
  {goal.completed
    ? "✅ Completed"
    : "⏳ In Progress"}
</span>
                  </span>

                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteGoal(goal._id)
                  }
                >
                  🗑 Delete Goal
                </button>

              </div>
            );
          })}
        </div>

        <div className="goals-right">

          

        <div className="summary-card ai-card">

<h3>🤖 AI Coach</h3>

{loadingAI ? (
  <p>Thinking...</p>
) : (
  <div className="ai-response">
    {advice}
  </div>
)}

<button
  className="refresh-ai-btn"
  onClick={fetchAdvice}
>
  🔄 Refresh Advice
</button>

</div>
<div className="summary-card ai-chat-card">

  <h3>💬 Ask Strive AI</h3>

  <textarea
    value={question}
    onChange={(e) =>
      setQuestion(e.target.value)
    }
    placeholder="What should I learn next?"
  />

  <button
    className="ask-ai-btn"
    onClick={askAI}
  >
    Ask AI
  </button>

  <div className="ai-answer">
    {loadingChat
      ? "Thinking..."
      : reply}
  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default Goals;