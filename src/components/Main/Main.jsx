import { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import shuffleIcon from "../../assets/shuffle-icon.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ weatherData, onCardClicked, clothingItems, onCardLiked }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit} /
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.owner === currentUser._id)
            .filter((item) => item.weather === weatherData.type)
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
        <button className="content__randomize-btn content__randomize-btn_disabled">
          <img
            src={shuffleIcon}
            alt="Shuffle icon"
            className="content__shuffle-img"
          />
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
