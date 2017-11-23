import React, { Component } from "react";

export default class DashboardDesignerInfo extends Component {
  render() {
    return (
      <div>
        <div className="view-container">
          <div style={{ marginBottom: "8px" }}>
            {" "}
            <span style={{ textTransform: "capitalize" }}>
              {localStorage.getItem("userName")}
            </span>! This is your WorkSpace.<img
              width="24px"
              src={require("./Images/1f60a.png")}
            />
          </div>
          <div>
            <div style={{ marginBottom: "8px" }}>
              Welcome to the era of<span
                onClick={() =>
                  window.open(
                    "https://1thing.io/communication/right-design-team"
                  ).location
                }
                className="clickable_text"
              >
                {" "}
                Seamless Design Communication
              </span>{" "}
              - the easiest way of working together.
            </div>
            <div>
              First things first, in order to join 1THING Design Network you
              must complete the onboarding.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
