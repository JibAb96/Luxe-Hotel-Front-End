import React from "react";
import { Button } from "react-bootstrap";
import "./GreenButton.css";

const GreenButton = ({ children, type, disabled, className, ...rest }) => {
  return (
    <Button 
      className={`button ${className || ""}`} 
      {...rest} 
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default GreenButton;
