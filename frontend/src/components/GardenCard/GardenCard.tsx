import React from "react";
//import { Row, Col, Card } from "react-bootstrap";
import "./GardenCard.css";

export default function GardenCard() {
  return (
    <body>
      <div className="md:container md:mx-auto py-20">
        <div className="card md:mx-auto py-5 px-5" style={{ width: "500px" }}>
          <div className="row">
            <div className="col">
              <img width={150} src={require("./garden.jpg")} />
            </div>
            <div className="col">
              <h5 className="card-title">City Garden</h5>
              <h6 className="card-subtitle mb-2 text-muted">1 Grand Avenue</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                San Luis Obispo,
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                California 93405
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nos...
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
