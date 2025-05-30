import React from "react";
import "./FoodCard.css";

function FoodCard({ item, onClaim }) {
  return (
    <div className="food-card">
      <h3 className="food-card__title">{item.foodName || item.name}</h3>
      {item.foodDetails && <p className="food-card__details">{item.foodDetails}</p>}
      <div className="food-card__meta">
        {item.type && <span className="food-card__type">{item.type}</span>}
        <span className="food-card__expiry">
          ⏰ {item.expiry ? new Date(item.expiry).toLocaleString() : "No expiry"}
        </span>
        <span className="food-card__location">
          📍 {item.location || "Unknown location"}
        </span>
      </div>
      {onClaim && (
        <button
          className="food-card__claim-btn"
          onClick={() => onClaim(item)}
        >
          Claim
        </button>
      )}
    </div>
  );
}

export default FoodCard;