import { useEffect, useState } from "react";
import API from "../api/axios";
import "./home.css";
import treeImg from "../assets/tree.png";
import flowerImg from "../assets/flower.png";
import houseImg from "../assets/house.png";
import islandImg from "../assets/island.png";
import lgreentree from "../assets/lightgreen.png";
import yellowflo from "../assets/yellowflower.png";
import purpleflo from "../assets/purpleflower.png";
import stoneImg from "../assets/stone.png";
import pondImg from "../assets/pondr.png";

import campfireImg from "../assets/campfire.png";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Home() {
  const [user, setUser] = useState(null);
  const [island, setIsland] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const darkTreePositions = [
    { top: "49%", left: "33%" },
    { top: "63%", left: "52%" },
    { top: "50%", left: "90%" },
    { top: "68%", left: "60%" },
    { top: "31%", left: "58%" },
    { top: "45%", left: "85%" },
    { top: "37%", left: "46%" },
    { top: "55%", left: "88%" },
  ];

  const lightTreePositions = [
    { top: "44.9%", left: "37%" },
    { top: "52%", left: "36%" },
    { top: "65%", left: "55%" },
    { top: "69%", left: "65%" },
    { top: "28%", left: "62%" },
  ];

  const pinkFlowerPositions = [
    { top: "48%", left: "81%" },
    { top: "40%", left: "36%" },
    { top: "28%", left: "53%" },
    { top: "58%", left: "64%" },
    { top: "47%", left: "42%" },
    { top: "50%", left: "81%" },
  ];

  const purpleFlowerPositions = [
    { top: "33%", left: "39%" },
    { top: "40%", left: "79%" },
    { top: "25%", left: "58%" },
    { top: "42%", left: "69%" },
    { top: "50%", left: "52%" },
  ];

  const yellowFlowerPositions = [
    { top: "44%", left: "78%" },
    { top: "44%", left: "35%" },
    { top: "24%", left: "50%" },
    { top: "52%", left: "60%" },
    
  ];

  const housePositions = [{ top: "46%", left: "68%" }];
  

  const stonePositions = [
    { top: "40%", left: "63%" },
    { top: "50%", left: "61%" },
    { top: "43%", left: "60%" },
    { top: "45%", left: "57%" },//
    { top: "48%", left: "64%" },
    { top: "45%", left: "68%" },
  ];

  const streakData = Array.from(
    { length: island?.currentStreak || 1 },
    (_, i) => ({
      day: `D${i + 1}`,
      streak: i + 1,
    })
  );

  useEffect(() => {
    fetchData();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.user);
      setIsland(res.data.island);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Simple toggle function - just check/uncheck
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  if (loading) {
    return (
      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="welcome-card">
        <h2>Welcome, {user?.name}</h2>
      </div>
      <div className="island-stats">

  <div className="island-stat-box">
    <span>🌲 Trees</span>
    <h3>{island?.trees || 0}</h3>
  </div>

  <div className="island-stat-box">
    <span>🌸 Flowers</span>
    <h3>{island?.flowers || 0}</h3>
  </div>

  <div className="island-stat-box">
    <span>🏠 Cottage</span>
    <h3>{island?.houses || 0}</h3>
  </div>

  <div className="island-stat-box">
    <span>🪨 Stones</span>
    <h3>{island?.stones || 0}</h3>
  </div>

  <div className="island-stat-box">
    <span>🔥 Streak</span>
    <h3>{island?.currentStreak || 0}</h3>
  </div>

</div>

      <div className="dashboard">
        <div className="left-column">
          <div className="tasks-card">
            <h2>🎯 Today's Tasks</h2>

            {tasks.length === 0 ? (
              <p>No tasks yet</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="task">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id)}
                  />
                  <label>{task.title}</label>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="island-section">
          <div className="island-container">
            <img
              src={islandImg}
              alt="Island"
              className="island-base"
            />
            <div className="stuff">
              {darkTreePositions
                .slice(0, Math.min(island?.trees || 0, 8))
                .map((tree, index) => (
                  <img
                    key={`dark-${index}`}
                    src={treeImg}
                    alt="tree"
                    className="tree darktree"
                    style={{
                      top: tree.top,
                      left: tree.left,
                    }}
                  />
                ))}

              {lightTreePositions
                .slice(
                  0,
                  Math.max(0, Math.min((island?.trees || 0) - 8, 5))
                )
                .map((tree, index) => (
                  <img
                    key={`light-${index}`}
                    src={lgreentree}
                    alt="tree"
                    className="tree lighttree"
                    style={{
                      top: tree.top,
                      left: tree.left,
                    }}
                  />
                ))}

              {pinkFlowerPositions
                .slice(0, island?.flowers || 0)
                .map((flower, index) => (
                  <img
                    key={`pink-${index}`}
                    src={flowerImg}
                    alt="flower"
                    className="flower"
                    style={{
                      top: flower.top,
                      left: flower.left,
                    }}
                  />
                ))}

              {purpleFlowerPositions
                .slice(0, Math.max(0, (island?.flowers || 0) - 3))
                .map((flower, index) => (
                  <img
                    key={`purple-${index}`}
                    src={purpleflo}
                    alt="flower"
                    className="flower"
                    style={{
                      top: flower.top,
                      left: flower.left,
                    }}
                  />
                ))}

              {yellowFlowerPositions
                .slice(0, Math.max(0, (island?.flowers || 0) - 5))
                .map((flower, index) => (
                  <img
                    key={`yellow-${index}`}
                    src={yellowflo}
                    alt="flower"
                    className="flower"
                    style={{
                      top: flower.top,
                      left: flower.left,
                    }}
                  />
                ))}

{island?.houses === 1 &&
  housePositions.map((house, index) => (
    <img
      key={index}
      src={houseImg}
      alt="house"
      className="house"
      style={{
        top: house.top,
        left: house.left,
      }}
    />
  ))}

              {stonePositions
                .slice(0, island?.stones || 0)
                .map((stone, index) => (
                  <img
                    key={`stone-${index}`}
                    src={stoneImg}
                    alt="stone"
                    className="stone"
                    style={{
                      top: stone.top,
                      left: stone.left,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="consistency-card">
        <h2>📈 Consistency</h2>
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <LineChart data={streakData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="streak"
                stroke="#4caf50"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;