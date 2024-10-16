import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Card, Row, Alert } from "react-bootstrap";
import TransparentButton from "../Buttons/TransparentButton";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/Alert";
import FormInput from "../Form/Input";
import { ProfileContext } from "../../contexts/ProfileContext";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showAlertWithTimeout, alertMessage, showAlert, alertStyle } =
    useContext(AlertContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { setProfileData, setIsSignedIn } = useContext(ProfileContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiURL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiURL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfileData(data);
        setIsSignedIn(true);
        showAlertWithTimeout(
          "You have successfully logged in!",
          "alert-success",
        );
        navigate("/");
      } else {
        showAlertWithTimeout("Invalid email or password", "alert-danger");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showAlertWithTimeout(
        "An error occurred. Please try again later.",
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
      <Card className="signin">
        <Form
          className="shadow p-4 rounded signin-form"
          onSubmit={handleSubmit}
        >
          <h1 className="h4 mb-2 text-center">Sign In</h1>
          <p>
            If you have not created an account yet, then please{" "}
            <Button
              className="text-muted px-0"
              variant="link"
              as={Link}
              to="/register"
            >
              {" "}
              Register{" "}
            </Button>{" "}
            first.
          </p>
          <FormInput
            label={"Email"}
            type={"text"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Row className="d-flex justify-content-center">
            <TransparentButton
              type="submit"
              style={{
                margin: "1rem",
                backgroundColor: "#455d58",
              }}
            >
              Log In
            </TransparentButton>
          </Row>
          <Row className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              as={Link}
              to={"/forgot-password"}
            >
              Forgot password?
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
