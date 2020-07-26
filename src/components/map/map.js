import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import SearchComponent from "../search/search";
import config from "../../envConfig";
const axios = require("axios").default;

class MapComponent extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            showedFilms: [],
            map: {
                zoom: 7,
                center: [0, 0]
            }
        }

        this.setFilms = this.setFilms.bind(this);
    }

    componentDidMount() {
        const protocol = config.REACT_WEB_SERVER_PROTOCOL;
        const host = config.REACT_WEB_SERVER_HOST;
        const port = config.REACT_WEB_SERVER_PORT;
        const basePath = config.REACT_WEB_SERVER_BASEPATH;
        const endPoint = "film";
        const url = `${protocol}://${host}:${port}/${basePath}/${endPoint}`;
        this.fetchFilms(url);
    }    

    fetchFilms(url) {
        axios.get(url)
            .then((data) => {
                this.setState({
                    films: data.data,
                    showedFilms: data.data,
                    map: {
                        zoom: 7,
                        center: [parseFloat(data.data[0].locations[0].latitude), parseFloat(data.data[0].locations[0].longitude)]
                    }
                });
            })
            .catch((err) => {
                console.log("error ", err);
            })
    }

    setFilms(id){
        if(id=="all"){
            this.setState({
                showedFilms: this.state.films
            })
        }
        else{
            const films = this.state.films.filter(film=>film.id===id);
            this.setState({
                showedFilms: films
            });
        }        
    }

    render() {
        if(this.state.films.length){
            return (
                <div>
                    <SearchComponent data={this.state.films} setFilms={this.setFilms}/>
                    <Map center={this.state.map.center} zoom={this.state.map.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
    
                        {
                            this.state.showedFilms.map((film) => {
                                return film.locations.map((location) => {
                                    return <Marker key={location.id} position={[parseFloat(location.latitude), parseFloat(location.longitude)]} >
                                        <Popup>{film.title}</Popup>
                                    </Marker>
                                })
                            })
                        }
                    </Map>
                </div >
            );
        }
        else{
            return <div>Loading...</div>
        }
    }
}

export default MapComponent;