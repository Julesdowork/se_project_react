import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // TODO: pass as prop
              // onCardClicked={onCardClicked}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
