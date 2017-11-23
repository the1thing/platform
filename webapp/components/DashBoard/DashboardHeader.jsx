import React, { Component } from "react";

export default class DashboardHeader extends Component {
  render() {
    return (
      <div>
        <span>
          {this.props.header_title1}
          <div
            style={{
              borderBottom: "2px solid #030303",
              paddingBottom: "31px",
              position: "absolute",
              width: "48px"
            }}
          />
        </span>

        <span style={{ color: "blue", marginLeft: "12px" }}>
          {this.props.header_title2}
        </span>
      </div>
    );
  }
}
