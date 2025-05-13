import { useContext } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClicked, onCardLiked }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClass = "card__like-btn_liked";

  const handleCardClick = () => {
    onCardClicked(item);
  };

  const handleLike = () => {
    onCardLiked({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__label">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={`card__like-btn ${isLiked ? itemLikeButtonClass : ""}`}
          onClick={handleLike}
        ></button>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
