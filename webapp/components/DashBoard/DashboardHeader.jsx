import React, { Component } from "react";
// import {browserHistory} from 'react-router/es6';

export default class DashboardHeader extends Component {
  handleLogout = () => {
      alert("called")
    localStorage.clear();
  };
render() {
    return (
      <div className="header-container">
        <span>
          <span>
            {this.props.header_title1}
            <div
              style={{
                borderBottom: "2px solid #030303",
                paddingBottom: "28px",
                position: "absolute",
                width: "48px"
              }}
            />
          </span>

          <span style={{ color: "blue", marginLeft: "12px" }}>aa</span>
        </span>
        <div style={{ marginRight: "20px" }} onClick={()=>this.handleLogout()}>
        <a href='https://staging.1thing.io/login'>
          <img
            style={{ width: "24px", height: "24px" }}
            src={require("./Images/logout.svg")}
          /></a>
        </div>
      </div>
    );
  }
}
