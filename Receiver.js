import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Example bg image, you can replace with your own if you want
const bgImage = "https://static.langimg.com/thumb/118474617/vijay-karnataka-118474617.jpg?imgsize=39024&width=540&resizemode=3";

function Receiver() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState("");
  const [search, setSearch] = useState({
    location: "",
    type: "",
    quantity: ""
  });

  // Fetch all donations
  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const items = [];
        querySnapshot.forEach((docSnapshot) => {
          const item = { id: docSnapshot.id, ...docSnapshot.data() };
          if (!item.claimed) items.push(item);
        });
        setFoodItems(items);
      } catch (error) {
        setFoodItems([]);
      }
      setLoading(false);
    };
    fetchFood();
  }, [claimingId]);

  // Claim logic
  const claimFood = async (item) => {
    setClaimingId(item.id);
    try {
      await updateDoc(doc(db, "donations", item.id), {
        claimed: true,
        claimedAt: new Date().toISOString(),
      });
      alert(`✅ You claimed: ${item.foodName || item.donorName || item.name}`);
    } catch (err) {
      alert("❌ Failed to claim donation. Try again.");
    }
    setClaimingId("");
  };

  // Search/filter logic
  const filteredItems = foodItems.filter((item) => {
    const matchLocation = search.location === "" || (item.location && item.location.toLowerCase().includes(search.location.toLowerCase()));
    const matchType = search.type === "" || (item.type && item.type.toLowerCase() === search.type.toLowerCase());
    const matchQuantity = search.quantity === "" || (item.quantity && String(item.quantity) === String(search.quantity));
    return matchLocation && matchType && matchQuantity;
  });

  // Transparent style for all content in the upper section
  const transparentTextStyle = {
    background: "rgba(255,255,255,0.1)", // 90% transparent, 10% visible
    borderRadius: 7,
    padding: "0.18em 0.4em",
    color: "#fff",
    textShadow: "0 2px 18px #000",
    boxShadow: "none",
    fontWeight: 400,
    width: "fit-content",
    margin: "0 auto 0.5rem auto",
    display: "block"
  };

  // Transparent style for the food cards
  const foodCardTransparentStyle = {
    background: "rgba(255,255,255,0.1)", // 90% transparent, 10% visible
    padding: "1.2rem 1.3rem",
    borderRadius: "14px",
    minWidth: "260px",
    maxWidth: "330px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
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
          background: "rgba(0,0,0,0.43)",
          zIndex: 1,
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "2.5rem 0 2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Transparent upper (karma) section */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)", // 90% transparent, 10% visible
            borderRadius: 16,
            padding: "1.4rem 2.3rem 1.7rem 2.3rem",
            marginBottom: "2.2rem",
            width: "100%",
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              ...transparentTextStyle,
              fontSize: "2.2rem",
              fontWeight: 700,
              marginBottom: "0.6rem",
              letterSpacing: 1
            }}
          >
            🍛 Food Available!
          </h2>
          <p
            style={{
              ...transparentTextStyle,
              marginBottom: "2rem",
              fontSize: "1.2rem"
            }}
          >
            Search for food near your location, type and quantity.
          </p>
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              background: "rgba(255,255,255,0.1)", // 90% transparent here as well
              borderRadius: 13,
              padding: "1.2rem 1.2rem",
              marginBottom: "0",
              boxShadow: "0 2px 18px rgba(0,0,0,0.06)",
              flexWrap: "wrap",
              width: "100%",
              maxWidth: 580,
            }}
          >
            <input
              type="text"
              placeholder="Location"
              value={search.location}
              onChange={(e) => setSearch({ ...search, location: e.target.value })}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "1rem",
                minWidth: 100,
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                boxShadow: "none"
              }}
              className="search-input"
            />
            <select
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "1rem",
                minWidth: 120,
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                boxShadow: "none"
              }}
              className="search-input"
            >
              <option value="">All Types</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
            <input
              type="number"
              placeholder="Quantity/Servings"
              value={search.quantity}
              min={1}
              onChange={(e) => setSearch({ ...search, quantity: e.target.value })}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "1rem",
                minWidth: 100,
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                boxShadow: "none"
              }}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div style={{ color: "#fff", fontWeight: 500, fontSize: "1.2rem" }}>Loading food items...</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px"
            }}
          >
            {filteredItems.length === 0 ? (
              <div
                style={{
                  color: "#fff",
                  background: "rgba(0,0,0,0.26)",
                  borderRadius: 12,
                  padding: "1.2rem 2rem",
                  fontWeight: 500,
                  letterSpacing: 1,
                  fontSize: "1.1rem"
                }}
              >
                No available food donations matching your search at the moment.
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  style={foodCardTransparentStyle}
                  className="food-card"
                >
                  <span
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 18,
                      fontSize: "1.6rem"
                    }}
                  >
                    {item.type === "veg" ? "🥦" : item.type === "non-veg" ? "🍗" : "🍲"}
                  </span>
                  <h3 style={{ margin: "0 0 0.4rem 0", color: "#ff7043", fontWeight: 700 }}>
                    {item.foodName || item.donorName || item.name}
                  </h3>
                  <div style={{ color: "#fff", marginBottom: 2 }}>
                    <b>Servings:</b> {item.quantity || "N/A"}
                  </div>
                  <div style={{ color: "#fff", marginBottom: 2 }}>
                    <b>Location:</b> {item.location}
                  </div>
                  <div style={{ color: "#fff", marginBottom: 2 }}>
                    <b>Type:</b> {item.type || "N/A"}
                  </div>
                  <div style={{ color: "#fff", marginBottom: 2 }}>
                    <b>Details:</b> {item.foodDetails || "N/A"}
                  </div>
                  <div style={{ color: "#fff", marginBottom: 2 }}>
                    <b>Message:</b> {item.message || "-"}
                  </div>
                  <div style={{ color: "#fff", marginBottom: 8 }}>
                    <b>Expires:</b>{" "}
                    {item.expiry
                      ? new Date(item.expiry).toLocaleString()
                      : "N/A"}
                  </div>
                  <button
                    onClick={() => claimFood(item)}
                    disabled={claimingId === item.id}
                    style={{
                      width: "100%",
                      background: "#ff7043",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1.05rem",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.7rem",
                      cursor: "pointer",
                      marginTop: 6,
                      transition: "background 0.2s",
                    }}
                  >
                    {claimingId === item.id ? "Claiming..." : "Claim"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      {/* Responsive styles and placeholder color */}
      <style>
        {`
        @media (max-width: 700px) {
          main[style] {
            padding-top: 1.2rem !important;
          }
          div[class="food-card"] {
            min-width: 99vw !important;
            max-width: 99vw !important;
          }
        }
        /* White placeholder styles for search inputs */
        .search-input::placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        /* For Firefox */
        .search-input::-moz-placeholder {
          color: #fff !important;
          opacity: 1 !important;
        }
        .search-input::-webkit-input-placeholder {
          color: #fff !important;
        }
        .search-input:-ms-input-placeholder {
          color: #fff !important;
        }
        `}
      </style>
    </div>
  );
}

export default Receiver;