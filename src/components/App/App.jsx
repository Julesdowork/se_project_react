import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { coordinates, APIkey, modals } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, postItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    postItem({ name, imageUrl, weather })
      .then((data) => {
        console.log(data);
        // pass in most recently updated state of clothingItems
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.err);
  };

  const openConfirmationModal = () => {
    closeActiveModal();
    setActiveModal("delete-garment");
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard._id); // TODO: add then-catch block
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== selectedCard._id)
    );
    setSelectedCard({});
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.err);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTempUnit: currentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
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
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClicked={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClicked={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isModalOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={handleAddItemModalSubmit}
        />
        <ItemModal
          name="preview"
          onClose={closeActiveModal}
          isModalOpen={activeModal === "preview"}
          hasForm={false}
          modalType={modals.image}
          card={selectedCard}
          onDeleteItem={openConfirmationModal}
        />
        <DeleteConfirmationModal
          name="delete-garment"
          onClose={closeActiveModal}
          isModalOpen={activeModal === "delete-garment"}
          hasForm={false}
          modalType={modals.confirmation}
          onConfirm={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
