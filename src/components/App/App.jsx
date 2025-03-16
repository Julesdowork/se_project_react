import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDaytime: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleAddGarmentButton = () => {
    setActiveModal("add-garment");
    addCloseModalEventListeners();
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    addCloseModalEventListeners();
  };

  const closeActiveModal = () => {
    setActiveModal("");
    document.removeEventListener("keydown", handleEscapePressed);
  };

  const handleEscapePressed = (evt) => {
    if (evt.key === "Escape") {
      closeActiveModal();
    }
  };

  const addCloseModalEventListeners = () => {
    document.addEventListener("keydown", handleEscapePressed);
  };

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    });
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          onAddButtonClicked={handleAddGarmentButton}
          weatherData={weatherData}
          onMenuButtonClicked={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          onClose={toggleMobileMenu}
        />
        <Main weatherData={weatherData} onCardClicked={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio"
              id="hot"
              name="weather"
              value="hot"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio"
              id="warm"
              name="weather"
              value="warm"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio"
              id="cold"
              name="weather"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        name="preview"
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
