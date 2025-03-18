import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";

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
  const [defaultClothes, setDefaultClothes] = useState(defaultClothingItems);

  const handleAddGarmentButton = () => {
    setActiveModal("add-garment");
    // automatically close the mobile menu when add garment modal is active
    setIsMobileMenuOpened(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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
        isModalOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
        hasForm={true}
      >
        <label htmlFor="garment-name-input" className="modal__label">
          Name
          <span className="modal__error"></span>
          <input
            type="text"
            className="modal__input"
            id="garment-name-input"
            placeholder="Name"
            required
            minLength={2}
            maxLength={40}
          />
        </label>
        <label htmlFor="garment-imageUrl-input" className="modal__label">
          Image
          <span className="modal__error"></span>
          <input
            type="url"
            className="modal__input"
            id="garment-imageUrl-input"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-group">
            <input
              type="radio"
              className="modal__radio"
              id="radio-hot"
              name="weather"
              value="hot"
            />
            <label
              htmlFor="radio-hot"
              className="modal__label modal__label_type_radio"
            >
              Hot
            </label>
          </div>
          <div className="modal__radio-group">
            <input
              type="radio"
              className="modal__radio"
              id="radio-warm"
              name="weather"
              value="warm"
              defaultChecked
            />
            <label
              htmlFor="radio-warm"
              className="modal__label modal__label_type_radio"
            >
              Warm
            </label>
          </div>
          <div className="modal__radio-group">
            <input
              type="radio"
              className="modal__radio"
              id="radio-cold"
              name="weather"
              value="cold"
            />
            <label
              htmlFor="radio-cold"
              className="modal__label modal__label_type_radio"
            >
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        name="preview"
        isModalOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={closeActiveModal}
        hasForm={false}
      />
    </div>
  );
}

export default App;
