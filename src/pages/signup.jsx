import { FaMicrosoft, FaGoogle, FaGithub } from "react-icons/fa";
import "../signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await API.post(
        "/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Signup successful!");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-image">
        <img
          src="/spring-landscape.jpeg"
          alt="signup"
        />

        <svg
          className="wave-divider"
          viewBox="0 0 120 1000"
          preserveAspectRatio="none"
        >
          <path
            d="
            M60 0
            C110 80, 20 180, 70 280
            C120 380, 20 480, 70 580
            C120 680, 20 780, 70 880
            C120 940, 60 1000, 60 1000
            L120 1000
            L120 0
            Z
            "
          />
        </svg>
      </div>

      <div className="signup-form">

        <p className="welcome-text">
          Build better habits everyday 🌱
        </p>

        <div className="social-row">

          <button className="social-btn">
            <FaGoogle />
            Sign up with Google
          </button>

          <button className="social-btn">
            <FaMicrosoft />
            Sign up with Microsoft
          </button>

          <button className="social-btn">
            <FaGithub />
            Sign up with Github
          </button>

        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="input-row">

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

        </div>

        <div className="input-row">

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          </div>

        </div>

        <div className="terms">

          <input type="checkbox" />

          <span>
            I agree to terms of service and privacy policy
          </span>

        </div>

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <div className="loginconn">
          <p>
            Already have an account?

            <Link to="/login">
              {" "}Log in
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}