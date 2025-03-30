export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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
