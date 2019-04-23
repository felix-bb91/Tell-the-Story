import React, { Component } from 'react';
import MainPage from './containers/MainPage';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';


class App extends Component {

  
  render() {
    return (
      <Router>
        <MainPage/>
      </Router>
    );
  }
}

export default App;
