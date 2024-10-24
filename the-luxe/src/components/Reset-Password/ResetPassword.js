import React, { useState, useContext } from "react";
import "./ResetPassword.css";
import { Card, Form, Alert, Row } from "react-bootstrap";
import FormInput from "../Form/Input";
import GreenButton from "../Buttons/GreenButton";
import { AlertContext } from "../../contexts/Alert";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showAlertWithTimeout, showAlert, alertMessage, alertStyle } =
    useContext(AlertContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlertWithTimeout("Passwords do not match");
      return;
    }

    const apiURL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiURL}/reset-password/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        showAlertWithTimeout("An error has occurred", "alert-danger");
        return;
      }
      navigate("/");
      showAlertWithTimeout(
        "Password has been changed successfully",
        "alert-success",
      );
    } catch (error) {
      showAlertWithTimeout(
        "Server error. Please try again later",
        "alert-danger",
      );
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert className={`alert ${alertStyle}`} role="alert">
          {alertMessage}
        </Alert>
      )}
      <Card className="r-password">
        <Form
          className="shadow p-4 rounded signin-form r-password-form"
          onSubmit={handleSubmit}
        >
          <h1 className="h4 mb-2 text-center">Change Password</h1>
          <FormInput
            label={"Password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInput
            label={"Confirm Password"}
            type={"password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Row className="d-flex justify-content-center">
            <GreenButton
              type="submit"
              className={"m-1"}
            >
              Change Password
            </GreenButton>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
