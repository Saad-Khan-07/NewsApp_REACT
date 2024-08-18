import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div style={{backgroundColor:'#90A4AE', height:'100%', width:'100%'}}> 
          <Navbar />
        </div>
        <div>
        <Routes>
          <Route
            path="/"
            element={<News key="general" country="in" pageSize={12} category="general" />}
          />
          <Route
            path="/sports"
            element={<News key="sports" country="in" pageSize={12} category="sports" />}
          />
          <Route
            path="/science"
            element={<News key="science" country="in" pageSize={12} category="science" />}
          />
          <Route
            path="/business"
            element={<News key="business" country="in" pageSize={12} category="business" />}
          />
          <Route
            path="/entertainment"
            element={
              <News key="entertainment" country="in" pageSize={12} category="entertainment" />
            }
          />
          <Route
            path="/health"
            element={<News key="health" country="in" pageSize={12} category="health" />}
          />
          <Route
            path="/technology"
            element={<News key="technology" country="in" pageSize={12} category="technology" />}
          />
        </Routes>
        </div>
      </Router>
      
    );
  }
}

// api pass: CreamAndOnion
// Your API key is: 783d1790900b4f7b9a0c8decbdc021c8
