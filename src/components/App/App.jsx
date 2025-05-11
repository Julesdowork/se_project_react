import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey, modals } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, postItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpButton = () => {
    setActiveModal("register");
  };

  const handleLogInButton = () => {
    setActiveModal("login");
  };

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
    setIsLoading(true);
    postItem({ name, imageUrl, weather })
      .then((data) => {
        // pass in most recently updated state of clothingItems
        setClothingItems((prevItems) => [data, ...prevItems]);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
        closeActiveModal();
      });
  };

  const openConfirmationModal = () => {
    closeActiveModal();
    setActiveModal("delete-garment");
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
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
            onSignUpButtonClicked={handleSignUpButton}
            onLoginButtonClicked={handleLogInButton}
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
                isLoggedIn ? (
                  <Profile
                    clothingItems={clothingItems}
                    onCardClicked={handleCardClick}
                    onAddButtonClicked={handleAddGarmentButton}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isModalOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={handleAddItemModalSubmit}
          isLoading={isLoading}
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
        <RegisterModal
          isModalOpen={activeModal === "register"}
          onClose={closeActiveModal}
          isLoading={isLoading}
        />
        <LoginModal
          isModalOpen={activeModal === "login"}
          onClose={closeActiveModal}
          isLoading={isLoading}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
