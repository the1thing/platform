import React, { Component } from "react";
import { browserHistory } from "react-router/es6";
import axios from "axios";
import OnboardingDesigner from "./OnboardingDesigner";
import OnboardingClient from "./OnboardingClient";
import { basepath } from "./utils/constant";
import { connect } from "react-redux";
import "./App.scss";
import { getUserInformation } from "./Actions/AsyncActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      loading: false,
      dashboardIconClass: ""
    };
  }
  getCookie = name => {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return value != null ? unescape(value[1]) : null;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true
    });
    let temp = nextProps.dashboardState.userTypeInfo;
    this.setState({
      userType: temp.userType,
      loading: false
    });
  }

  componentWillMount() {
    if (window.location.href.includes("dashboard")) {
    } else {
      this.setState({
        dashboardIconClass: ""
      });
    }
    let uId = this.getCookie("MMUSERID");
    let url = basepath + "user/getUser/" + "q6h4f7mkbtdijjzt9ducazem5y";
    this.props.getUserInfo(url);
  }
  render() {
    if (this.state.loading) {
      return <div />;
    } else {
      if (this.props.dashboardState.userTypeInfo.userType === "client") {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingClient
              channelName={this.props.dashboardState.userTypeInfo.channelName}
            />
          </div>
        );
      } else if (
        this.props.dashboardState.userTypeInfo.userType === "designer"
      ) {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingDesigner />
          </div>
        );
      } else {
        return (
          <div className={this.state.dashboardIconClass}>
            You have no workspace. Please start Afresh.
          </div>
        );
      }
    }
  }
}
function mapStateToProps(state) {
  return {
    dashboardState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: url => {
      dispatch(getUserInformation(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
