import { Auth } from "aws-amplify";
import React from "react";
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import { useEffect, useState } from "react";
import GardenCard from "../GardenCard/GardenCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";

const HOST = window.location.hostname;
const PORT = 4000;
const COMMUNITY_GARDENS_URL = `http://${HOST}:${PORT}/communityGardens`;
const USER_GARDENS_URL = `http://${HOST}:${PORT}/userGardens`;

function Home() {
  const [userGardens, setUserGardens] = useState({
    items: [],
    isFetching: false,
  });
  const [recommendedGardens, setRecommendedGardens] = useState({
    items: [],
    isFetching: false,
  });
  const [error, setError] = useState(null);

  // retreives a users gardens from the database by looking up by email
  async function getUserGardens(userEmail: string) {
    // console.log(userId);
    setUserGardens({ items: userGardens.items, isFetching: true });
    const controller = new AbortController();
    Axios.get(USER_GARDENS_URL, {
      params: {
        email: userEmail,
        signal: controller.signal,
      },
    })
      .then((response) => {
        console.log(response.data);
        setUserGardens({ items: response.data, isFetching: false });
      })
      .catch((err) => {
        if (Axios.isCancel(err)) {
          console.log("successfully aborted");
          setUserGardens({ items: userGardens.items, isFetching: false });
        } else {
          setError(err);
          console.log(error);
        }
      });
  }

  // retrieve the current user from Amplify
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then((user: any) => getUserGardens(user.attributes.email))
      .catch((err) => console.log(err));
  }, []);

  // get recommended gardens
  useEffect(() => {
    setRecommendedGardens({
      items: recommendedGardens.items,
      isFetching: true,
    });
    const controller = new AbortController();
    Axios.get(COMMUNITY_GARDENS_URL, {
      params: {
        signal: controller.signal,
      },
    })
      .then((response) => {
        console.log(response.data);
        setRecommendedGardens({ items: response.data, isFetching: false });
      })
      .catch((err) => {
        if (Axios.isCancel(err)) {
          console.log("successfully aborted");
          setRecommendedGardens({
            items: recommendedGardens.items,
            isFetching: false,
          });
        } else {
          setError(err);
          console.log(error);
        }
      });
    return () => {
      controller.abort();
      setRecommendedGardens({ items: [], isFetching: false });
    };
  }, []);

  return (
    <div className="Home">
      <NavBar />
      <div className="flex flex-col bg-white m-auto p-auto">
        <h1 className="header flex mt-10 py-3 lg:px-20 md:px-10 px-5 font-normal lg:mx-40 md:mx-20 mx-5 text-3xl text-black-800">
          Your Gardens
        </h1>
        <div className="flex justify-center grid-cols-3">
          <ArrowBackIosIcon fontSize="large" />
          <div className="flex overflow-x-scroll hide-scroll-bar self-center gray-background rounded w-9/12 space-x-10">
            <div className="flex flex-nowrap lg:ml-3 md:ml-3 ml-3 ">
              {!userGardens.isFetching &&
                userGardens.items &&
                userGardens.items.map((garden) => (
                  <GardenCard
                    key={garden["name"]}
                    name={garden["name"]}
                    location={garden["location"]}
                    description={garden["description"]}
                    // picture={garden['pictures'][0]}
                  />
                ))}
            </div>
          </div>
          <ArrowForwardIosIcon fontSize="large" />
        </div>
      </div>
      <div className="flex flex-col bg-white m-auto p-auto">
        <h1 className="header mt-8 flex py-3 lg:px-20 md:px-10 px-5 font-normal lg:mx-40 md:mx-20 mx-5 text-3xl text-black-800">
          Recommended Gardens
        </h1>
        <div className="flex justify-center grid-cols-3">
          <ArrowBackIosIcon fontSize="large" />
          <div className="flex overflow-x-scroll hide-scroll-bar gray-background rounded w-9/12 self-center space-x-5 mb-10">
            <div className="flex flex-nowrap lg:ml-3 md:ml-3 ml-3 ">
              {!recommendedGardens.isFetching &&
                recommendedGardens.items &&
                recommendedGardens.items.map((garden) => (
                  <GardenCard
                    key={garden["name"]}
                    name={garden["name"]}
                    location={garden["location"]}
                    description={garden["description"]}
                    // picture={garden['pictures'][0]}
                  />
                ))}
            </div>
          </div>
          <ArrowForwardIosIcon fontSize="large" />
        </div>
        <p></p>
      </div>
    </div>
  );
}

export default Home;
