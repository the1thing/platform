import React, { Component } from "react";
import "./Styles/OnboardAssignment.scss";
import DisignerTitleMenu from "./Components/DesignerTitleMenu";
import Tooltip from "./Components/Tooltip";

export default class MonochromeProposal extends Component {
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
          <DisignerTitleMenu
            title="proposal"
            pushPropsRequire={this.pushTORequire}
            pushPropsProposal={this.pushTOProposal}
            pushPropsDesign={this.pushToDesign}
            pushPropsFeeddback={this.pushTOFeeddback}
          />
        </div>
        <div style={{ paddingLeft: "3%" }}>
          <div className="assign_info_text">
            <div>
              {" "}
              <img
                width="24px"
                height="24px"
                src={require("./Images/thumb_up.png")}
              />
            </div>
            <div>
              We have received your requirements & our AI is working on it.
              Since our AI is still a baby, it needs a little handholding. In 48
              hours, we will share your Right Design Team along with the Product
              plan.
            </div>
          </div>
          <div className="small_info_text margin_top">
            Your proposal will appear here..
          </div>
          <div className="assimnt_box margin_top">
            <div className="Rectangle-6" />
            <div>
              <div className="assmnt_text_marging_le_40">
                Proposal for Monochrome
              </div>
              <div className="assmnt_text_bottom">
                <span>
                  <img
                    width="20px"
                    height="20px"
                    src={require("./Images/envelope.svg")}
                  />{" "}
                  Mail yourself
                </span>
                <span className="margin_left">
                  {" "}
                  <img
                    width="20px"
                    height="20px"
                    src={require("./Images/download-arrow.svg")}
                  />Download Proposal
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "35px", marginBottom: "200px" }}>
            <Tooltip
              title={
                <span>
                  Meanwhile, you should check out our 1 greatest thing campaign{" "}
                  <a>or read our Monochromes</a> which we publish every week to
                  help Founders and CXOs design great products.
                </span>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
