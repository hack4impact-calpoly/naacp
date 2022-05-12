import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const PORT = process.env.REACT_APP_SERVER_URL || 4000;
const GARDENS_URL = PORT + `/gardens/:id`;

const StyledImage = styled.img`
  width: 30%;
  height: 40vh;
  border-radius: 5%;
`;

const StyledTitle = styled.h2`
  font-size: 40px;
  font-weight: 500;
  @media only screen and (min-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledCommunityText = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const StyledDate = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const StyledDescription = styled.p`
  font-size: 20px;
  font-weight: 300;
  overflow-wrap: break-word;
  inline-size: 30%;
`;

const StyledPlantsText = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

// const StyledRequestText = styled.p`
//   padding-top: 4%;
//   font-size: 30px;
//   font-weight: 300;
//   color: rgb(10, 88, 202);
// `;

const StyledLinkButton = styled(Button)`
  display: flex;
  color: #2a428a;
  font-size: 16px;
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
`;

interface GardenPageProps {
  gardenId: string;
}

export default function GardenPage({ gardenId }: GardenPageProps) {
  const [garden, setGarden] = useState([] as { [key: string]: any });
  const [gardenDate, setGardenDate] = useState(new Date());
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchGarden = async () => {
      setIsFetching(true);
      const controller = new AbortController();
      const gardenData = await Axios.get(GARDENS_URL, {
        params: {
          id: gardenId,
          signal: controller.signal,
        },
      });
      setGarden(gardenData.data);
      setGardenDate(new Date(gardenData.data.date));
    };

    fetchGarden();
    setIsFetching(false);
  }, []);

  return (
    <div className="GardenPage">
      <NavBar />
      <div className="flex flex-col bg-white ml-8 p-auto">
        <div className="flex align-items-start mt-5">
          <StyledImage src={require("../GardenCard/garden.jpg")} />
          <div className="flex flex-col ml-14">
            <StyledTitle>
              {!isFetching && garden["name"]}
              <StyledLinkButton
                variant="link"
                onClick={() => toast("Request to Join Sent to Owner!")}
              >
                Request to Join
              </StyledLinkButton>
            </StyledTitle>
          </div>
        </div>
        {!isFetching && garden.community && (
          <StyledCommunityText>Community Garden</StyledCommunityText>
        )}
        {!isFetching && !garden.community && (
          <StyledCommunityText>Private Garden</StyledCommunityText>
        )}
        <StyledDate>
          Date Created: {!isFetching && gardenDate.getMonth() + 1}/
          {!isFetching && gardenDate.getDate()}/
          {!isFetching && gardenDate.getFullYear()}
        </StyledDate>
        <StyledDescription>
          Description: {!isFetching && garden.description}
        </StyledDescription>
        <StyledPlantsText>Plants Grown Here: </StyledPlantsText>
        {!isFetching &&
          garden.plants &&
          garden.plants.map((plant: string) => <p>{plant}</p>)}
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}
