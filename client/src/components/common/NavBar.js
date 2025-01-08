import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

import "./css/Navbar.css";

export default function NavBar() {
  const { user, logout } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
    window.location = "/";
  };

  useEffect(() => {
    console.log("user update from mavbar component:", user);
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setDropdownVisible(false);
    }
  };
  const handleImageError = (e) => {
    e.target.src = "/profile_pictures/default-profile-pic.jpg"; // Set the fallback image path
  };

  return (
    <>
      <div className="navbar-wrapper">
        <div className="content-left">
          {user ? <div></div> : <React.Fragment />}
        </div>
        <div className="content-center">
          <Link to="/dashboard" className="brand-label">
            Soundwave.FM
          </Link>
        </div>
        <div className="content-right">
          <div className="buttons-array">
            <div className="spotify-dropdown-button-container">
              Spotify
              <div className="dropdown-menu">
                <Link to="/music-player">Player</Link>
                <Link to="/song-countdown">Countdown</Link>
                <Link to="/statistics">Stats</Link>
                <Link to="/song-guesser">Song Guesser</Link>
              </div>
            </div>
            {!user && (
              <div className="login-button-container">
                <Link to="/login" className="login-button">
                  Login
                </Link>
              </div>
            )}
            {!user && (
              <div className="signup-button-container">
                <Link to="/signup" className="signup-button">
                  SIGN UP
                </Link>
              </div>
            )}
            {user && <div>{user.username}</div>}
            {user && (
              <div
                className="user-profile-container"
                onClick={toggleDropdown}
                tabIndex={0} // To make the container focusable
                onBlur={closeDropdown}
                ref={dropdownRef}
              >
                <img
                  className="user-profile-picture"
                  src={`/profile_pictures/${user.username}.jpg`}
                  alt="User Profile"
                  onError={handleImageError}
                />
                {dropdownVisible && (
                  <div className="profile-dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/settings">Settings</Link>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
