import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "emailjs-com";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const buttonHover = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom, #ff7e5f, #feb47b);
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin-top: 3rem;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.8s ease-out;
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff7e5f;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #feb47b;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${buttonHover} 1.5s infinite ease-in-out;

  &:hover {
    background: linear-gradient(to right, #feb47b, #ff7e5f);
  }
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: #4caf50;
  font-weight: bold;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #ff3b3b;
  font-weight: bold;
  margin-top: 1rem;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ufwmgug", 
        "template_qkpnqwv",
        formData,
        "32vr14UFsFJybpiGA"
      )
      .then(
        (response) => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("error");
        }
      );
  };

  return (
    <PageWrapper>
      <FormContainer>
        <FormTitle>Contact Us</FormTitle>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">Send Feedback</SubmitButton>
        </form>
        {status === "success" && (
          <SuccessMessage>Your feedback has been sent!</SuccessMessage>
        )}
        {status === "error" && (
          <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
        )}
      </FormContainer>
    </PageWrapper>
  );
};

export default ContactUs;
