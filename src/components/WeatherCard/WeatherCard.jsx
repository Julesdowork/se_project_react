import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      weatherData.isDaytime === option.isDay &&
      weatherData.condition === option.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = weatherData.isDaytime
      ? defaultWeatherOptions["day"]
      : defaultWeatherOptions["night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}&deg;
        {currentTempUnit}
      </p>
      <img
        src={weatherOption?.link}
        alt={`Card showing ${weatherOption?.isDay ? "day" : "night"} ${
          weatherOption?.condition
        } weather`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
