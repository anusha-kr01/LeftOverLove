import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/Dashboard.css";

// Logo path
const logoUrl = "/leftoverlove-logo.png"; // Make sure this file exists in your public folder

// Use your requested background image
const bgImage =
  "https://www.foodbusinessnews.net/ext/resources/2022/09/21/Anina_Lead.jpg?height=667&t=1663859548&width=1080";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility to format time ago
  function timeAgo(date) {
    if (!date) return "sometime ago";
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  }

  useEffect(() => {
    if (!user) return;
    let ignore = false;

    async function fetchActivity() {
      setLoading(true);
      let act = [];
      try {
        // Fetch user's donations (meals saved)
        const donationsSnap = await getDocs(
          query(
            collection(db, "donations"),
            where("userId", "==", user.uid)
          )
        );
        donationsSnap.forEach(doc => {
          const d = doc.data();
          act.push({
            icon: "🍽️",
            content: `You donated food: ${d.foodName || "a meal"}`,
            time: timeAgo(d.createdAt?.toDate?.() || d.createdAt?.seconds ? new Date(d.createdAt.seconds * 1000) : null),
          });
        });

        // Fetch user's claims (food received)
        const claimsSnap = await getDocs(
          query(
            collection(db, "claims"),
            where("userId", "==", user.uid)
          )
        );
        claimsSnap.forEach(doc => {
          const d = doc.data();
          act.push({
            icon: "📦",
            content: `You claimed food from ${d.from || "someone"}`,
            time: timeAgo(d.createdAt?.toDate?.() || d.createdAt?.seconds ? new Date(d.createdAt.seconds * 1000) : null),
          });
        });

        // Fetch user's delivery actions (volunteering)
        const volsSnap = await getDocs(
          query(
            collection(db, "deliveries"),
            where("volunteerId", "==", user.uid)
          )
        );
        volsSnap.forEach(doc => {
          const d = doc.data();
          act.push({
            icon: "🚗",
            content: `You completed a delivery${d.to ? ` to ${d.to}` : ""}`,
            time: timeAgo(d.createdAt?.toDate?.() || d.createdAt?.seconds ? new Date(d.createdAt.seconds * 1000) : null),
          });
        });

        // Sort activity by reversed order (most recent first)
        act = act.reverse();
        // Only show up to 7 most recent
        act = act.slice(0, 7);

        if (!ignore) {
          setActivity(act);
        }
      } catch {
        if (!ignore) setActivity([]);
      }
      setLoading(false);
    }

    fetchActivity();
    return () => { ignore = true };
    // eslint-disable-next-line
  }, [user]);

  // Fun facts, motivational quotes, or highlights
  const funFacts = [
    {
      icon: "🌎",
      text: "1/3 of food produced globally is wasted. Your actions help change this!"
    },
    {
      icon: "🎉",
      text: "Every meal you donate brings a smile to someone in need!"
    },
    {
      icon: "💪",
      text: "Together, this community is making a real difference. Keep it up!"
    },
    {
      icon: "🌱",
      text: "Saving food = Saving the planet. Every bit counts!"
    },
    {
      icon: "👥",
      text: "Invite friends to join and multiply your impact!"
    }
  ];
  // Pick a random fact on each render
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(255,247,240,0.84),rgba(255,231,238,0.83)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      <main
        className="dashboard-content"
        style={{
          minHeight: "calc(100vh - 56px)",
          background: "none",
          margin: 0,
          padding: "1.2rem 0 1.5rem 0",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          padding: "0.7rem 0 0.5rem 0",
          textAlign: "center",
          background: "none",
          marginBottom: "0.2rem"
        }}>
          {/* Logo at the top, centered */}
          <img
            src={logoUrl}
            alt="Left Over Love Logo"
            style={{
              height: 100,
              width: "auto",
              marginBottom: 16,
              marginTop: 0,
              border: "2px solid #ff7043",
              background: "#fff",
              borderRadius: 12,
              zIndex: 10,
              position: "relative",
              boxShadow: "0 3px 16px #ff704388"
            }}
          />
          <h1
            id="welcomeMessage"
            style={{
              fontWeight: 800,
              fontSize: "2.1rem",
              color: "#ff7043",
              marginBottom: 2,
              letterSpacing: 1
            }}
          >
            Welcome!
          </h1>
          <div
            style={{
              color: "#ff7043",
              fontWeight: 700,
              fontSize: "1.18rem",
              marginBottom: 8,
              letterSpacing: 0.7
            }}
          >
            You’re a hero in the fight against food waste! 🚀
          </div>
          <div
            style={{
              color: "#222",
              fontSize: "1.09rem",
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            {randomFact.icon} {randomFact.text}
          </div>
          <div className="intro" style={{ color: "#555", fontSize: "1rem" }}>
            Ready for another day of making a difference?
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="quick-actions"
          style={{
            margin: "0 auto 1.6rem auto",
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3 style={{ color: "#ff7043", fontWeight: 700, marginBottom: 16 }}>
            Quick Actions
          </h3>
          <div
            className="actions-grid"
            style={{
              display: "flex",
              gap: "1.7rem",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <Link
              to="/donor"
              className="action-card"
              style={{
                background: "rgba(255, 236, 210, 0.19)",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: "1.1rem 2.1rem",
                display: "flex",
                alignItems: "center",
                minWidth: 210,
                gap: "1.1rem",
                textDecoration: "none",
                transition: "transform 0.12s",
              }}
            >
              <div className="action-icon" style={{ fontSize: "2.2rem" }}>🍱</div>
              <div className="action-text" style={{ color: "#3e2723" }}>
                <h4 style={{ margin: 0, fontWeight: 700 }}>Donate Food</h4>
                <p style={{ color: "#333" }}>
                  Share your excess food with those in need.
                </p>
              </div>
            </Link>
            <Link
              to="/receiver"
              className="action-card"
              style={{
                background: "rgba(252, 182, 159, 0.19)",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: "1.1rem 2.1rem",
                display: "flex",
                alignItems: "center",
                minWidth: 210,
                gap: "1.1rem",
                textDecoration: "none",
                transition: "transform 0.12s",
              }}
            >
              <div className="action-icon" style={{ fontSize: "2.2rem" }}>🔍</div>
              <div className="action-text" style={{ color: "#1976d2" }}>
                <h4 style={{ margin: 0, fontWeight: 700 }}>Find Food</h4>
                <p style={{ color: "#333" }}>
                  Browse available food donations near you.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Activity */}
        <div
          className="activity"
          style={{
            margin: "0 auto 2.5rem auto",
            maxWidth: 720,
            background: "rgba(255,255,255,0.13)",
            borderRadius: 18,
            boxShadow: "0 2px 18px rgba(0,0,0,0.12)",
            padding: "1.7rem 2rem",
          }}
        >
          <h3 style={{ color: "#ff7043", fontWeight: 700, marginBottom: 18 }}>
            Recent Activity
          </h3>
          {loading && (
            <div style={{ color: "#888", marginBottom: 8 }}>
              Loading activity...
            </div>
          )}
          {!loading && activity.length === 0 && (
            <div className="activity-item" style={{ color: "#aaa" }}>
              No recent activity yet. Every action you take will show up here!
            </div>
          )}
          {!loading &&
            activity.map((item, idx) => (
              <div
                className="activity-item"
                key={idx}
                style={{
                  display: "flex",
                  gap: "1.1rem",
                  alignItems: "center",
                  marginBottom: 18,
                  background: "rgba(255,236,210,0.19)",
                  borderRadius: 12,
                  padding: "0.7rem 1.2rem",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.14s",
                }}
              >
                <div
                  className="activity-icon"
                  style={{
                    fontSize: "1.7rem",
                    marginRight: 2
                  }}
                >
                  {item.icon}
                </div>
                <div className="activity-content" style={{ flex: 1 }}>
                  <div style={{ color: "#222", fontWeight: 500 }}>
                    {item.content}
                  </div>
                  <div
                    className="activity-time"
                    style={{
                      color: "#999",
                      fontSize: "0.96rem",
                      marginTop: 2
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Footer with a little motivational touch */}
        <div
          style={{
            textAlign: "center",
            color: "#ff7043",
            marginTop: "2.2rem",
            fontWeight: 700,
            fontSize: "1.13rem",
            letterSpacing: 0.5,
            textShadow: "0 2px 9px #fff7f0"
          }}
        >
          Thank you for making a difference! 💚
        </div>
      </main>
      {/* Responsive styles for mobile */}
      <style>
        {`
        @media (max-width: 800px) {
          .dashboard-content {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          .quick-actions, .activity {
            max-width: 97vw !important;
          }
          .activity {
            padding-left: 0.8rem !important;
            padding-right: 0.8rem !important;
          }
        }
        @media (max-width: 600px) {
          img[alt="Left Over Love Logo"] {
            height: 60px !important;
            margin-bottom: 8px !important;
          }
          h1#welcomeMessage {
            font-size: 1.38rem !important;
          }
          .quick-actions .actions-grid {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: stretch !important;
          }
          .action-card {
            min-width: 0 !important;
            width: 99%;
            font-size: 1rem !important;
            padding: 0.9rem 1rem !important;
          }
          .activity .activity-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.2rem !important;
            padding: 0.8rem 0.7rem !important;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Dashboard;