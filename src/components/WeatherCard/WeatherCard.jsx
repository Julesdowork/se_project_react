import "./WeatherCard.css";
import dayCloudy from "../../assets/day_cloudy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;F</p>
      <img
        src={dayCloudy}
        alt="Cloudy Day image"
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
