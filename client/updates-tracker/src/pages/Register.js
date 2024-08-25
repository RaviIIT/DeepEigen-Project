import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("Welcome to Bitcoin Tracker");
  const typingSpeed = 100; // Speed in milliseconds
  const deletingSpeed = 50; // Speed in milliseconds
  const texts = [
    "Welcome to Bitcoin Tracker         ",
    "Created by Ravi        "
  ];

  // Function to handle typing animation
  const typeText = () => {
    if (currentTextIndex < currentText.length) {
      setDisplayedText((prev) => prev + currentText[currentTextIndex]);
      setCurrentTextIndex((prev) => prev + 1);
    } else {
      setIsDeleting(true);
    }
  };

  // Function to handle deleting animation
  const deleteText = () => {
    if (currentTextIndex > 0) {
      setDisplayedText((prev) => prev.slice(0, -1));
      setCurrentTextIndex((prev) => prev - 1);
    } else {
      // Switch to the next text
      setIsDeleting(false);
      setCurrentTextIndex(0);
      setCurrentText((prev) => (prev === texts[0] ? texts[1] : texts[0]));
    }
  };

  // Effect for typing and deleting animation
  useEffect(() => {
    const timer = setInterval(() => {
      if (isDeleting) {
        deleteText();
      } else {
        typeText();
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(timer);
  }, [isDeleting, currentTextIndex, currentText]);

  // Form submission handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/users/register`,
        values
      );
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Prevent logged-in users from accessing the register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
        <div className="typing-container" style={{marginBottom:"20px"}}>
          <h1>{displayedText}</h1>
        </div>
      <div className="register-page">
        {loading && <Spinner />}
        <Form className="register-form" layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <button className="btn">Register</button>
          </div>
          <Link className="linkreg" to="/login">
            Already Registered? Login here!
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
