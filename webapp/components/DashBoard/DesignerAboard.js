import React, { Component } from "react";
import DesignerTitleMenu from "./Components/DesignerTitleMenu";
import "./Styles/OnboardAssignment.scss";
import Tooltip from "./Components/Tooltip";

export default class DesignerAboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pushToOnboarding = () => {
    this.props.history.push("/");
  };
  pushToAssignment = () => {
    this.props.history.push("/assignment");
  };
  pushToPricing = () => {
    this.props.history.push("/pricing");
  };
  pushToAboard = () => {
    this.props.history.push("/aboard");
  };
  render() {
    return (
      <div>
        <div>
          <DesignerTitleMenu
            title="aboard"
            pushPropsOnboarding={this.pushToOnboarding}
            pushPropsAssignment={this.pushToAssignment}
            pushPropsPricing={this.pushToPricing}
            pushPropsAboard={this.pushToAboard}
          />
        </div>
        <div style={{ marginTop: "35px" }}>
          <Tooltip title="Meanwhile, you should check out how 1THING selects the right design team and how it makes sure that you get the best designs, in time." />
        </div>
      </div>
    );
  }
}
