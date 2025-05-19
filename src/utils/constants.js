export const modals = {
  image: "modal__content_type_image",
  confirmation: "modal__content_type_confirmation",
};

export const weatherOptions = [
  {
    isDay: true,
    condition: "clear",
    link: new URL("../assets/day-images/day_clear.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "clouds",
    link: new URL("../assets/day-images/day_cloudy.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "rain",
    link: new URL("../assets/day-images/day_rain.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "thunderstorm",
    link: new URL("../assets/day-images/day_storm.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "snow",
    link: new URL("../assets/day-images/day_snow.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "atmosphere",
    link: new URL("../assets/day-images/day_fog.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "clear",
    link: new URL("../assets/night-images/night_clear.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    condition: "clouds",
    link: new URL("../assets/night-images/night_cloudy.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    condition: "rain",
    link: new URL("../assets/night-images/night_rain.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    condition: "thunderstorm",
    link: new URL("../assets/night-images/night_storm.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    condition: "snow",
    link: new URL("../assets/night-images/night_snow.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    condition: "atmosphere",
    link: new URL("../assets/night-images/night_fog.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    link: new URL("../assets/day-images/day_default.png", import.meta.url).href,
  },
  night: {
    link: new URL("../assets/night-images/night_default.png", import.meta.url)
      .href,
  },
};

export const coordinates = {
  latitude: 26.98188,
  longitude: -82.101082,
};

export const APIkey = "f8c7eb94647d81bd5dfb8904629964d3";
