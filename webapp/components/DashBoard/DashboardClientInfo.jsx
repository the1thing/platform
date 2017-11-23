import React, { Component } from "react";
import channelpath from "./utils/constant";

export default class DashboardClientInfo extends Component {
  render() {
    return (
      <div>
        <div className="view-container">
          <div style={{ marginBottom: "8px" }}>
            {" "}
            Welcome to your space at 1THING,{" "}
            <span style={{ textTransform: "capitalize" }}>
              {localStorage.getItem("userName")}
            </span>
            <img width="24px" src={require("./Images/1f60a.png")} />
          </div>
          <div>
            This is where we discuss & design your product together. Help us
            learn more about your product by entering details in coloured boxes
            below so we can put together just the Right Design Team along with
            product plan for you.
            <div style={{ marginTop: "8px" }}>
              We are
              <a href={channelpath + this.props.channelName}>
                <span
                  style={{
                    marginLeft: "6px",
                    textDecoration: "underline",
                    color: "#030303"
                  }}
                >
                  here
                </span>
              </a>{" "}
              for anything else you may want to talk about.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
