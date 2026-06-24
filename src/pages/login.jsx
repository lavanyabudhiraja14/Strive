import "../index.css";
import { useEffect, useState } from "react";
import {
  FaGoogle,
  FaGithub,
  FaMicrosoft,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const [text, setText] = useState("");
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const word = "STRIVE";
    let i = 0;

    const timer = setInterval(() => {
      if (i < word.length) {
        setText(word.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 🎉");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="logo-container">
          <span className="plant">🌱</span>
          <h1 className="logo">{text}</h1>
        </div>

        <p className="tagline">
          Build better habits every day
        </p>

        {step === 1 && (
          <div className="screen">

            <div className="login-card">

              <input
                type="email"
                placeholder="Email address"
                className="input-field"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <button
                className="login-btn"
                onClick={() => setStep(2)}
              >
                Continue
              </button>

              <div className="signconn">
                <p>
                  Don't have an account?
                  <span style={{ color: "black" }}>
                    <Link to="/signup">
                      Signup!
                    </Link>
                  </span>
                </p>
              </div>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="social-btn">
                <FaGoogle />
                Continue with Google
              </button>

              <button className="social-btn">
                <FaMicrosoft />
                Continue with Microsoft
              </button>

              <button className="social-btn">
                <FaGithub />
                Continue with GitHub
              </button>

            </div>
          </div>
        )}

        {step === 2 && (
          <div className="screen">

            <div className="login-card">

              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="login-btn"
                onClick={handleLogin}
              >
                Log In
              </button>

              <button
                className="back-btn"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}