import "./Profile.css";

import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClicked }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection onCardClicked={onCardClicked} />
      </section>
    </div>
  );
}

export default Profile;
