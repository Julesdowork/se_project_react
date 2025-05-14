import { useContext } from "react";

import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ onEditProfileButtonClicked, onLogoutButtonClicked }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_default">
            {currentUser.name && currentUser.name[0].toUpperCase()}
          </div>
        )}
        <h2 className="sidebar__username">{currentUser.name}</h2>
      </div>
      <div className="sidebar__user-controls">
        <button
          type="button"
          className="sidebar__options"
          onClick={onEditProfileButtonClicked}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__options"
          onClick={onLogoutButtonClicked}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
