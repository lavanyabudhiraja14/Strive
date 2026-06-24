import "./progress.css";
import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Progress() {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [island, setIsland] = useState(null);
  const [coachAdvice, setCoachAdvice] =
  useState("");

const [showChat, setShowChat] =
  useState(false);

const [question, setQuestion] =
  useState("");

const [chatReply, setChatReply] =
  useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authRes =
        await API.get("/auth/me");

      const taskRes =
        await API.get("/tasks");

      const goalRes =
        await API.get("/goals");
        
  

      setIsland(authRes.data.island);
      setTasks(taskRes.data);
      setGoals(goalRes.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const chartData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 1 },
    { day: "Thu", tasks: 5 },
    { day: "Fri", tasks: 3 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 4 },
  ];

  const heatmapData = Array.from(
    { length: 240 },
    (_, index) => {
      const date = new Date();

      date.setDate(
        date.getDate() - (239 - index)
      );

      const dateString =
        date.toISOString().split("T")[0];

      const count = tasks.filter(
        (task) =>
          task.completed &&
          task.completedAt &&
          task.completedAt
            .split("T")[0] ===
            dateString
      ).length;

      let level = 0;

      if (count >= 1) level = 1;
      if (count >= 2) level = 2;
      if (count >= 3) level = 3;
      if (count >= 5) level = 4;

      return {
        date: dateString,
        level,
      };
    }
  );

  const islandScore =
    (island?.trees || 0) +
    (island?.flowers || 0) +
    (island?.stones || 0) +
    (island?.houses || 0) * 5 +
    (island?.ponds || 0) * 10;

  const islandCompletion =
    Math.min(islandScore, 100);

    const getAdvice = async () => {
      try {
        setCoachAdvice(
          "Click Generate Advice"
        );
    
        const res =
          await API.get(
            "/ai/coach"
          );
    
        setCoachAdvice(
          res.data.advice
        );
      } catch (error) {
        setCoachAdvice(
          "Unable to generate advice right now."
        );
      }
    };

    const askCoach = async () => {
      if (!question.trim()) return;
    
      try {
        const res =
          await API.post(
            "/ai/chat",
            {
              question,
            }
          );
    
        setChatReply(
          res.data.reply
        );
      } catch (error) {
        console.log(error);
    
        setChatReply(
          "Unable to get response right now."
        );
      }
    };

  

  return (
    <div className="progress-page">

      <div className="progress-header">
        <div>
          <h1>Progress</h1>
          <p>
            Track your growth and
            consistency
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>
            {island?.currentStreak || 0}
          </h2>
          <p>🔥 Current Streak</p>
        </div>

        <div className="stat-card">
          <h2>
            {island?.trees || 0}
          </h2>
          <p>🌳 Trees</p>
        </div>

        <div className="stat-card">
          <h2>
            {island?.flowers || 0}
          </h2>
          <p>🌸 Flowers</p>
        </div>

        <div className="stat-card">
          <h2>
            {completedTasks}
          </h2>
          <p>
            ✅ Completed Tasks
          </p>
        </div>

      </div>

      <div className="progress-layout">

        <div className="left-panel">

          <div className="chart-card">

            <h2>
              📈 Weekly Activity
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={chartData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="tasks"
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="activity-card">

            <h2>
              🌱 Consistency Grid
            </h2>

            <div className="heatmap">

              {heatmapData.map(
                (
                  day,
                  index
                ) => (
                  <div
                    key={index}
                    className={`heat-cell level-${day.level}`}
                    title={
                      day.date
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>

        <div className="right-panel">

          <div className="circle-card">

            <h2>
              🌍 Island Completion
            </h2>

            <div className="completion-circle">
              {
                islandCompletion
              }
              %
            </div>

            <p>
              Keep completing
              tasks to expand
              your island.
            </p>

          </div>
          <div className="circle-card ai-coach-card">

<div className="coach-header">

  <h2>
    🤖 AI Coach
  </h2>

  <button
    className="coach-chat-btn"
    onClick={() =>
      setShowChat(true)
    }
  >
    Chat
  </button>

</div>

<div className="coach-advice">

  {(coachAdvice ||
    "Loading advice...")
    .split("\n")
    .filter(
      (line) =>
        line.trim() !== ""
    )
    .map(
      (line, index) => (
        <p
          key={index}
          className="coach-line"
        >
          {line}
        </p>
      )
    )}

</div>
<button
  className="coach-btn"
  onClick={getAdvice}
>
  Generate Advice
</button>

</div>
{showChat && (

  <div className="chat-overlay">

    <div className="chat-modal">

      <h2>
        🤖 Ask Coach
      </h2>

      <textarea
        placeholder="Ask your coach anything..."
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
      />

<button
  className="coach-btn"
  onClick={askCoach}
>
  Ask
</button>

      {chatReply && (
        <div className="chat-reply">
          {chatReply}
        </div>
      )}

      <button
        className="close-btn"
        onClick={() => {
          setShowChat(false);
          setQuestion("");
          setChatReply("");
        }}
      >
        Close
      </button>

    </div>

  </div>

)}
          <div className="circle-card">

            <h2>
              🎯 Active Goals
            </h2>

            {goals.length ===
            0 ? (
              <p>
                No goals yet
              </p>
            ) : (
              goals
                .slice(0, 3)
                .map(
                  (
                    goal
                  ) => {
                    const progress =
                      goal.target >
                      0
                        ? Math.round(
                            (
                              goal.current /
                              goal.target
                            ) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={
                          goal._id
                        }
                        style={{
                          marginBottom:
                            "15px",
                        }}
                      >
                        <p>
                          {
                            goal.title
                          }
                        </p>

                        <div className="bar">
                          <div
                            className="fill green"
                            style={{
                              width:
                                `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )
            )}

          </div>

          <div className="circle-card">

            <h2>
              🔥 Streak Stats
            </h2>

            <p>
              Current:
              {" "}
              {island?.currentStreak || 0}
            </p>

            <p>
              Longest:
              {" "}
              {island?.longestStreak || 0}
            </p>

            <p>
              Completed Days:
              {" "}
              {island?.totalCompletedDays || 0}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Progress;