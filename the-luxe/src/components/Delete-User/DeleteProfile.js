import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import TransparentButton from "../Buttons/TransparentButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { AlertContext } from "../../contexts/Alert";
import "./DeleteProfile.css"
import { ProfileContext } from "../../contexts/ProfileContext";

const DeleteProfile = () => {
     
    const {setAlertMessage, setShowAlert, setAlertStyle, alertMessage, showAlert, alertStyle} = useContext(AlertContext);
    const { setIsSignedIn, isSignedIn } = useContext(ProfileContext);
    
    const location = useLocation();
    const navigate = useNavigate();

    const deleteUser = async () => {    
        const userId = location.pathname.split("/")[2];
        console.log("before setting is Signed in", isSignedIn)
        try {
            const response = await fetch(`http://localhost:3000/profile/${userId}`, {
                method: "DELETE"
            })
            if(response.ok){
                setIsSignedIn(false);
                navigate("/");
                setAlertMessage("You have successfully deleted your profile!");
                setShowAlert(true);
                setAlertStyle("alert-success");
                localStorage.removeItem("profileData");
            } else{
                setAlertMessage("An error occurred. Please try again.");
                setAlertStyle("alert-danger");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
        }
        catch (error){
            console.error(error.message)
            console.error("Error logging in:", error);
            setAlertMessage("An error occurred. Please try again.");
            setAlertStyle("alert-danger");
            setShowAlert(true);
    
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
        
    }
    
    return (
        <>
            {showAlert &&  <Alert className={`alert ${alertStyle}`} role="alert">{alertMessage}</Alert>}
            <Container className="deleteProfile" fluid>
                <h1 className="deleteProfile-title">Delete Profile</h1>
                <p className="deleteProfile-p">Are you sure you want to delete your 
                    <span className="bold"> Profile</span>, 
                    <span className="bold"> Account</span> and 
                    <span className="bold"> Reservations</span>?</p>
                <Row>
                    <TransparentButton 
                        onClick={deleteUser}
                        style={{backgroundColor: "#800020", marginBottom: "1rem"}}
                    >
                        Delete
                    </TransparentButton>
                    <TransparentButton 
                        as={Link} 
                        to={"/"} 
                        style={{backgroundColor: "#455d58"}}
                    >
                        Keep
                    </TransparentButton>
                </Row>
                <h1 className="deleteProfile-title"> It's been a pleasure having you here!</h1>
                <p className="deleteProfile-p">We hope to see you again soon.</p>
            </Container>
        </>
    )
}

export default DeleteProfile;