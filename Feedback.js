import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Feedback page background image (replace with your own if desired)
const bgImage =
  "https://as2.ftcdn.net/jpg/04/85/09/55/1000_F_485095547_SEFnUTEscD7auyTTBqmhd7hfRA99sKPP.jpg";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    about: "",
    feedback: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.about || !form.feedback) {
      setMsg("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "feedbacks"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setMsg("Thank you for your valuable feedback!");
      setForm({ name: "", contact: "", about: "", feedback: "" });
      setTimeout(() => setMsg(""), 2500);
    } catch {
      setMsg("Error submitting feedback.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: 0,
        margin: 0,
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.60)",
          zIndex: 1,
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Catchy heading */}
        <div style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "1.5rem",
          textShadow: "0 2px 19px #111",
          maxWidth: 700,
        }}>
          <h2 style={{ fontWeight: 800, fontSize: "2.3rem", marginBottom: 7, letterSpacing: 2 }}>
            📝 We Value Your Feedback!
          </h2>
          <p style={{ fontSize: "1.18rem", fontWeight: 400 }}>
            Your experience matters. <b>Share your feedback</b> and help us improve LeftoverLove.<br />
            <span style={{ color: "#ff7043" }}>All feedback is reviewed seriously. In case of repeated issues, <b>particular organizations or donors may be blocked</b> to ensure safety and trust for all.</span>
          </p>
        </div>

        {/* Feedback form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.1)", // 90% transparent, 10% visible
            borderRadius: 18,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "2.2rem 2.4rem 1.7rem 2.4rem",
            maxWidth: 440,
            width: "100%",
            marginBottom: "2.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            alignItems: "center",
            backdropFilter: "blur(2px)",
            border: "1.5px solid rgba(255,255,255,0.22)",
            position: "relative",
            zIndex: 3
          }}
        >
          <h3 style={{ color: "#ff7043", fontWeight: 700, marginBottom: 8 }}>Send Feedback</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem"
            }}
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Contact (email or phone)"
            required
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem"
            }}
          />
          <select
            name="about"
            value={form.about}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              color: form.about ? "#222" : "#888",
              background: "#fff"
            }}
          >
            <option value="">Feedback About...</option>
            <option value="organization">Organization</option>
            <option value="donor">Donor</option>
            <option value="receiver">Receiver Experience</option>
            <option value="volunteer">Volunteer</option>
            <option value="website">Website / App</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            placeholder="Share your feedback, issues, suggestions, etc."
            required
            rows={3}
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              resize: "vertical"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#ff7043",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.08rem",
              border: "none",
              borderRadius: 8,
              padding: "0.9rem",
              marginTop: "0.3rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Submit Feedback
          </button>
          {msg && (
            <div style={{
              marginTop: 12,
              color: msg.startsWith("Thank you") ? "#16a34a" : "#b91c1c",
              fontWeight: 500,
              textAlign: "center"
            }}>{msg}</div>
          )}
        </form>
      </main>
      {/* Responsive styles */}
      <style>
        {`
        @media (max-width: 700px) {
          main[style] {
            padding-top: 1.2rem !important;
          }
          form[style] {
            max-width: 99vw !important;
            padding-left: 0.7rem !important;
            padding-right: 0.7rem !important;
          }
          h2[style] {
            font-size: 1.40rem !important;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Feedback;