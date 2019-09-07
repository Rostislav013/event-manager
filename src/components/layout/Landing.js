import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "60vh" }} >
        
          <div className="col s12 center-align">
            <h4>
              Events list is going to be here soon...
            </h4>
            <Link to="/movies/list" className="nav-link"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              backgroundColor: "yellow",
              padding: "5px",
              margin: "20px"
            }}>
              Event List
            </Link>
                       
            <Link to="/movies/create" className="nav-link"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              backgroundColor: "yellow",
              padding: "5px",
              margin: "20px"
            }}>
              Create Event
            </Link>
                       
            
          </div>
        
      </div>
    );
  }
}
export default Landing;