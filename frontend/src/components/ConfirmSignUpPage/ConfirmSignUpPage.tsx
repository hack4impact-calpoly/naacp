import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Textfield from "@mui/material/TextField";
import Logo from "../../imgs/logo.png";

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

const StyledField = styled(Textfield)`
  margin-left: 33px;
  margin-top: -7px;
  margin-bottom: 3px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
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

const StyledText = styled.p`
  margin-top: 2%;
`;

const StyledErrorMessage = styled.p`
  color: rgb(220, 53, 69);
  margin-top: 0.5%;
`;

const StyledSpace = styled.div`
  margin-top: 2.15%;
`;

interface SignUpState {
  email: string;
  password: string;
}

export default () => {
  const [code, setCode] = useState("");
  const signUpState = useLocation().state as SignUpState;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(signUpState.email, code);
      await Auth.signIn(signUpState.email, signUpState.password);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid Code");
      console.log("error confirming sign up:", error);
    }
  };

  return (
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
      <StyledText>
        Please input the verification code sent to {signUpState.email}
      </StyledText>
      <Row className="mt-6">
        <Col className="md">
          <div className="control">
            <StyledField
              id="filled-basic"
              required
              label="Code"
              onChange={(text) => {
                setCode(text.target.value);
              }}
            />
          </div>
        </Col>
      </Row>
      {!errorMessage && <StyledSpace />}
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      <StyledButton type="submit" onClick={() => confirmSignUp()}>
        Finish Sign Up
      </StyledButton>
    </StyledContainer>
  );
};
