import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClicked, onAddButtonClicked }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClicked={onCardClicked}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
