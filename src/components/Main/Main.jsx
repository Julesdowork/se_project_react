import { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import shuffleIcon from "../../assets/shuffle-icon.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClicked, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClicked={onCardClicked}
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
