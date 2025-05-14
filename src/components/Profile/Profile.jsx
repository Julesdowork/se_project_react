import "./Profile.css";

import Sidebar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClicked,
  onAddButtonClicked,
  onEditProfileButtonClicked,
  onLogoutButtonClicked,
  onCardLiked,
}) {
  return (
    <div className="profile content">
      <section className="profile__sidebar">
        <Sidebar
          onEditProfileButtonClicked={onEditProfileButtonClicked}
          onLogoutButtonClicked={onLogoutButtonClicked}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClicked={onCardClicked}
          onAddButtonClicked={onAddButtonClicked}
          onCardLiked={onCardLiked}
        />
      </section>
    </div>
  );
}

export default Profile;
