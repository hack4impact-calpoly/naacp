import { relative } from "path";
import React from "react";
import NavBar from "../NavBar/NavBar";
import "./UserProfilePage.css";

export default function UserProfilePage() {
  return (
    <div className="UserProfilePage">
      <NavBar />
      <div className="infoHeader">
        <br />
        <br />
        <br />
        <h2>Personal Info</h2>
      </div>
      <div className="userInfo">
        <div className="col">
          <img src={require("./user.jpg")} />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="col">
          <h4 className="firstName">First Name</h4>
          <h4 className="lastName">Last Name</h4>
          <br />
          <p className="Bio">
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nos...
          </p>
          <br />
          <br />
          <h4 className="userArea">User Area</h4>
        </div>
      </div>
    </div>
  );
}
