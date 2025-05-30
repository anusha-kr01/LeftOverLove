import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "../styles/Navbar.css";

function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <header className="navbar">
      <div className="navbar__left">
        <span className="navbar__logo">🥡 FoodSaver</span>
      </div>
      <div className="navbar__right">
        {user ? (
          <div className="navbar__user">
            <span>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="navbar__avatar"
                />
              ) : (
                <span className="navbar__avatar--initial">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </span>
              )}
              {user.displayName || user.email}
            </span>
          </div>
        ) : (
          <span className="navbar__guest">Guest</span>
        )}
      </div>
    </header>
  );
}

export default Navbar;