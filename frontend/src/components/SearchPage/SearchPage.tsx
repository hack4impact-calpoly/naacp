import * as React from "react";
import axios from "axios";
import GardenCard from "../GardenCard/GardenCard";
import NavBar from "../NavBar/NavBar";
import TextField from "@mui/material/TextField";
import "./SearchPage.css";

const HOST = window.location.hostname;
const PORT = 4000;

export interface ListProps {
    items: string[]
}

export interface ListState{
    filtered: string[]
}

export default class SearchPage extends React.Component<ListProps, ListState>{
    // initialize empty filtered list for search
    constructor(props: ListProps) {
        super(props);
        this.state = {
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    // get "list" of gardencard components, set filtered list to these gardens
    componentDidMount() {
        axios.get(`http://${HOST}:${PORT}/gardens`).then(
            res => {
                const gardens = res.data;
                this.setState({
                    filtered: gardens
                });
            }
        )
    
    }

    componentWillReceiveProps(nextProps: ListProps){
        this.setState({
            filtered: nextProps.items
        })
    }

    // if text entered in search bar matches gardencard "name", return only that gardencard(s)
    handleChange(e: any) {
        let currentList = [];
        let newList = [];

        if(e.target.value !== "") {
          currentList = this.props.items
          newList = currentList.filter(item => {
            const lc = item.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter)
          })
        } 
        else {
          newList = this.props.items
        }

        this.setState({
          filtered: newList
        })
      }
    
    render() {
        return (
            <><NavBar />
            <div className="main">
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={this.handleChange}
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
                            {this.state.filtered.map(
                                (item => <li key={item}>{<GardenCard />}</li>)
                            )}
                        </div>
                    </ul>
                </div>
            </div></>
        );
    }
}