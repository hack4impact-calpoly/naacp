// import { Auth } from 'aws-amplify';
import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo.svg";
import { ModifierSyntaxKind } from "typescript";

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
  margin-left: auto;
  margin-right: auto;
  color: #024e6b;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  @media only screen and (min-width: 767px) {
    margin-left: auto;
    margin-right: auto;
    padding: 40px;
  }
`;
const StyledImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: 768px) {
    max-width: 200px;
    height: auto;
  }
`;
const StyledText = styled.div`
  margin-left: 33px;
  font-size: 18px;
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 5px;
  @media only screen and (min-width: 769px) {
    margin-left: 0px;
  }
`;
const StyledField = styled(Form.Control)`
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
const StyledFeedback = styled(Form.Control.Feedback)`
  margin-left: 20px;
  font-size: 10px;
  color: #024e6b;
`;
const StyledButton = styled(Button)`
  margin-top: 50px;
  margin-bottom: 3px;
  padding: 2px 5px;
  width: calc(100vw - 65px);
  background-color: #024e6b;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: 769px) {
    width: calc(40vw - 65px);
    height: 53px;
    border-radius: 5px;
  }
`;
const StyledLinkButton = styled(Button)`
  padding: 10px;
  display: flex;
  margin-left: auto;
  color: #024e6b;
  font-size: 16px;
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
  margin-top: -30px;
  margin-right: 20px;
  @media only screen and (min-width: 769px) {
    margin-left: calc(29vw - 65px);
    margin-top: -20px;
    height: 53px;
    border-radius: 5px;
  }
`;
const StyledLinkButtonAcc = styled(Button)`
  display: flex;
  justify-content: center;
  color: #024e6b;
`;
const StyledHideButton = styled(Button)`
  background-color: transparent;
  color: #024e6b;
  border: none;
  font-size: 16px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;
  z-index: 1;
  &:hover,
  &:focus {
    background-color: transparent;
    color: #024e6b;
  }
`;
const StyledButtonAndEye = styled.div`
  position: absolute;
  top: 30px;
  @media only screen and (max-width: 768px) {
    position: absolute;
    top: 30px;
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

export default () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const toggleShowPassword = () => {
    if (passwordShown) {
      setPasswordShown(false);
    } else {
      setPasswordShown(true);
    }
  };

  return (
    <div>
      {validLogin === false && (
        <div className="alert alert-danger" role="alert">Ï
          Invalid Login, Please Try Again
        </div>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <StyledContainer>
          <Row>
            <Col>
              <StyledImage src={Logo} alt="Logo" />
            </Col>
            <Col>
              <StyledTitle>Volunteer &nbsp;System</StyledTitle>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <StyledText>Email</StyledText>
              <StyledField
                required
                type="username"
                placeholder=""
                defaultValue={username}
              />
              <StyledFeedback>looks good!</StyledFeedback>
              <StyledFeedback type="invalid">
                {" "}
                please input username.{" "}
              </StyledFeedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <StyledText>Password</StyledText>
              <StyledSmallContainer>
                <StyledField
                  required
                  type={passwordShown ? "text" : "password"}
                  defaultValue={password}
                />
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
              </StyledSmallContainer>
              <StyledFeedback>looks good!</StyledFeedback>
              <StyledFeedback type="invalid">
                {" "}
                please input password{" "}
              </StyledFeedback>
            </Form.Group>
          </Row>
          <StyledLinkButton href="/forgotPassword" variant="link">
            Forgot your password?
          </StyledLinkButton>
          <StyledButton type="submit" block>
            Log In
          </StyledButton>
          <StyledLinkButtonAcc href="/newaccount" variant="link">
            First Time? &nbsp;
            <b>Create new account</b>
          </StyledLinkButtonAcc>
        </StyledContainer>
      </Form>
    </div>
  );
};
