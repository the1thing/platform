import React, { Component } from "react";
import DesignerTitleMenu from "./Components/DesignerTitleMenu";
import "./Styles/OnboardAssignment.scss";
import Tooltip from "./Components/Tooltip";
import { connect } from "react-redux";

class OnboardAssignment extends Component {
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
            title="assignment"
            activeAssignment={this.props.assignmentState.allProjectWorkspace.statusBar.thinkAboutYourself.completed}
            pushPropsOnboarding={this.pushToOnboarding}
            pushPropsAssignment={this.pushToAssignment}
            pushPropsPricing={this.pushToPricing}
            pushPropsAboard={this.pushToAboard}
          />
        </div>
        <div className='title-content'>
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
              Wasn’t that easy? We’ve successfully generated your application.
              Please allow 2 days for the final stage assignment to be shared
              with you.{" "}
            </div>
          </div>
          <div className="small_info_text margin_top">
            Your assignment will appear here..
          </div>
          <div className="assimnt_box margin_top">
            <div className="Rectangle-6" />
            <div>
              <div className="assmnt_text_marging_le_40">Assignment</div>
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
            <Tooltip title="Meanwhile, you could           about how 1THING works.  " />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    assignmentState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getdesignerInfo: url => {
    //   dispatch(getDesignerInformation(url));
    // }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  OnboardAssignment
);