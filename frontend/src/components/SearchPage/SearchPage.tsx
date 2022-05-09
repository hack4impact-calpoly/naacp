import React from "react";
import axios from "axios";
import GardenCard from "../GardenCard/GardenCard";
import NavBar from "../NavBar/NavBar";
import "./SearchPage.css";
// import { TextField } from "@mui/material";
// import styled from "styled-components";
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchIcon from "@mui/icons-material/Search";

const HOST = window.location.hostname;
const PORT = 4000;

// const [inputText, setInputText] = useState("");
// let inputHandler = (e: { target: { value: string; }; }) => {
//     //convert input text to lower case
//     var lowerCase = e.target.value.toLowerCase();
//     setInputText(lowerCase);
// };

// const WhiteBorderTextField = styled(TextField)`
//     & .MuiFormControl-root {
//         border-color: white;
//     }
//     & label.Mui-focused {
//         color: white;
//     }
//     & .MuiOutlinedInput-root {
//         &.Mui-focused fieldset {
//             border-color: white;
//         }
//         & fieldset: {
//             border-color: white;
//         }
//         &:hover fieldset: {
//             border-color: white;
//         }
//     }
// `;

export default class SearchPage extends React.Component{
    state = {
        gardens: []
    }
    
    componentDidMount() {
        axios.get(`http://${HOST}:${PORT}/gardens`).then(
            res => {
                const gardens = res.data;
                this.setState({gardens});
            }
        )
    }

    render() {
        return (
            <><NavBar /><div id="menu-outer">
                {/* <div className="search">
                    <WhiteBorderTextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        sx={{color:'white'}}
                        label="Search"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                            ),
                        }}
                    />
                </div> */}
                <div className="table">
                    <ul id="horizontal-list">
                        {this.state.gardens.map(
                            (garden => <li key={garden}>{<GardenCard />}</li>)
                        )}
                    </ul>
                </div>
            </div></>
        );
    }
}