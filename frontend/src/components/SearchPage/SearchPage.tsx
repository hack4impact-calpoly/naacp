import * as React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import GardenCard from "../GardenCard/GardenCard";
import NavBar from "../NavBar/NavBar";
import TextField from "@mui/material/TextField";
import "./SearchPage.css";

const PORT = process.env.REACT_APP_SERVER_URL || 4000;
const GARDENS_URL = PORT + `/gardens`;

export interface ListProps {
  items: any[];
}

export interface ListState {
  filtered: any[];
}

export default function SearchPage() {
  // initialize empty filtered list for search
  const [gardens, setGardens] = useState({
    isFetching: false,
    items: [] as { [key: string]: any },
  });
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  async function getGardens() {
    // console.log(userId);
    setGardens({ items: gardens.items, isFetching: true });
    const controller = new AbortController();
    Axios.get(GARDENS_URL, {
      params: {
        signal: controller.signal,
      },
    })
      .then((response) => {
        setGardens({ items: response.data, isFetching: false });
      })
      .catch((err) => {
        if (Axios.isCancel(err)) {
          console.log("successfully aborted");
          setGardens({ items: gardens.items, isFetching: false });
        } else {
          setError(err);
          console.log(error);
        }
      });
  }
  useEffect(() => {
    getGardens();
  }, []);

  // if text entered in search bar matches gardencard "name", return only that gardencard(s)
  const searchGardens = (garden: any) => {
    if (search === "") {
      return true;
    } else {
      return garden.title.toLowerCase().includes(search.toLowerCase());
    }
  };
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={(search) => setSearch(search.target.value)}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
      </div>
      <div id="menu-outer">
        <div className="table">
          <ul id="horizontal-list">
            <div id="movers-row">
              {!gardens.isFetching &&
                gardens.items
                  .filter((item: any) => {
                    return searchGardens(item);
                  })
                  .map((item: any) => (
                    <li key={item}>
                      {
                        <GardenCard
                          name={item.name}
                          location={item.location}
                          description={item.description}
                        />
                      }
                    </li>
                  ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
