import "./Sidebar.css";

import avatar from "../../assets/avatar.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Profile picture" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
