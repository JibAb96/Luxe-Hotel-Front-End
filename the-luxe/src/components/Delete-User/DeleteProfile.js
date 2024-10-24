import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import GreenButton from "../Buttons/GreenButton";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertContext } from "../../contexts/Alert";
import "./DeleteProfile.css";
import { ProfileContext } from "../../contexts/ProfileContext";

const DeleteProfile = ({ handleExit }) => {
  const { showAlertWithTimeout } = useContext(AlertContext);
  const { setIsSignedIn } = useContext(ProfileContext);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const deleteUser = async () => {
    const apiURL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiURL}/delete-profile/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data === "Profile and login deleted successfully") {
        setIsSignedIn(false);
        navigate("/");
        showAlertWithTimeout(
          "You have successfully deleted your profile!",
          "alert-success",
        );
        localStorage.removeItem("profileData");
      } else {
        showAlertWithTimeout(
          "An error occurred. Please try again.",
          "alert-danger",
        );
      }
    } catch (error) {
      console.error(error.message);
      console.error("Error logging in:", error);
      showAlertWithTimeout(
        "An error occurred. Please try again.",
        "alert-danger",
      );
    }
  };

  return (
    <>
      <Container className="deleteProfile" fluid>
        <button
          type="button"
          className="exit-button"
          onClick={handleExit}
          aria-label="Close"
        >
          &times;
        </button>
        <h1 className="deleteProfile-title">Delete Profile</h1>
        <p className="deleteProfile-p">
          Are you sure you want to delete your
          <span className="bold"> Profile</span>,
          <span className="bold"> Account</span> and
          <span className="bold"> Reservations</span>?
        </p>
        <Row>
          <GreenButton
            onClick={deleteUser}
            className={"deleteProfile-button"}
          >
            Delete
          </GreenButton>
          <GreenButton
            onClick={handleExit}
          >
            Keep
          </GreenButton>
        </Row>
        <h1 className="deleteProfile-title">
          {" "}
          It's been a pleasure having you here!
        </h1>
        <p className="deleteProfile-p">We hope to see you again soon.</p>
      </Container>
    </>
  );
};

export default DeleteProfile;
