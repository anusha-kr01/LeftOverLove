import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile, updatePassword } from "firebase/auth";

// Example background image (can be replaced)
const bgImage =
  "https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148874050.jpg?ga=GA1.1.572223408.1747367813&semt=ais_hybrid&w=740";

function Settings() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [msg, setMsg] = useState("");

  // Change display name
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName });
      setMsg("Name updated!");
    } catch {
      setMsg("Error updating name.");
    }
  };

  // Change password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(user, password);
      setMsg("Password updated!");
      setPassword("");
    } catch {
      setMsg("Error updating password.");
    }
  };

  // Toggle dark mode
  const handleDarkMode = () => {
    setDarkMode((v) => {
      localStorage.setItem("darkMode", !v);
      document.body.classList.toggle("dark-mode", !v);
      return !v;
    });
    setMsg("Theme updated!");
  };

  // Catchy headline
  const catchy = "Personalize your experience. Change your name, password, or switch between light and dark mode!";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode
            ? "rgba(15,15,15,0.82)"
            : "rgba(0,0,0,0.36)",
          zIndex: 1,
          transition: "background 0.2s"
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "3rem"
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "2.1rem",
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: "1rem",
            textShadow: "0 4px 24px #000"
          }}
        >
          ⚙️ Settings
        </h2>
        <div
          style={{
            color: "#fff",
            fontSize: "1.16rem",
            marginBottom: "2rem",
            textAlign: "center",
            textShadow: "0 2px 10px #000",
            maxWidth: 450
          }}
        >
          {catchy}
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.13)",
            borderRadius: 18,
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            padding: "2.1rem 2.1rem 1.5rem 2.1rem",
            maxWidth: 400,
            width: "100%",
            marginBottom: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.1rem",
            alignItems: "center",
            color: "#fff"
          }}
        >
          {/* Name update */}
          <form
            onSubmit={handleNameUpdate}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem"
            }}
          >
            <label style={{ color: "#fff", fontWeight: 600 }}>
              Display Name
            </label>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Name"
              style={{
                border: "1px solid #fff",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "1rem",
                marginBottom: 4,
                background: "rgba(255,255,255,0.07)",
                color: "#fff"
              }}
              className="settings-input"
            />
            <button
              type="submit"
              style={{
                background: "#ff7043",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: 8,
                padding: "0.72rem",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: 4
              }}
            >
              Update Name
            </button>
          </form>
          {/* Password update */}
          <form
            onSubmit={handlePasswordUpdate}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem"
            }}
          >
            <label style={{ color: "#fff", fontWeight: 600 }}>
              Change Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password"
              style={{
                border: "1px solid #fff",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "1rem",
                marginBottom: 4,
                background: "rgba(255,255,255,0.07)",
                color: "#fff"
              }}
              className="settings-input"
            />
            <button
              type="submit"
              style={{
                background: "#ff7043",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: 8,
                padding: "0.72rem",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: 4
              }}
            >
              Update Password
            </button>
          </form>
          {/* Dark mode toggle */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 600 }}>
              Dark Mode
            </span>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkMode}
                style={{
                  accentColor: "#ff7043",
                  width: 22,
                  height: 22,
                  marginRight: 8
                }}
              />
              <span style={{
                color: darkMode ? "#ff7043" : "#fff",
                fontWeight: 600
              }}>
                {darkMode ? "ON" : "OFF"}
              </span>
            </label>
          </div>
          {/* Message */}
          {msg && (
            <div
              style={{
                marginTop: 4,
                color: msg.includes("updated") ? "#16a34a" : "#b91c1c",
                fontWeight: 500,
                textAlign: "center"
              }}
            >
              {msg}
            </div>
          )}
        </div>
      </main>
      {/* Small dark mode effect and white placeholder */}
      <style>
        {`
        body.dark-mode {
          background: #222 !important;
          color: #fff !important;
        }
        @media (max-width: 700px) {
          main[style] {
            padding-top: 1.2rem !important;
          }
          div[style*="maxWidth: 400px"] {
            max-width: 99vw !important;
            padding-left: 0.7rem !important;
            padding-right: 0.7rem !important;
          }
          h2[style] {
            font-size: 1.35rem !important;
          }
        }
        /* White placeholder styles for settings inputs */
        .settings-input::placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        .settings-input::-webkit-input-placeholder { color: #fff !important; }
        .settings-input::-moz-placeholder { color: #fff !important; }
        .settings-input:-ms-input-placeholder { color: #fff !important; }
        .settings-input::-ms-input-placeholder { color: #fff !important; }
        `}
      </style>
    </div>
  );
}

export default Settings;