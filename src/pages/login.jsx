import { useEffect, useState } from "react";
import {
    FaGoogle,
    FaGithub,
    FaMicrosoft
  } from "react-icons/fa";
  import {Link } from "react-router-dom";

export default function Login() {
  const [text, setText] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

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
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="login-btn"
                onClick={() => setStep(2)}
              >
                Continue
              </button>
              <div className="signconn">
                <p>Don't have an account?
                <span style={{color:"black"}}><Link to = "/signup">Signup!</Link></span>
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
              />

              <button className="login-btn">
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