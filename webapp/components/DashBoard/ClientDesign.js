import React, { Component } from "react";
import "./Styles/OnboardAssignment.scss";
import DesignerTitleMenu from "./Components/DesignerTitleMenu";
import Tooltip from "./Components/Tooltip";

export default class ClientDesign extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pushTORequire = push_argu => {
    this.props.history.push("/");
  };
  pushTOProposal = () => {
    this.props.history.push("/proposal");
  };
  pushToDesign = () => {
    this.props.history.push("/design");
  };
  pushTOFeeddback = () => {
    this.props.history.push("/feedback");
  };
  render() {
    return (
      <div>
        <div>
          <DesignerTitleMenu
            title="design"
            pushPropsRequire={this.pushTORequire}
            pushPropsProposal={this.pushTOProposal}
            pushPropsDesign={this.pushToDesign}
            pushPropsFeeddback={this.pushTOFeeddback}
          />
        </div>
        <div style={{ marginTop: "35px" }}>
          <Tooltip title="Meanwhile, you should check out how 1THING selects the right design team and how it makes sure that you get the best designs, in time." />
        </div>
      </div>
    );
  }
}
