import React, { Component } from "react";
import {emitUserLoggedOutEvent} from '../../actions/global_actions';

export default class DashboardHeader extends Component {
  render() {
    return (
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <span>
            {this.props.header_title1}
            <div
              style={{
                borderBottom: "2px solid #030303",
                paddingBottom: "21px",
                position: "absolute",
                width: "48px"
              }}
            />
          </span>
          <span style={{ color: "blue", marginLeft: "12px" }}>
            {this.props.header_title2}
          </span>
        </div>
        <div style={{marginRight:'20px',cursor:'pointer'}}>
          <div className="dashboard-logout" onClick={(e)=>{emitUserLoggedOutEvent()}}></div>
        </div>
        {/* <button onClick={(e)=>{emitUserLoggedOutEvent()}}>emitUserLoggedOutEvent</button> */}
      </div>
    );
  }
}
