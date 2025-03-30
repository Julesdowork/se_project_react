import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1; // TODO: delete once mock server is set up
    // pass in most recently updated state of clothingItems
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather, _id: newId },
      ...prevItems,
    ]);
    closeActiveModal();
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
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onAddButtonClicked={handleAddGarmentButton}
            weatherData={weatherData}
            onMenuButtonClicked={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            onClose={toggleMobileMenu}
          />
          <Routes>
            <Route
              path="/se_project_react"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClicked={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/se_project_react/profile" element={<Profile onCardClicked={handleCardClick} />} />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isModalOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          name="preview"
          isModalOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          hasForm={false}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
