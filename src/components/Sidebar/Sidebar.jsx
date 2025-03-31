import "./SideBar.css";

import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img src={avatar} alt="Profile picture" className="sidebar__avatar" />
      </div>
      <div className="sidebar__user-container">
        <h2 className="sidebar__username">Terrence Tegegne</h2>
        <div className="sidebar__user-controls">
          <p className="sidebar__options">Change profile data</p>
          <p className="sidebar__options">Log out</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
