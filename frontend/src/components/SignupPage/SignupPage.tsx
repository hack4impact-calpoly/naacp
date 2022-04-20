import { Auth } from "aws-amplify";
import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import {Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "../../imgs/logo.png";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const StyledTitle = styled.h2`
  display: block;
  font-size: 86px;
  padding-top: 6px;
  font-weight: 800;
  @media only screen and (min-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledSubTitle = styled.h2`
  display: block;
  font-size: 56px;
  font-weight: 400;
  @media only screen and (min-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledImage = styled.img`
  display: block;
  padding-top: 4px;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: 768px) {
    max-width: 180px;
    height: auto;
  }
`;
const StyledText = styled.div`
  margin-left: 33px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 5px;
  @media only screen and (min-width: 769px) {
    margin-left: 0px;
  }
`;
const StyledField = styled(Field)`
  margin-left: 33px;
  margin-top: -7px;
  margin-bottom: 3px;
  font-size: 18px;
  padding: 2px 5px;
  width: calc(100vw - 65px);
  @media only screen and (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    width: calc(40vw - 65px);
    min-width: 400px;
    max-width: 500px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 3px;
  padding: 2px 5px;
  width: calc(100vw - 65px);
  background-color: #2a428a;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: 769px) {
    width: calc(40vw - 65px);
    height: 53px;
    border-radius: 5px;
  }
`;

const StyledHideButton = styled(Button)`
  background-color: transparent;
  color: #2a428a;
  border: none;
  font-size: 16px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;
  z-index: 1;
  &:hover,
  &:focus {
    background-color: transparent;
    color: #2a428a;
  }
`;

const StyledButtonAndEye = styled.div`
  right: 40px;
  @media only screen and (max-width: 768px) {
    right: 40px;
  }
`;

const StyledSmallContainer = styled.div`
  @media only screen and (min-width: 768px) {
    width: calc(40vw - 65px);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: calc(40vw - 65px);
    min-width: 400px;
    max-width: 500px;
  }
`;

const StyledToggle = muiStyled(ToggleButton)({
  marginTop: "15px",
  marginBottom: "10px",
  width: "150px",
});

export default () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [toggle, setToggle] = React.useState("signup");
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Username must be an email")
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleToggle = (newToggle: string) => {
    if (newToggle) {
      setToggle(newToggle);
      navigate("/login");
    }
  };

  async function signUp(username: string, password: string) {
    try {
      await Auth.signUp({ username, password });
      navigate("/login");
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  const onSubmit = (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("submit");
    signUp(values.username, values.password);
    alert("Check your email for account verification prior to login");
    console.log(JSON.stringify(values, null, 2));
  };

  const toggleShowPassword = () => {
    if (passwordShown) {
      setPasswordShown(false);
    } else {
      setPasswordShown(true);
    }
  };

  const renderError = (message: string) => (
    <p className="text-danger">{message}</p>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <StyledContainer>
          <div className="grid-rows-1">
            <div className="justify-start sm:justify-start grid grid-cols-2 gap-1 pt-4">
              <div className="flex-shrink-0 items-center">
                <StyledImage src={Logo} />
              </div>
              <div className="justify-center align-middle rid grid-rows-2 gap-2">
                <div className="justify-center">
                  <StyledTitle className="header text-blue font-bold">
                    NAACP
                  </StyledTitle>
                </div>
                <StyledSubTitle className="subheader justify-center">
                  Slo Gardens
                </StyledSubTitle>
              </div>
            </div>
          </div>
          <Row>
            <ToggleButtonGroup
              value={toggle}
              exclusive
              onChange={(
                event: React.MouseEvent<HTMLElement, MouseEvent>,
                value: string
              ) => {
                handleToggle(value);
              }}
            >
              <StyledToggle value="login" aria-label="login">
                <StyledText className="subheader">log in</StyledText>
              </StyledToggle>
              <StyledToggle value="signup" aria-label="signup">
                <StyledText className="subheader">sign up</StyledText>
              </StyledToggle>
            </ToggleButtonGroup>
          </Row>
          <Row className="md">
            <Col >
              <div className="control">
                <StyledField
                  name="username"
                  type="text"
                  className="input"
                  placeholder="username@example.com"
                  autoComplete="on"
                />
                <Row>
                <ErrorMessage name="username" render={renderError} />
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col md>
              <StyledSmallContainer>
                <div className="control">
                  <StyledField
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    className="input"
                    placeholder="password"
                    autoComplete="on"
                  />
                  <ErrorMessage name="password" render={renderError} />
                </div>
              </StyledSmallContainer>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col md>
              <StyledSmallContainer>
                <div className="control">
                  <StyledField
                    name="confirmPassword"
                    type={passwordShown ? "text" : "password"}
                    className="input"
                    placeholder="confirm password"
                    autoComplete="on"
                  />
                  <ErrorMessage name="confirmPassword" render={renderError} />
                </div>
              </StyledSmallContainer>
            </Col>
          </Row>
          <Row>
            <StyledButtonAndEye>
              <StyledHideButton onClick={toggleShowPassword}>
                {passwordShown ? "Hide " : "Show "}
                {passwordShown ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </StyledHideButton>
            </StyledButtonAndEye>
          </Row>
          <Row>
            <StyledButton type="submit">create account</StyledButton>
          </Row>
        </StyledContainer>
      </Form>
    </Formik>
  );
};
