import React, { Component } from "react";
import OnboardingDesignerForms from "./OnboardingDesignerForms";
import DashboardHeader from "./DashboardHeader";
import DashboardDesignerInfo from "./DashboardDesignerInfo";
import DesignerProgress from "./DesignerProgress";
import OnboardManifesto from "./OnboardManifesto";
import OnboardAssignment from "./OnboardAssignment";
import MonochromeProposal from "./MonochromeProposal";
import QueryChat from "./Components/QueryChat";
import Tooltip from "./Components/Tooltip";
import { browserHistory, Route, Router } from "react-router";
import TeamSidebar from "../team_sidebar/index";
import DesignerPricing from "./DesignerPricing";
import DesignerAboard from "./DesignerAboard";
import { connect } from "react-redux";
import { getUserInformation } from "./Actions/AsyncActions";

import "./App.scss";
class OnboardingDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setUserProgress: []
    };
  }
  render() {
    return (
      <div>
        <div className="dashboard-sidebar">{console.log("designer--->",this.props.designerState)}
          <TeamSidebar />
        </div>
        <div className="_header">
          <DashboardHeader header_title1="ONBOARDING"/>
        </div>
        <div className="dashboard-container">
          <div style={{ width: "67%", marginTop: "32px" }}>
            <Router>
              <div>
                <Route
                  path="/"
                  component={OnboardingDesignerForms}
                //  reloadProgress={e => {
                //    this.setState({ setUserProgress: e });
                //  }}
                />
                <Route path="/assignment" component={OnboardAssignment} />
                <Route path="/pricing" component={DesignerPricing} />
                <Route path="/aboard" component={DesignerAboard} />
              </div>
            </Router>
          </div>
          <div className="progressbar-container">
            <div className="progress-container">
              <DesignerProgress
                //setUserProgress={this.state.setUserProgress} 
               />
            </div>
            <QueryChat
                channelName={this.props.designerState.userTypeInfo.channelName}
                userType={this.props.designerState.userTypeInfo.userType}
                userId={this.props.designerState.userTypeInfo._id}
                userName={this.props.designerState.userTypeInfo.name}
          
            //  setUserProgress={this.state.setUserProgress} 
              />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    designerState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: url => {
      dispatch(getUserInformation(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingDesigner);