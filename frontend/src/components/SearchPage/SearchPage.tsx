import React from "react";
import axios from "axios";
import GardenCard from "../GardenCard/GardenCard";
import NavBar from "../NavBar/NavBar";
import TextField from "@mui/material/TextField";
import "./SearchPage.css";

const HOST = window.location.hostname;
const PORT = 4000;

// const [inputText, setInputText] = useState("");

// function SearchPage(this: any, props: { input: string; }){
//     const { type, QUERY_BASE_URL, queryParams, handleClick } = props;
//     const [error, setError] = useState(null);
//     const [data, setData] = useState({ items: [], isFetching: false });
//     const [inputText, setInputText] = useState("");

//     let inputHandler = (e: { target: string; }) => {
//         var lowerCase = e.target.toLowerCase();
//         setInputText(lowerCase);
//     }

//     useEffect(() => {
//         setData({ items: data.items, isFetching: true });
//         const controller = new AbortController();
//         queryParams["signal"] = controller.signal;
//         console.log(QUERY_BASE_URL);
//         axios.get(QUERY_BASE_URL), {
//             params: queryParams,
//         }
//     }).then((response) => {
//         console.log(data);
//         setData({ items: response.data, isFetching: false });
//     }).catch((err) => {
//         if(axios.isCancel(err)) {
//             console.log("Successfully Aborted");
//             setData({ orgs: data.orgs, isFetching: false });
//         }
//         else{
//             setError(err);
//             conos
//         }
//     })

//     const filteredData = this.state.gardens((el: { text: string; }) => {
//         if(props.input === '') {
//             return el;
//         }
//         else{
//             return el.text.toLowerCase().includes(props.input)
//         }
//     })
//     return(
//         <ul>
//             {filteredData.map((garden: { id: React.Key | null | undefined; }) => (
//                 <li key={garden.id}><GardenCard /></li>
//             ))}
//         </ul>
//     )
// }

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
            <><NavBar />
            <div className="main">
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        // onChange={inputHandler}
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
                            {this.state.gardens.map(
                                (garden => <li key={garden}>{<GardenCard />}</li>)
                            )}
                        </div>
                    </ul>
                </div>
            </div></>
        );
    }
}