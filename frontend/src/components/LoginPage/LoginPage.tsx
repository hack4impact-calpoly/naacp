import { Auth } from "aws-amplify";
import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button } from "react-bootstrap";
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
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: calc(100vw - 65px);
  @media only screen and (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    width: calc(40vw - 65px);
    min-width: 400px;
    max-width: 500px;
  }
`;

const UnstyledButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 3px;
  padding: 2px 5px;
  width: calc(100vw - 65px);
  background-color: #e5e5e5;
  border-radius: 5px;
  text-color: black;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: 769px) {
    width: calc(40vw - 65px);
    height: 53px;
    border-radius: 5px;
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
const StyledLinkButton = styled(Button)`
  padding-top: 20px;
  display: flex;
  color: #2a428a;
  font-size: 16px;
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
  @media only screen and (min-width: 769px) {
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

const StyledToggle = muiStyled(ToggleButton)({
  marginTop: "15px",
  marginBottom: "10px",
  width: "150px",
});

const StyledLine = styled("hr")`
  border: 0px solid black;
  margin-top: 14px;
  width: 160px;
  align: center;
  opacity: 1;
`;

const renderError = (message: string) => (
  <p className="text-danger">{message}</p>
);

function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const [toggle, setToggle] = React.useState("login");

  const handleToggle = (newToggle: string) => {
    if (newToggle) {
      setToggle(newToggle);
      navigate("/signup");
    }
  };

  async function signIn(username: string, password: string) {
    try {
      await Auth.signIn(username, password);
      navigate("/nav");
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  const onSubmit = (values: { username: string; password: string }) => {
    console.log("submit");
    signIn(values.username, values.password);
    console.log(JSON.stringify(values, null, 2));
  };

  const toggleShowPassword = () => {
    if (passwordShown) {
      setPasswordShown(false);
    } else {
      setPasswordShown(true);
    }
  };

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
          <Row>
            <UnstyledButton>
              <StyledText>sign in with Google</StyledText>
            </UnstyledButton>
          </Row>
          <Row>
            <UnstyledButton>
              <StyledText>sign in with Facebook</StyledText>
            </UnstyledButton>
          </Row>
          <Row>
            <Col>
              <StyledLine />
            </Col>
            <Col>
              <StyledText>or</StyledText>
            </Col>
            <Col>
              <StyledLine />
            </Col>
          </Row>
          <Row className="mt-6">
            <Col className="md">
              <div className="control">
                <StyledField
                  name="username"
                  type="text"
                  className="input"
                  placeholder="username@example.com"
                  autoComplete="on"
                />
                <ErrorMessage name="username" render={renderError} />
              </div>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col className="md">
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
            <StyledButton type="submit" block>
              Log In
            </StyledButton>
          </Row>
          <Row>
            <StyledLinkButton href="/forgotPassword" variant="link">
              Forgot your password?
            </StyledLinkButton>
          </Row>
        </StyledContainer>
      </Form>
    </Formik>
  );
}
export default LoginPage;
