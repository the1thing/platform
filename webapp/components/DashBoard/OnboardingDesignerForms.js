import React, { Component } from "react";
import "./Styles/MyComponents.scss";
import DesignerTitleMenu from "./Components/DesignerTitleMenu";
import OnBoardingTitles from "./Components/OnBoardingTitles";
import { Panel, FormGroup, Checkbox } from "react-bootstrap";
import AboutUser from "./Containers/AboutUser";
import UserExperties from "./Containers/UserExperties";
import UserPerspective from "./Containers/UserPerspective";
import RatingUserself from "./Containers/RatingUserself";
import AboutProduct from "./Containers/AboutProduct";
import AboutDesign from "./Containers/AboutDesign";
import AboutTimeline from "./Containers/AboutTimeline";
import OnboardAssignment from "./OnboardAssignment";
import OnboardManifesto from "./OnboardManifesto";
import DashboardDesignerInfo from "./DashboardDesignerInfo";
import Tooltip from "./Components/Tooltip";
import { returnDate } from "./utils/Methods";
import axios from "axios";
import { basepath } from "./utils/constant";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { isEmpty } from "./utils/Methods";
import { connect } from "react-redux";
import { getDesignerInformation } from "./Actions/AsyncActions";

class OnboardingDesignerForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userCompleted: false,
      userDate: "",
      perspectiveCompleted: false,
      perspectiveDate: "",
      expertiseCompleted: false,
      expertiseDate: "",
      ratingCompleted: false,
      ratingDate: ""
    };
  }

  componentWillMount() {
    this.getUserData();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true
    });
    let temp = nextProps.designerState.allProjectWorkspace;
    if (!isEmpty(temp)) {
      this.setState({
        userCompleted: temp.statusBar.aboutYourself.completed,
        userDate: temp.statusBar.aboutYourself.completedDate,
        expertiseCompleted: temp.statusBar.expertise.completedDate,
        expertiseDate: temp.statusBar.expertise.completedDate,
        perspectiveCompleted: temp.statusBar.perspective.completedDate,
        perspectiveDate: temp.statusBar.perspective.completedDate,
        ratingCompleted: temp.statusBar.thinkAboutYourself.completedDate,
        ratingDate: temp.statusBar.thinkAboutYourself.completedDate,
        loading: false
      });
    }
  }

  getUserData = () => {
    let userId = this.props.designerState.userTypeInfo._id;
    if (userId !== "" || userId !== "undefined" || userId != undefined) {
      let url =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.designerState.userTypeInfo._id +
        "?stage=1";
      this.props.getdesignerInfo(url);
    }
  };
  openPanel = () => {
    this.refs.openPanel();
    this.getUserData();
  };
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
    if (this.state.loading) {
      return <div />;
    } else
      return (
        <div>
          <div
            className="title-content"
            style={{
              display: this.state.designer_info_display,
              marginBottom: "32px"
            }}
          >
            <DashboardDesignerInfo />
          </div>
          <div>
            <DesignerTitleMenu
              title="onboarding"
              pushPropsOnboarding={this.pushToOnboarding}
              pushPropsAssignment={this.pushToAssignment}
              pushPropsPricing={this.pushToPricing}
              pushPropsAboard={this.pushToAboard}
            />
          </div>

          <div
            style={{ display: this.state.onboarding_display }}
            className="title-content"
          >
            <div className="Onboarding-content-f">
              {/* Onboarding content four steps: 1st is about yourself, 2nd is about expertise, 
            3rd about your perspective and lastly, how you think about yourself .. here it is 
            <img  width='24px' src={require('./Images/1f447.png')}/> */}
            </div>
            <OnBoardingTitles
              //openPanel={refs => (this.refs = refs)}
              color="linear-gradient(248deg, #8776ff, #743afe)"
              borderRadius="4px"
              view={
                !this.state.userCompleted &&
                !this.state.expertiseCompleted &&
                !this.state.perspectiveCompleted &&
                !this.state.ratingCompleted
                  ? true
                  : false
              }
              active={true}
              date={returnDate(this.state.userDate)}
              title={
                <span>
                  1.<span className="title-padding">About Yourself</span>
                </span>
              }
              panelContent={
                <AboutUser
                  openPanel={() => {
                    this.openPanel();
                  }}
                />
              }
            />
            <OnBoardingTitles
              //openPanel={refs => (this.refs = refs)}
              color="linear-gradient(248deg, #28e5c0 1%, #06c9a4)"
              borderRadius="4px"
              view={
                this.state.userCompleted &&
                !this.state.expertiseCompleted &&
                !this.state.perspectiveCompleted &&
                !this.state.ratingCompleted
                  ? true
                  : false
              }
              active={this.state.userCompleted}
              date={returnDate(this.state.expertiseDate)}
              title={
                <span>
                  2.<span className="title-padding">Your expertise</span>
                </span>
              }
              panelContent={
                <UserExperties
                  openPanel={() => {
                    this.openPanel();
                  }}
                />
              }
            />
            <OnBoardingTitles
              //openPanel={refs => (this.refs = refs)}
              color=" linear-gradient(248deg, #d878ef, #c45edd)"
              borderRadius="4px"
              view={
                this.state.userCompleted &&
                this.state.expertiseCompleted &&
                !this.state.perspectiveCompleted &&
                !this.state.ratingCompleted
                  ? true
                  : false
              }
              active={this.state.expertiseCompleted}
              date={returnDate(this.state.perspectiveDate)}
              title={
                <span>
                  3.<span className="title-padding">Your perspective</span>
                </span>
              }
              panelContent={
                <UserPerspective
                  openPanel={() => {
                    this.openPanel();
                  }}
                />
              }
            />
            <OnBoardingTitles
              //openPanel={refs => (this.refs = refs)}
              color="linear-gradient(227deg, #ffb061, #ff9c39)"
              borderRadius="4px"
              view={
                this.state.userCompleted &&
                this.state.expertiseCompleted &&
                this.state.perspectiveCompleted &&
                !this.state.ratingCompleted
                  ? true
                  : false
              }
              active={this.state.perspectiveCompleted}
              date={returnDate(this.state.ratingDate)}
              title={
                <span>
                  4.<span className="title-padding">Rate Yourself</span>
                </span>
              }
              panelContent={
                <RatingUserself
                  history={this.props.history}
                //  openPanel={() => {
                //    this.setState({ redirect: true });
                //    this.openPanel();
                //  }}
                />
              }
            />
            <div style={{ marginBottom: "200px" }}>
              <Tooltip title="After this, an assignment will be shared with you in the next 48 hrs." />
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
    getdesignerInfo: url => {
      dispatch(getDesignerInformation(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  OnboardingDesignerForms
);
