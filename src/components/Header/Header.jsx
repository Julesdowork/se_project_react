import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu-icon.png";
import closeIcon from "../../assets/close-icon-black.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  onSignUpButtonClicked,
  onLoginButtonClicked,
  onAddButtonClicked,
  weatherData,
  onMenuButtonClicked,
  isMobileMenuOpened,
  onClose,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__site-container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button
        type="button"
        className="header__menu-btn header__menu-btn_visible"
        onClick={onMenuButtonClicked}
      >
        <img src={menuIcon} alt="Menu icon" className="header__menu-icon" />
      </button>
      <div
        className={`header__user-container ${
          isMobileMenuOpened ? "header__user-container_open" : ""
        }`}
      >
        <ToggleSwitch />
        <button type="button" className="header__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
        {currentUser ? (
          <div className="header__user">
            <button
              type="button"
              className="header__primary-btn"
              onClick={onAddButtonClicked}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-info">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <p className="header__avatar header__avatar_default">
                    {currentUser.name && currentUser.name[0].toUpperCase()}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__no-user">
            <button
              type="button"
              className="header__primary-btn"
              onClick={onSignUpButtonClicked}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__primary-btn"
              onClick={onLoginButtonClicked}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
