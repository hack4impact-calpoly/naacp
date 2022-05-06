import React from "react";
import PropTypes from "prop-types";
import "./GardenCard.css";

export default function GardenCard(props: typeof GardenCard.propTypes) {
  const { name, location, description } = props;
  return (
    <div className="md:container md:mx-auto py-10">
      <div
        className="garden-card md:mx-auto py-3 px-3"
        style={{ width: "400px", height: "300px" }}
      >
        <div className="row">
          <div className="col">
            <img width={150} src={require("./garden.jpg")} />
          </div>
          <div className="col">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
          </div>
        </div>
        <div className="row overflow-scroll">
          <div className="col">
            <div className="card-body">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

GardenCard.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  // picture: PropTypes.string
};
