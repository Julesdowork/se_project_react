import "./WeatherCard.css";
import dayCloudy from "../../assets/day_cloudy.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        src={dayCloudy}
        alt="Cloudy Day image"
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
