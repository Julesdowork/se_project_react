import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import shuffleIcon from "../../assets/shuffle-icon.svg";
import "./Main.css";

function Main({ weatherData, onCardClicked }) {
  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            //   return item.weather === weatherData.type;
            // })
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
        <button className="content__randomize-btn">
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
