import "./ItemCard.css";

function ItemCard({ item, onCardClicked }) {
  const handleCardClick = () => {
    onCardClicked(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__img" />
    </li>
  );
}

export default ItemCard;
