import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import MapComponent from "./components/map/map";
import FilmComponent from "./components/film/film";
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      films: []
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/films">Films</Link>
              </li>
              <li>
                <Link to={{
                  pathname: "/map"                  
                }}>Map</Link>
              </li>
            </ul>
            <Route path="/films" component={FilmComponent} />
            <Route path="/map" component={MapComponent} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
