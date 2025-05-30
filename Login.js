import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

// Sample background image (replace with your own if desired)
const bgImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1,
          width: "100vw",
          height: "100vh",
        }}
      />

      {/* Centered Container: aligns content in the middle */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        {/* Title & CTA */}
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            marginBottom: "2rem",
            width: "90vw",
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: "bold",
              letterSpacing: 2,
              marginBottom: 8,
              marginTop: 0,
              color: "#fff"
            }}
          >
            LeftoverLove
          </h1>
          <h3
            style={{
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 3vw, 2rem)",
              marginBottom: 16,
              color: "#fff"
            }}
          >
            "Sharing is caring, waste less, feed more."
          </h3>
          <Link
            to="/signup"
            style={{
              background: "#ff7043",
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: 30,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "background 0.2s",
              margin: "0.5rem 0",
              display: "inline-block",
            }}
          >
            Sign Up
          </Link>
        </div>

        {/* Login box */}
        <div
          style={{
            background: "rgba(255,255,255,0.13)",
            color: "#fff",
            borderRadius: 16,
            padding: "2rem 2.5rem",
            width: "90vw",
            maxWidth: 380,
            minWidth: 260,
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.16)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 0,
          }}
        >
          <h2 style={{ marginBottom: 20, color: "#fff" }}>Login</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "90%",
                padding: 10,
                margin: "10px 0",
                borderRadius: 6,
                border: "1px solid #fff",
                fontSize: "1rem",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.09)",
                color: "#fff"
              }}
              className="login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "90%",
                padding: 10,
                margin: "10px 0",
                borderRadius: 6,
                border: "1px solid #fff",
                fontSize: "1rem",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.09)",
                color: "#fff"
              }}
              className="login-input"
            />
            <button
              type="submit"
              style={{
                width: "95%",
                padding: "0.7rem",
                background: "#ff7043",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: "1.08rem",
                marginTop: 10,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Login
            </button>
          </form>
          <p style={{ margin: "1rem 0 0.5rem", color: "#fff" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#ff7043", fontWeight: "bold" }}>
              Sign up
            </Link>
          </p>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </div>
      </div>

      {/* Responsive styles and white placeholder */}
      <style>
        {`
        @media (max-width: 600px) {
          div[style*="maxWidth: 380px"] {
            padding: 1rem 0.6rem !important;
            min-width: unset !important;
            width: 98vw !important;
          }
          div[style*="maxWidth: 700px"] {
            padding: 0 0.25rem !important;
          }
        }
        .login-input::placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        .login-input::-webkit-input-placeholder { color: #fff !important; }
        .login-input::-moz-placeholder { color: #fff !important; }
        .login-input:-ms-input-placeholder { color: #fff !important; }
        .login-input::-ms-input-placeholder { color: #fff !important; }
        `}
      </style>
    </div>
  );
}

export default Login;