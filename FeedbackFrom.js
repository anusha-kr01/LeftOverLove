import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function FeedbackForm({ afterSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.name || !form.email || !form.message) {
      setMsg("Please fill all fields.");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setMsg("Thank you for your feedback!");
      setForm({ name: "", email: "", message: "" });
      if (afterSubmit) afterSubmit();
    } catch {
      setMsg("Error submitting feedback. Try again.");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: 500 }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        disabled={submitting}
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        disabled={submitting}
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Feedback"
        rows={4}
        required
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </form>
  );
}

export default FeedbackForm;