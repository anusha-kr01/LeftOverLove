import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

// Food donation background image (Unsplash, license-free)
const bgImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80";

function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed. Try again or use different email.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(255,247,240,0.93),rgba(255,231,238,0.95)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        position: "relative",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.96)",
          borderRadius: 18,
          boxShadow: "0 4px 32px 0 rgba(0,0,0,0.17)",
          padding: "2.7rem 2.3rem 2.1rem 2.3rem",
          minWidth: 340,
          maxWidth: 380,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.1rem",
          zIndex: 2,
        }}
      >
        <img
          src="/leftoverlove-logo.png"
          alt="Left Over Love Logo"
          style={{
            height: 64,
            marginBottom: 12,
            marginTop: -10,
            filter: "drop-shadow(0 2px 9px #ff704388)"
          }}
        />
        <h2 style={{
          fontWeight: 800,
          color: "#ff7043",
          marginBottom: 8,
          letterSpacing: 1,
          fontSize: "1.8rem"
        }}>
          Create an Account
        </h2>
        <div style={{ color: "#444", fontSize: "1.09rem", textAlign: "center", marginBottom: 8 }}>
          Join Left Over Love and make a difference with every meal 🍽️
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: "0.9rem",
            width: "100%",
            fontSize: "1.07rem",
            marginBottom: 3,
            background: "#fafafa"
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: "0.9rem",
            width: "100%",
            fontSize: "1.07rem",
            background: "#fafafa"
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#ff7043",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.09rem",
            border: "none",
            borderRadius: 8,
            padding: "0.95rem",
            marginTop: "0.3rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            transition: "background 0.2s",
            letterSpacing: 0.2,
          }}
        >
          Sign Up
        </button>
        <div style={{ marginTop: 6, fontSize: "0.99rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff7043", fontWeight: 600, textDecoration: "underline" }}>
            Login
          </Link>
        </div>
        {error && (
          <div style={{ color: "#b91c1c", marginTop: 7, fontWeight: 500 }}>
            {error}
          </div>
        )}
      </form>
      {/* Responsive styles */}
      <style>
        {`
        @media (max-width: 600px) {
          form[style] {
            min-width: 98vw !important;
            max-width: 98vw !important;
            padding: 1.3rem 0.6rem 1.1rem 0.6rem !important;
          }
          h2[style] { font-size: 1.2rem !important; }
        }
        `}
      </style>
    </div>
  );
}

export default Signup;