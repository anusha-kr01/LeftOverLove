import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Example background image
const bgImage =
  "https://www.livemint.com/lm-img/img/2024/06/26/600x338/2-0-98883649-BPO--0_1681713616415_1719391366569.jpg";

const contacts = [
  { label: "📞 Support Hotline", value: "+91 98765 43210" },
  { label: "📧 Support Email", value: "support@leftoverlove.org" },
  { label: "📧 Donor Helpline", value: "donorhelp@leftoverlove.org" },
  { label: "📧 Organization Help", value: "orgsupport@leftoverlove.org" },
];

const faqs = [
  {
    q: "How do I donate leftover food?",
    a: "Go to the Donor page, fill in the details, and submit your food availability. Our system will match you with those in need."
  },
  {
    q: "How do I claim food as a receiver?",
    a: "On the Receiver page, browse available food and click 'Claim' on the item you want to receive."
  },
  {
    q: "How can organizations participate?",
    a: "Organizations can join as partners by adding their info on the Organization page and coordinating with our team for bulk donations."
  },
  {
    q: "How do I volunteer?",
    a: "Simply fill out the volunteer form on the Volunteer page, and we'll reach out to you for upcoming opportunities."
  },
  {
    q: "Who should I contact for urgent support?",
    a: "Call our hotline or email support@leftoverlove.org. For donor/organization-specific queries, use the respective helplines above."
  },
];

function Support() {
  const [form, setForm] = useState({ name: "", issue: "" });
  const [msg, setMsg] = useState("");
  const [showFaq, setShowFaq] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.issue) {
      setMsg("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "support"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setMsg("Support request submitted! Our team will get back to you soon.");
      setForm({ name: "", issue: "" });
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Error submitting support request.");
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
          background: "rgba(0,0,0,0.58)",
          zIndex: 1,
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "2.2rem 0 2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Heading & Contacts */}
        <div style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "1.6rem",
          textShadow: "0 2px 14px #111",
          maxWidth: 750,
        }}>
          <h2 style={{ fontWeight: 800, fontSize: "2.1rem", marginBottom: 7, letterSpacing: 1, color: "#fff" }}>
            📞 Need Help? Contact Our Support Team
          </h2>
          <p style={{ fontSize: "1.14rem", fontWeight: 400, marginBottom: "1.2rem" }}>
            We're here for donors, receivers, organizations, and volunteers. Reach out to us anytime!
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.1rem",
            marginBottom: "1.15rem"
          }}>
            {contacts.map((c, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.13)",
                color: "#fff",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: "1.09rem",
                boxShadow: "0 2px 14px rgba(0,0,0,0.09)",
                padding: "1.1rem 1.6rem",
                minWidth: 230,
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #ff7043"
              }}>
                <span style={{ marginRight: 8 }}>{c.label}</span>
                <span style={{ color: "#ff7043", marginLeft: 7 }}>{c.value}</span>
              </div>
            ))}
          </div>
          <a
            href="#faq-section"
            style={{
              color: "#ff7043",
              fontWeight: 700,
              fontSize: "1.07rem",
              textDecoration: "underline",
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
            onClick={e => {
              e.preventDefault();
              setShowFaq(true);
              setTimeout(() => {
                const el = document.getElementById("faq-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 80);
            }}
          >
            🔽 View Frequently Asked Questions (FAQ)
          </a>
        </div>

        {/* Support form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.13)",
            borderRadius: 15,
            boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
            padding: "2rem 2.2rem 1.5rem 2.2rem",
            maxWidth: 420,
            width: "100%",
            marginBottom: "2.3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            alignItems: "center",
            color: "#fff"
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 8 }}>Submit a Support Request</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={{
              width: "100%",
              border: "1px solid #fff",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.09)",
              color: "#fff"
            }}
            className="support-input"
          />
          <textarea
            name="issue"
            value={form.issue}
            onChange={handleChange}
            placeholder="Describe your issue"
            rows={4}
            required
            style={{
              width: "100%",
              border: "1px solid #fff",
              borderRadius: 8,
              padding: "0.8rem",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.09)",
              color: "#fff",
              resize: "vertical"
            }}
            className="support-input"
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
              color: msg.startsWith("Support request submitted") ? "#16a34a" : "#b91c1c",
              fontWeight: 500,
              textAlign: "center"
            }}>{msg}</div>
          )}
        </form>

        {/* FAQ Section */}
        <div
          id="faq-section"
          style={{
            maxWidth: 700,
            width: "100%",
            marginBottom: "2rem",
            display: showFaq ? "flex" : "none",
            flexDirection: "column",
            gap: "1.2rem",
            alignItems: "center",
            background: "none",
            padding: 0,
          }}
        >
          <h3 style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: 5,
            textAlign: "center"
          }}>
            Frequently Asked Questions
          </h3>
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                maxWidth: 540,
                background: "rgba(255,255,255,0.13)",
                borderRadius: 14,
                boxShadow: "0 2px 11px rgba(0,0,0,0.09)",
                margin: "0.2rem 0",
                borderLeft: openFaq === i ? "6px solid #ff7043" : "6px solid #eee",
                transition: "border-left 0.15s",
                cursor: "pointer",
                overflow: "hidden",
                color: "#fff"
              }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "1.05rem 1.3rem",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.13rem",
                background: openFaq === i ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                transition: "background 0.2s"
              }}>
                <span style={{
                  marginRight: 10,
                  fontSize: "1.2rem",
                  transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.18s"
                }}>
                  ▶
                </span>
                Q{i + 1}. {f.q}
              </div>
              <div
                style={{
                  maxHeight: openFaq === i ? 500 : 0,
                  opacity: openFaq === i ? 1 : 0,
                  transition: "max-height 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s",
                  overflow: "hidden",
                  padding: openFaq === i ? "1rem 1.8rem 1.2rem 2.6rem" : "0 1.8rem",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontSize: "1.07rem",
                  fontWeight: 500,
                  lineHeight: 1.6
                }}
              >
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Responsive styles and white placeholder */}
      <style>
        {`
        @media (max-width: 900px) {
          div[style*="maxWidth: 700px"] {
            max-width: 99vw !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
        }
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
            font-size: 1.35rem !important;
          }
        }
        /* White placeholder styles for support inputs */
        .support-input::placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        .support-input::-webkit-input-placeholder { color: #fff !important; }
        .support-input::-moz-placeholder { color: #fff !important; }
        .support-input:-ms-input-placeholder { color: #fff !important; }
        .support-input::-ms-input-placeholder { color: #fff !important; }
        `}
      </style>
    </div>
  );
}

export default Support;