import React, { Component } from "react";
import OnboardingMonochromeForms from "./OnboardingMonochromeForms";
import DashboardHeader from "./DashboardHeader";
import DashboardClientInfo from "./DashboardClientInfo";
import ClientProgress from "./ClientProgress";
import OnboardManifesto from "./OnboardManifesto";
import OnboardAssignment from "./OnboardAssignment";
import MonochromeProposal from "./MonochromeProposal";
import QueryChat from "./Components/QueryChat";
import { browserHistory, Route, Router } from "react-router";
import TeamSidebar from "../team_sidebar/index";
import Sidebar from "../sidebar.jsx";
import ClientDesign from "./ClientDesign";
import ClientFeedback from "./ClientFeedback";
import { connect } from "react-redux";
import { getUserInformation } from "./Actions/AsyncActions";


import "./App.scss";
class OnboardingClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setUserProgress: [],
    };
  }
  reloadProgress = e => {
    this.setState({
      setUserProgress: e
    });
  };
  
  
  render() {
    return (
      <div>
        <div className="dashboard-sidebar">
          <TeamSidebar />
        </div>
        <div className="_header">
          <DashboardHeader header_title1={(this.props.clientState.aboutProduct.name === undefined)?'NEW DESIGN JOURNEY':this.props.clientState.aboutProduct.name} />
        </div>
        <div className="dashboard-container">
          <div style={{ width: "67%", marginTop: "32px" }}>
            <Router>
              <Route
                path="/"
                component={OnboardingMonochromeForms}
              //  reloadProgress={e => {
              //    this.setState({ setUserProgress: e });
              //  }}
              />
              <Route path="/proposal" component={MonochromeProposal} />
              <Route path="/design" component={ClientDesign} />
              <Route path="/feedback" component={ClientFeedback} />
            </Router>
          </div>
          <div className="progressbar-container">
            <div className="progress-container">
              <ClientProgress
              // setUserProgress={this.state.setUserProgress} 
               />
            </div>
              <QueryChat
          //      setUserProgress={this.state.setUserProgress}
                channelName={this.props.clientState.userTypeInfo.channelName}
                userType={this.props.clientState.userTypeInfo.userType}
                userId={this.props.clientState.userTypeInfo._id}
                userName={this.props.clientState.userTypeInfo.userName}
              />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    clientState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: url => {
      dispatch(getUserInformation(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingClient);