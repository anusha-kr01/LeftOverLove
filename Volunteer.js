import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, updateDoc, doc } from "firebase/firestore";

// You can replace this with your own background image
const bgImage =
  "https://www.globalgiving.org/pfil/5067/pict_large.jpg";

// Static volunteer Smriti inbuilt to always show
const staticVolunteers = [
  {
    id: "static-smriti-1",
    name: "Smriti (NGO Volunteer)",
    contact: "6364072676",
    area: "NGO"
  }
];

function Volunteer() {
  const [form, setForm] = useState({ name: "", contact: "", area: "" });
  const [msg, setMsg] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState({ id: "", name: "", contact: "", area: "" });
  const [updateMsg, setUpdateMsg] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  // Fetch latest 6 volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      const q = query(
        collection(db, "volunteers"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const snap = await getDocs(q);
      const items = [];
      snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
      // Always show Smriti at top, then DB volunteers (remove any accidental duplicates)
      const others = items.filter(
        (v) => v.contact !== staticVolunteers[0].contact && v.name !== staticVolunteers[0].name
      );
      setVolunteers([...staticVolunteers, ...others]);
    };
    fetchVolunteers();
  }, [msg, updateMsg]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Update volunteer
  const handleUpdateChange = (e) =>
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateForm.name || !updateForm.contact || !updateForm.area) {
      setUpdateMsg("Please fill all fields.");
      return;
    }
    try {
      await updateDoc(doc(db, "volunteers", updateForm.id), {
        name: updateForm.name,
        contact: updateForm.contact,
        area: updateForm.area,
      });
      setUpdateMsg("Your info was updated!");
      setShowUpdateForm(false);
      setUpdateForm({ id: "", name: "", contact: "", area: "" });
      setTimeout(() => setUpdateMsg(""), 2000);
    } catch {
      setUpdateMsg("Error updating info.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.area) {
      setMsg("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "volunteers"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setMsg("Thank you for volunteering!");
      setForm({ name: "", contact: "", area: "" });
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Error submitting form.");
    }
  };

  // Prefill update form
  const startUpdate = (vol) => {
    if (vol.id && vol.id.startsWith("static-smriti")) {
      setUpdateMsg("This volunteer's info cannot be edited.");
      setShowUpdateForm(false);
      setTimeout(() => setUpdateMsg(""), 2500);
      return;
    }
    setUpdateForm({
      id: vol.id,
      name: vol.name,
      contact: vol.contact,
      area: vol.area,
    });
    setShowUpdateForm(true);
    setUpdateMsg("");
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
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "3rem 0 2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Catchy heading */}
        <div style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "1.5rem",
          textShadow: "0 2px 19px #111",
          maxWidth: 600,
        }}>
          <h2 style={{
            fontWeight: 800,
            fontSize: "2.3rem",
            marginBottom: 7,
            letterSpacing: 2,
            color: "#fff", // <-- WHITE FONT COLOR HERE
            textShadow: "0 2px 19px #111"
          }}>
            🚗 Volunteer With Us
          </h2>
          <p style={{ fontSize: "1.18rem", fontWeight: 400 }}>
            Why don't you help us in this mission? Join as a volunteer and be the reason someone has a meal today!
          </p>
        </div>

        {/* Volunteer registration form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.13)",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
            padding: "2rem 2.2rem 1.5rem 2.2rem",
            maxWidth: 400,
            width: "100%",
            marginBottom: "2.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 8 }}>Become a Volunteer</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={{
              width: "100%",
              border: "1px solid #fff",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
            className="vol-input"
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Contact Info"
            required
            style={{
              width: "100%",
              border: "1px solid #fff",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
            className="vol-input"
          />
          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Preferred Area"
            required
            style={{
              width: "100%",
              border: "1px solid #fff",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
            className="vol-input"
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
            Submit
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

        {/* Update Contact Info Form (Dropdown) */}
        {showUpdateForm && (
          <form
            onSubmit={handleUpdate}
            style={{
              background: "rgba(255,255,255,0.13)",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
              padding: "1.5rem 2rem 1rem 2rem",
              maxWidth: 390,
              width: "95vw",
              marginBottom: "1.7rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center"
            }}
          >
            <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: 5 }}>Update Your Contact Info</h4>
            <input
              name="name"
              value={updateForm.name}
              onChange={handleUpdateChange}
              placeholder="Name"
              required
              style={{
                width: "100%",
                border: "1px solid #fff",
                borderRadius: 7,
                padding: "0.75rem",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
              }}
              className="vol-input"
            />
            <input
              name="contact"
              value={updateForm.contact}
              onChange={handleUpdateChange}
              placeholder="Contact Info"
              required
              style={{
                width: "100%",
                border: "1px solid #fff",
                borderRadius: 7,
                padding: "0.75rem",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
              }}
              className="vol-input"
            />
            <input
              name="area"
              value={updateForm.area}
              onChange={handleUpdateChange}
              placeholder="Preferred Area"
              required
              style={{
                width: "100%",
                border: "1px solid #fff",
                borderRadius: 7,
                padding: "0.75rem",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
              }}
              className="vol-input"
            />
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#ff7043",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.04rem",
                border: "none",
                borderRadius: 7,
                padding: "0.75rem",
                marginTop: "0.3rem",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateForm(false)}
              style={{
                marginTop: 7,
                background: "#eee",
                color: "#333",
                border: "none",
                borderRadius: 7,
                padding: "0.55rem 1.3rem",
                cursor: "pointer",
                fontSize: "0.99rem"
              }}
            >
              Cancel
            </button>
            {updateMsg && (
              <div style={{
                marginTop: 10,
                color: updateMsg.startsWith("Your info") ? "#16a34a" : "#b91c1c",
                fontWeight: 500,
                textAlign: "center"
              }}>
                {updateMsg}
              </div>
            )}
          </form>
        )}

        {/* Volunteers List */}
        <div
          style={{
            maxWidth: 700,
            width: "100%",
            marginBottom: "1.3rem",
            background: "none",
            padding: 0,
          }}
        >
          <h3 style={{
            color: "#ff7043",
            fontWeight: 700,
            marginBottom: 16,
            fontSize: "1.13rem",
            textAlign: "center",
            textShadow: "0 2px 8px #000"
          }}>
            Contact / Request Volunteers
          </h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.1rem",
            justifyContent: "center"
          }}>
            {volunteers.length === 0 && (
              <div style={{ color: "#fff", padding: "0.5rem 0", textAlign: "center", textShadow: "0 1px 10px #000" }}>
                No volunteers yet. Be the first to join us!
              </div>
            )}
            {volunteers.map((vol) => (
              <div
                key={vol.id}
                style={{
                  background: "rgba(255,255,255,0.13)",
                  borderRadius: "12px",
                  boxShadow: "0 1px 7px rgba(0,0,0,0.10)",
                  padding: "1rem 1.15rem",
                  minWidth: 210,
                  maxWidth: 250,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderLeft: "4px solid #ff7043",
                  position: "relative",
                  color: "#fff"
                }}
              >
                <div style={{ fontWeight: 600, color: "#fff", fontSize: "1.08rem" }}>
                  {vol.name}
                  {vol.id === "static-smriti-1" && (
                    <span style={{
                      background: "#ff7043",
                      color: "#fff",
                      borderRadius: "7px",
                      fontSize: "0.89rem",
                      fontWeight: 700,
                      padding: "1px 7px",
                      marginLeft: 8
                    }}>NGO</span>
                  )}
                </div>
                <div style={{ color: "#fff", fontSize: "0.98rem", margin: "0.1rem 0 0.1rem 0" }}>
                  Contact: {vol.contact}
                </div>
                <div style={{ color: "#fff", fontSize: "0.97rem" }}>
                  Area: {vol.area}
                </div>
                <button
                  onClick={() => startUpdate(vol)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "#ff7043",
                    color: "#fff",
                    border: "none",
                    borderRadius: 5,
                    padding: "0.2rem 0.7rem",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    boxShadow: "0 1px 5px rgba(0,0,0,0.04)"
                  }}
                  title="Update your info"
                  disabled={vol.id === "static-smriti-1"}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Show updateMsg for Smriti static block attempts */}
        {updateMsg && (
          <div style={{
            color: "#b91c1c",
            fontWeight: 500,
            background: "rgba(255,255,255,0.13)",
            borderRadius: 7,
            padding: "0.5rem 1.1rem",
            margin: "0.8rem auto 0 auto",
            textAlign: "center"
          }}>{updateMsg}</div>
        )}
      </main>
      {/* Responsive styles and white placeholder */}
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
          div[style*="maxWidth: 700px"] {
            max-width: 99vw !important;
            padding-left: 0.2rem !important;
            padding-right: 0.2rem !important;
          }
          h2[style] {
            font-size: 1.40rem !important;
          }
        }
        /* White placeholder styles for volunteer inputs */
        .vol-input::placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        .vol-input::-webkit-input-placeholder { color: #fff !important; }
        .vol-input::-moz-placeholder { color: #fff !important; }
        .vol-input:-ms-input-placeholder { color: #fff !important; }
        .vol-input::-ms-input-placeholder { color: #fff !important; }
        `}
      </style>
    </div>
  );
}

export default Volunteer;