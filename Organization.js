import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from "firebase/firestore";

// Example background image (replace with your own)
const bgImage =
  "https://i0.wp.com/www.udayfoundation.org/wp-content/uploads/2017/02/Food-donation-homeless-delhi-hospital.jpg?zoom=2.34375&w=1224&ssl=";

function Organization() {
  const [form, setForm] = useState({
    orgName: "",
    contact: "",
    location: "",
  });
  const [result, setResult] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [recentOrgs, setRecentOrgs] = useState([]);

  // Fetch the most recent 5 organizations
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(
          collection(db, "organizations"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const snap = await getDocs(q);
        const items = [];
        snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
        setRecentOrgs(items);
      } catch (err) {
        setRecentOrgs([]);
      }
    };
    fetchRecent();
  }, [result]); // Refetch after a new org is added

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.orgName || !form.contact || !form.location) {
      setResult("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "organizations"), {
        ...form,
        tag: "donate",
        createdAt: serverTimestamp(),
      });
      setResult("Organization donation submitted!");
      setForm({ orgName: "", contact: "", location: "" });
      setShowForm(false);
      setTimeout(() => setResult(""), 2500);
    } catch {
      setResult("Submission failed. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.54)",
          zIndex: 1,
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "3rem 0 1rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Quote block - NO white background */}
        <div
          style={{
            maxWidth: 600,
            width: "95vw",
            marginBottom: "2.3rem",
            textAlign: "center",
            background: "none",
            boxShadow: "none",
            padding: "0",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#ff7043",
              margin: 0,
              marginBottom: "0.7rem",
              letterSpacing: 2,
              textShadow: "0 4px 24px #000"
            }}
          >
            LeftoverLove: Organization Partners
          </h2>
          <blockquote
            style={{
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "#fff",
              margin: "0 auto 1.3rem auto",
              maxWidth: 550,
              lineHeight: 1.5,
              textShadow: "0 2px 8px #000"
            }}
          >
            “Contribute to help people who are in need of food. <br />
            Your organization can make a real difference in fighting hunger.” 
          </blockquote>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              background: "#ff7043",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "0.85rem 2.3rem",
              borderRadius: 30,
              margin: "1.2rem 0 0.5rem 0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.11)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {showForm ? "Close" : "Add Your Organization"}
          </button>
        </div>

        {/* Dropdown Org Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.99)",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              padding: "2rem 2.5rem 1.5rem 2.5rem",
              maxWidth: 400,
              width: "98vw",
              marginBottom: "2.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.05rem",
              alignItems: "center"
            }}
          >
            <h3 style={{ color: "#ff7043", fontWeight: 700, marginBottom: 6 }}>Organization Info</h3>
            <input
              name="orgName"
              value={form.orgName}
              onChange={handleChange}
              placeholder="Organization Name"
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "0.85rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact Person/Email"
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "0.85rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "0.85rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
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
                padding: "0.8rem",
                marginTop: 8,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Submit
            </button>
            {result && (
              <div style={{
                marginTop: 10,
                color: result.startsWith("Organization donation") ? "#16a34a" : "#b91c1c",
                fontWeight: 500,
                textAlign: "center"
              }}>
                {result}
              </div>
            )}
          </form>
        )}

        {/* Recent Orgs - now transparent cards */}
        <div
          style={{
            maxWidth: 530,
            width: "100%",
            marginBottom: "1rem",
            marginTop: showForm ? 0 : "1rem",
            background: "none",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <h3 style={{
            color: "#ff7043",
            fontWeight: 700,
            marginBottom: 16,
            fontSize: "1.13rem",
            textAlign: "center",
            textShadow: "0 2px 12px #000"
          }}>
            Organizations supporting us recently
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem"
          }}>
            {recentOrgs.length === 0 && (
              <div style={{ color: "#fff", padding: "0.5rem 0", textAlign: "center", textShadow: "0 1px 10px #000" }}>
                No organizations yet. Be the first to join our cause!
              </div>
            )}
            {recentOrgs.map((org) => (
              <div
                key={org.id}
                style={{
                  background: "rgba(255,255,255,0.14)", // <-- transparent card!
                  borderRadius: "10px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                  padding: "0.88rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderLeft: "4px solid #ff7043",
                  color: "#fff" // make all text in card white for better readability
                }}
              >
                <div style={{ fontWeight: 600, color: "#fff", fontSize: "1.07rem" }}>
                  {org.orgName}
                </div>
                <div style={{ color: "#fff", fontSize: "0.95rem", margin: "0.2rem 0 0.1rem 0" }}>
                  Contact: {org.contact}
                </div>
                <div style={{ color: "#fff", fontSize: "0.95rem" }}>
                  Location: {org.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Responsive styles */}
      <style>
        {`
        @media (max-width: 700px) {
          main[style] {
            padding-top: 1.2rem !important;
          }
          div[style*="maxWidth: 600px"] {
            padding: 1.1rem 0.5rem !important;
          }
          form[style] {
            max-width: 99vw !important;
            padding-left: 0.7rem !important;
            padding-right: 0.7rem !important;
          }
          div[style*="maxWidth: 530px"] {
            max-width: 99vw !important;
            padding-left: 0.2rem !important;
            padding-right: 0.2rem !important;
          }
          h2[style] {
            font-size: 1.35rem !important;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Organization;