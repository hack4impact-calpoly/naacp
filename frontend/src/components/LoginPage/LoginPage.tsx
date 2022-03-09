import { Auth } from "aws-amplify";
import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "../../imgs/logo.png";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import passwordValidator from "password-validator";

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
  color: #2a428a;
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

/*const StyledToggleGroup = muiStyled(ToggleButtonGroup)({
   backgroundColor: '#2a428a',
   color: 'white',
   width: '300px',
 }); */

const StyledLine = styled("hr")`
  border: 0px solid black;
  margin-top: 16px;
  width: 220px;
  align: center;
  opacity: 1;
`;

export default () => {
  // const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();
  const schema = new passwordValidator();
  // this toggle logic will probably need to be pushed up to the parent component when the sign
  // up page is created
  const [toggle, setToggle] = React.useState("login");

  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  const handleToggle = (newToggle: string) => {
    if (newToggle) {
      setToggle(newToggle);
      navigate("/");
    }
  };

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      setValidLogin(true);
      navigate("/nav");
    } catch (error) {
      setValidLogin(false);
      //   event.preventDefault();
      //   event.stopPropagation();
      console.log("error signing in", error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    signIn();
    console.log("after");
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //  setValidated(true);
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
        <div className="alert alert-danger" role="alert">
          Invalid Login, Please Try Again
        </div>
      )}
      <Form onSubmit={handleSubmit}>
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
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <StyledText className="header">username</StyledText>
              <StyledField
                required
                type="username"
                placeholder=""
                defaultValue={username}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
              />
              <StyledFeedback type="invalid">
                {" "}
                please input username.{" "}
              </StyledFeedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <StyledText className="header">password</StyledText>
              <StyledSmallContainer>
                <StyledField
                  required
                  type={passwordShown ? "text" : "password"}
                  defaultValue={password}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setPassword(e.currentTarget.value)
                  }
                />
              </StyledSmallContainer>
              <StyledFeedback type="invalid">
                {" "}
                please input password{" "}
              </StyledFeedback>
            </Form.Group>
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
    </div>
  );
};
