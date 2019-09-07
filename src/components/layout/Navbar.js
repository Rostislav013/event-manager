import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              Events
            </Link>
            <div className="col s6">
            <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  backgroundColor: "yellow",
                  padding: "15px",
                  margin: "20px"
                }}
                /*className="btn btn-large btn-flat waves-effect white black-text"*/
              >
                Log In
              </Link>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  backgroundColor: "yellow",
                  padding: "15px",
                  margin: "20px"
                }}
                /*className="btn btn-large waves-effect waves-light hoverable blue accent-3"*/
              >
                Register
              </Link></div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;