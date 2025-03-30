import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu-icon.png";
import closeIcon from "../../assets/close-icon-black.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  onAddButtonClicked,
  weatherData,
  onMenuButtonClicked,
  isMobileMenuOpened,
  onClose,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__site-container">
        <Link to="/se_project_react">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <button
          type="button"
          className="header__menu-btn header__menu-btn_visible"
          onClick={onMenuButtonClicked}
        >
          <img src={menuIcon} alt="Menu icon" className="header__menu-icon" />
        </button>
      </div>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className={`header__user-container ${
          isMobileMenuOpened && "header__user-container_open"
        }`}
      >
        <ToggleSwitch />
        <button type="button" className="header__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={onAddButtonClicked}
        >
          + Add clothes
        </button>
        <Link to="/se_project_react/profile" className="header__link">
          <div className="header__user-info">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
