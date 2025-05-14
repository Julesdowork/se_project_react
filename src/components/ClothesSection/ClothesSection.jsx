import { useContext } from "react";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClicked,
  onAddButtonClicked,
  onCardLiked,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__controls">
        <p className="clothes-section__subheading">Your items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddButtonClicked}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClicked={onCardClicked}
                onCardLiked={onCardLiked}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
