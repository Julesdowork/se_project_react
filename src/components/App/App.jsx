// external libraries
import { useState, useEffect } from "react";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";

// stylesheets
import "./App.css";

// utilities
import { coordinates, APIkey, modals } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  postItem,
  deleteItem,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import * as auth from "../../utils/auth";
import { getToken, setToken, removeToken } from "../../utils/token";

// contexts
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
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

  const handleRegistration = (
    { email, password, name, avatarUrl },
    resetForm
  ) => {
    auth
      .registerUser(name, avatarUrl, email, password)
      .then(() => {
        handleLogin({ email, password }, resetForm);
      })
      .catch(console.error)
      .finally(closeActiveModal);
  };

  const handleLogin = ({ email, password }, resetForm) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorizeUser(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          resetForm();
        }
      })
      .catch(console.error)
      .finally(closeActiveModal);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }, resetForm) => {
    setIsLoading(true);
    postItem({ name, imageUrl, weather }, getToken())
      .then((data) => {
        // pass in most recently updated state of clothingItems
        setClothingItems((prevItems) => [data, ...prevItems]);
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeActiveModal();
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile({ name, avatar }, getToken())
      .then((data) => {
        setCurrentUser({ ...currentUser, name, avatar });
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
        closeActiveModal();
      });
  };

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

  const handleEditProfileButton = () => {
    setActiveModal("edit-profile");
    setIsMobileMenuOpened(false);
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

  const openConfirmationModal = () => {
    closeActiveModal();
    setActiveModal("delete-garment");
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard._id, getToken())
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.error);
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClicked={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLiked={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClicked={handleCardClick}
                      onAddButtonClicked={handleAddGarmentButton}
                      onEditProfileButtonClicked={handleEditProfileButton}
                      onLogoutButtonClicked={handleLogout}
                      onCardLiked={handleCardLike}
                    />
                  </ProtectedRoute>
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
            handleRegistration={handleRegistration}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            isModalOpen={activeModal === "login"}
            onClose={closeActiveModal}
            isLoading={isLoading}
            handleLogin={handleLogin}
            setActiveModal={setActiveModal}
          />
          <EditProfileModal
            isModalOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            isLoading={isLoading}
            onEditUser={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
