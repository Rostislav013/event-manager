import React, { Component } from "react";
import react from './react.png';
import './Landing.css';
class Landing extends Component {
  render() {
    return (
      <div>
        <div className="madeInReact">
          <img src={react} alt="Made in React" />
        </div>
      </div>
    );
  }
}
export default Landing;