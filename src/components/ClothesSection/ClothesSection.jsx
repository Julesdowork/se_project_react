import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClicked }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
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
