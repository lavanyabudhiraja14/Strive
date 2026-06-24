import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import API from "../api/axios";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [goalId, setGoalId] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchGoals();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const activeTasks = tasks.filter(
    (task) => !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks /
            tasks.length) *
            100
        )
      : 0;

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await API.post("/tasks", {
        title: newTask,
        goalId,
        date: new Date()
          .toISOString()
          .split("T")[0],
      });

      setNewTask("");
      setGoalId("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (
    id,
    completed
  ) => {
    try {
      await API.put(`/tasks/${id}`, {
        completed: !completed,
      });

      fetchTasks();
      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="calendar-page">

      <div className="calendar-header">
        <div>
          <h1>📅 Calendar</h1>
          <p>
            Plan your tasks and track
            consistency
          </p>
        </div>
      </div>

      <div className="calendar-layout">

        {/* LEFT SIDE */}

        <div className="calendar-section">

          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date }) => {
              const hasCompletedTask =
                tasks.some((task) => {
                  if (!task.completed)
                    return false;

                  const taskDate =
                    new Date(
                      task.updatedAt
                    ).toDateString();

                  return (
                    taskDate ===
                    date.toDateString()
                  );
                });

              return hasCompletedTask ? (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      "#5cb85c",
                    margin: "0 auto",
                    marginTop: "4px",
                  }}
                />
              ) : null;
            }}
          />

          <div className="consistency-card">
            <h2>
              📈 Consistency Overview
            </h2>

            <p>
              Completed Tasks:
              {" "}
              {completedTasks}
              /
              {tasks.length}
            </p>
          </div>

          <div className="consistency-card">
            <h2>
              🎯 Active Goals
            </h2>

            {goals.length === 0 ? (
              <p>
                No active goals
              </p>
            ) : (
              goals
                .filter(
                  (goal) =>
                    !goal.completed
                )
                .slice(0, 4)
                .map((goal) => (
                  <p
                    key={goal._id}
                  >
                    {goal.title}
                    {" "}
                    (
                    {goal.current}
                    /
                    {goal.target}
                    )
                  </p>
                ))
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="sidebar-panel">

          <div className="tasks-card">

            <h2>
              📝 Your Tasks
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "10px",
                marginBottom:
                  "15px",
              }}
            >
              <input
                type="text"
                placeholder="Add task..."
                value={newTask}
                onChange={(e) =>
                  setNewTask(
                    e.target.value
                  )
                }
              />

              <select
                value={goalId}
                onChange={(e) =>
                  setGoalId(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Goal
                </option>

                {goals.map(
                  (goal) => (
                    <option
                      key={
                        goal._id
                      }
                      value={
                        goal._id
                      }
                    >
                      {
                        goal.title
                      }
                    </option>
                  )
                )}
              </select>

              <button
                className="add-task-btn"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>

            {activeTasks.length ===
            0 ? (
              <p>
                No tasks yet
              </p>
            ) : (
              activeTasks.map(
                (task) => {
                  const linkedGoal =
                    goals.find(
                      (
                        goal
                      ) =>
                        goal._id ===
                        task.goalId
                    );

                  return (
                    <div
                      key={
                        task._id
                      }
                      className="task-item"
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        marginBottom:
                          "12px",
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          alignItems:
                            "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            task.completed
                          }
                          onChange={() =>
                            completeTask(
                              task._id,
                              task.completed
                            )
                          }
                        />

                        <div>
                          <div>
                            {
                              task.title
                            }
                          </div>

                          {linkedGoal && (
                            <small>
                              🎯{" "}
                              {
                                linkedGoal.title
                              }
                            </small>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          deleteTask(
                            task._id
                          )
                        }
                        style={{
                          border:
                            "none",
                          background:
                            "transparent",
                          cursor:
                            "pointer",
                          fontSize:
                            "18px",
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                }
              )
            )}

          </div>

          <div className="monthly-card">
            <h2>
              📊 Monthly Progress
            </h2>

            <div className="progress-circle">
              {progress}%
            </div>
          </div>

          <div className="monthly-card">
            <h2>
              🚀 Productivity
            </h2>

            <p>
              📝 Total Tasks:
              {" "}
              {tasks.length}
            </p>

            <p>
              ✅ Completed:
              {" "}
              {
                completedTasks
              }
            </p>

            <p>
              🎯 Goals:
              {" "}
              {goals.length}
            </p>

            <p>
              📈 Success Rate:
              {" "}
              {progress}%
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CalendarPage;