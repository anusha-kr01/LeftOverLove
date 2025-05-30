import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from "firebase/firestore";

// *** New background image, real and directly related to donating food ***
const bgImage = "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2016/07/10/Pictures/food-ngo_959a19b6-4609-11e6-8e05-c384b245cd95.jpg";

function Donor() {
  const [form, setForm] = useState({
    donorName: "",
    foodDetails: "",
    expiry: "",
    location: ""
  });
  const [result, setResult] = useState("");
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const locationInputRef = useRef(null);

  // Fetch the most recent 5 donations
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(
          collection(db, "donations"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const snap = await getDocs(q);
        const items = [];
        snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
        setRecentDonations(items);
      } catch (err) {
        setRecentDonations([]);
      }
    };
    fetchRecent();
  }, [result]); // Refetch when a new donation occurs

  // Autofill location field with current GPS coords
  useEffect(() => {
    function updateLocationInput() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);
            const locString = `${lat}, ${lon}`;
            setForm(prev => ({ ...prev, location: locString }));
            if (locationInputRef.current) {
              locationInputRef.current.value = locString;
            }
          },
          error => {
            if (locationInputRef.current) {
              locationInputRef.current.placeholder = "Location not available";
            }
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        if (locationInputRef.current) {
          locationInputRef.current.placeholder = "Geolocation not supported";
        }
      }
    }
    updateLocationInput();
    const interval = setInterval(updateLocationInput, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGetLocationClick = (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          const locString = `${lat}, ${lon}`;
          setForm(prev => ({ ...prev, location: locString }));
          if (locationInputRef.current) {
            locationInputRef.current.value = locString;
          }
        },
        error => {
          if (locationInputRef.current) {
            locationInputRef.current.placeholder = "Location not available";
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.donorName || !form.foodDetails || !form.expiry || !form.location) {
      setResult("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "donations"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setResult("Donation submitted! Thank you for your kindness.");
      setForm({ donorName: "", foodDetails: "", expiry: "", location: "" });
      if (locationInputRef.current) {
        locationInputRef.current.value = "";
      }
    } catch {
      setResult("Submission failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1,
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
            fontSize: "2.2rem",
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: "2.5rem",
            textShadow: "0 4px 24px #000"
          }}
        >
          Become a Donor – Share Your LeftoverLove!
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.05)", // 95% transparent, 5% opaque
            borderRadius: "18px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
            padding: "2rem 2.2rem 1.5rem 2.2rem",
            maxWidth: 420,
            width: "100%",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem"
          }}
        >
          <div>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "#ff7043",
                fontSize: "1rem",
              }}
            >
              Donor Name
            </label>
            <input
              name="donorName"
              value={form.donorName}
              onChange={handleChange}
              placeholder="Your Name"
              required
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "#ff7043",
                fontSize: "1rem",
              }}
            >
              Food Details
            </label>
            <textarea
              name="foodDetails"
              value={form.foodDetails}
              onChange={handleChange}
              placeholder="Describe the food, quantity, etc."
              required
              rows={2}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                resize: "vertical",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "#ff7043",
                fontSize: "1rem",
              }}
            >
              Enter Expiry Date and Time
            </label>
            <input
              type="datetime-local"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="Expiry Date & Time"
              required
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "#ff7043",
                fontSize: "1rem",
              }}
            >
              Location
              <button
                onClick={handleGetLocationClick}
                style={{
                  background: "#ff7043",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  marginLeft: 10,
                  padding: "0.17rem 0.9rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.07)"
                }}
                type="button"
                tabIndex={-1}
                title="Autofill with your current GPS location"
              >
                Use My Location
              </button>
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Pickup Location or GPS coordinates"
              required
              ref={locationInputRef}
              id="location"
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
            <div style={{ color: "#888", fontSize: "0.91rem", marginTop: 2 }}>
              (You can enter an address or use GPS coordinates)
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#ff7043",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.08rem",
              border: "none",
              borderRadius: 9,
              padding: "0.9rem",
              marginTop: "0.3rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Submitting..." : "Donate Food"}
          </button>
          {result && (
            <div
              style={{
                marginTop: 12,
                color: result.startsWith("Donation submitted") ? "#16a34a" : "#b91c1c",
                fontWeight: 500,
                textAlign: "center"
              }}
            >
              {result}
            </div>
          )}
        </form>

        {/* Recent Donations in horizontal cards */}
        <div
          style={{
            maxWidth: 900,
            width: "98vw",
            marginBottom: "2rem",
            overflowX: "auto",
            background: "transparent",
            padding: 0,
            boxShadow: "none",
            borderRadius: 0,
          }}
        >
          <h3 style={{ color: "#ff7043", fontWeight: 700, marginBottom: 18, fontSize: "1.28rem", textAlign: "left" }}>
            Recent Donors
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              minHeight: 120,
            }}
          >
            {recentDonations.length === 0 && (
              <div style={{ color: "#fff", padding: "0.6rem 0" }}>
                No donations yet. Be the first to donate!
              </div>
            )}
            {recentDonations.map((item) => (
              <div
                key={item.id}
                style={{
                  flex: "0 0 220px",
                  minWidth: 200,
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  padding: "0.9rem 1rem 0.7rem 1rem",
                  marginBottom: 6,
                  borderLeft: "4px solid #ff7043",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 600, color: "#222", fontSize: "1.09rem" }}>
                  {item.donorName || "Anonymous Donor"}
                </div>
                <div style={{ color: "#555", margin: "0.16rem 0 0.22rem 0", minHeight: 34 }}>
                  {item.foodDetails}
                </div>
                <div style={{ color: "#888", fontSize: "0.97rem", marginBottom: 3 }}>
                  Expires:{" "}
                  {item.expiry
                    ? new Date(item.expiry).toLocaleString()
                    : "N/A"}
                </div>
                <div style={{ color: "#888", fontSize: "0.97rem" }}>
                  Location: {item.location}
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
            padding-top: 1.5rem !important;
          }
          form[style] {
            max-width: 97vw !important;
            padding-left: 0.7rem !important;
            padding-right: 0.7rem !important;
          }
          div[style*="Recent Donors"] {
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

export default Donor;