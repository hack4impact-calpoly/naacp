import React from "react";
import PropTypes from "prop-types";
import "./GardenCard.css";
import { useNavigate } from "react-router-dom";

export default function GardenCard(props: typeof GardenCard.propTypes) {
  const { name, location, description } = props;
  const navigate = useNavigate();

  const navigateToGarden = () => {
    navigate("/garden", {
      state: { id: "61e6652b3cff809e851e536c" },
    });
  };

  return (
    <div
      className="md:container md:mx-auto py-10"
      onClick={() => navigateToGarden()}
    >
      <div
        className="garden-card md:mx-auto py-3 px-3"
        style={{ width: "400px", height: "300px" }}
      >
        <div className="row">
          <div className="col">
            <img width={150} src={require("./garden.jpg")} />
          </div>
          <div className="col">
            <h5 className="mb-1 text-muted">{name}</h5>
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
