import "./skills.css";
import { useEffect, useState } from "react";
import API from "../api/axios";

function DeveloperProfile() {
  const [user, setUser] = useState(null);
  const [cfStats, setCfStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] =
    useState(null);
 
  const [atcoderStats, setAtcoderStats] =
  useState(null);

  const [codechefStats,
    setCodechefStats] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res =
        await API.get(
          "/developer-profile"
        );

      setUser(res.data.user);

      setCfStats(
        res.data.codeforces
      );

      

      setLeetcodeStats(
        res.data.leetcode
      );
      setAtcoderStats(
        res.data.atcoder
      );
      setCodechefStats(
        res.data.codechef
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="skills-page">

      <div className="skills-header">
        <div>
          <h1>
            Developer Profile
          </h1>

          <p>
            Track your coding
            journey across
            platforms.
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>
            {leetcodeStats?.solved ||
              0}
          </h2>
          <p>
            LeetCode Solved
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {cfStats?.rating ||
              0}
          </h2>
          <p>
            Codeforces Rating
          </p>
        </div>

 

        <div className="stat-card">
          <h2>
            {leetcodeStats?.contestRating ||
              0}
          </h2>
          <p>
            LC Contest Rating
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {cfStats?.maxRating ||
              0}
          </h2>
          <p>
            CF Max Rating
          </p>
        </div>
        <div className="stat-card">
  <h2>
    {atcoderStats?.rating || 0}
  </h2>

  <p>
    AtCoder Rating
  </p>
</div>



      <div className="stat-card">
  <h2>
    {codechefStats?.rating || 0}
  </h2>

  <p>
    CodeChef Rating
  </p>
</div>

</div>

<div className="platform-grid">

       

         

          <div className="roadmap-card">

            <h2>
              🟠 LeetCode Stats
            </h2>

            <div className="topic-row">
              <span>
                Problems Solved
              </span>

              <span>
                {leetcodeStats?.solved ||
                  0}
              </span>
            </div>

            <div className="topic-row">
              <span>
                Global Ranking
              </span>

              <span>
                {leetcodeStats?.ranking ||
                  0}
              </span>
            </div>

            <div className="topic-row">
              <span>
                Contest Rating
              </span>

              <span>
                {leetcodeStats?.contestRating ||
                  0}
              </span>
            </div>

          </div>

        

        

          <div className="roadmap-card">

            <h2>
              🔵 Codeforces Stats
            </h2>

            <div className="topic-row">
              <span>
                Rating
              </span>

              <span>
                {cfStats?.rating ||
                  0}
              </span>
            </div>

            <div className="topic-row">
              <span>
                Rank
              </span>

              <span>
                {cfStats?.rank ||
                  "N/A"}
              </span>
            </div>

            <div className="topic-row">
              <span>
                Max Rating
              </span>

              <span>
                {cfStats?.maxRating ||
                  0}
              </span>
            </div>

          </div>
          <div className="roadmap-card">

  <h2>
    🍥 AtCoder Stats
  </h2>

  <div className="topic-row">
    <span>
      Rating
    </span>

    <span>
      {atcoderStats?.rating || 0}
    </span>
  </div>

</div>



<div className="roadmap-card">

  <h2>
    🟤 CodeChef Stats
  </h2>

  <div className="topic-row">
    <span>
      Rating
    </span>

    <span>
      {codechefStats?.rating || 0}
    </span>
  </div>

  <div className="topic-row">
    <span>
      Stars
    </span>

    <span>
      {codechefStats?.stars || "N/A"}
    </span>
  </div>

</div>

          <div className="roadmap-card">

            <h2>
              🔥 Coding Activity
            </h2>

            <div className="heatmap">
              {Array.from({
                length: 180,
              }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={`heat ${
                      Math.random() >
                      0.5
                        ? "active"
                        : ""
                    }`}
                  />
                )
              )}
            </div>

          </div>

        </div>

      </div>

    
  );
}

export default DeveloperProfile;