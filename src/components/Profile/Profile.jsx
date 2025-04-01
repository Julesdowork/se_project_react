import "./Profile.css";

import Sidebar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClicked, onAddButtonClicked }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClicked={onCardClicked}
          onAddButtonClicked={onAddButtonClicked}
        />
      </section>
    </div>
  );
}

export default Profile;
