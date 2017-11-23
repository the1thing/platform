import React, { Component } from "react";
import "./Styles/MyComponents.scss";
import ClientTitleMenu from "./Components/ClientTitleMenu";
import OnBoardingTitles from "./Components/OnBoardingTitles";
import { Panel, FormGroup, Checkbox } from "react-bootstrap";
import AboutUser from "./Containers/AboutUser";
import UserExperties from "./Containers/UserExperties";
import UserPerspective from "./Containers/UserPerspective";
import RatingUserself from "./Containers/RatingUserself";
import AboutProduct from "./Containers/AboutProduct";
import AboutDesign from "./Containers/AboutDesign";
import AboutTimeline from "./Containers/AboutTimeline";
import MonochromeProposal from "./MonochromeProposal";
import OnboardManifesto from "./OnboardManifesto";
import DashboardClientInfo from "./DashboardClientInfo";
import axios from "axios";
import { basepath } from "./utils/constant";
import { returnDate } from "./utils/Methods";
import Tooltip from "./Components/Tooltip";
import { isEmpty } from "./utils/Methods";
// import {getClientInformation } from './Dashboard/Actions/AsyncActions';
import { connect } from "react-redux";
import { getClientInformation } from "./Actions/AsyncActions";

class OnboardingMonochromeForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productCompleted: false,
      productDate: "",
      designCompleted: false,
      designDate: "",
      timelineCompleted: false,
      timelineDate: ""
    };
  }

  componentWillMount() {
    this.getUserData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true
    });
    let temp = nextProps.clientState.allProjectWorkspace;
    if (!isEmpty(temp)) {
      this.setState({
        productCompleted: temp.statusBar.product.completed,
        productDate: temp.statusBar.product.completedDate,
        designCompleted: temp.statusBar.design.completed,
        designDate: temp.statusBar.design.completedDate,
        timelineCompleted: temp.statusBar.timeline.completed,
        timelineDate: temp.statusBar.timeline.completedDate,
        loading: false
      });
    }
  }
  getUserData = () => {
    let userId=this.props.clientState.userTypeInfo._id;
    if(userId !== '' || userId !== 'undefined' || userId != undefined){
    let url =
      basepath +
      "project/getAllProjectsForWorkspace/" +
      this.props.clientState.userTypeInfo._id;
    this.props.getClienInfo(url);
    }
  };
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
    if (this.state.loading) {
      return <div />;
    } else
      return (
        <div>
          <div
            className="title-content"
            style={{
              display: this.state.client_info_display,
              marginBottom: "32px"
            }}
          >
            <DashboardClientInfo
              channelName={this.props.clientState.userTypeInfo.channelName}
            />
          </div>
          <ClientTitleMenu
            title="requirement"
            pushPropsRequire={this.pushTORequire}
            pushPropsProposal={this.pushTOProposal}
            pushPropsDesign={this.pushToDesign}
            pushPropsFeeddback={this.pushTOFeeddback}
          />
          <div
            style={{ display: this.state.requirement_display }}
            className="title-content"
          >
            <div className="Onboarding-content-f">
              {/* Requirements content three steps 1st is product where you tell us
              about your product, what kinda product you want to build, 2nd is
              about design, which type of design philosophy you want to follow
              and 3rd about timeline.. here it is
              <img width="24px" src={require("./Images/1f447.png")} /> */}
            </div>
            <OnBoardingTitles
              color="linear-gradient(-200deg, #8776FF 0%, #743AFE 86%)"
              borderRadius="4px 4px 0 0"
              active={true}
              view={
                !this.state.productCompleted &&
                !this.state.designCompleted &&
                !this.state.timelineCompleted
                  ? true
                  : false
              }
              date={returnDate(this.state.productDate)}
              title={
                <span>
                  1.<span className="title-padding">About Product</span>
                </span>
              }
              panelContent={
                <AboutProduct
                  openPanel={() => {
                    this.openPanel();
                  }}
                />
              }
            />
            <OnBoardingTitles
              color="linear-gradient(248deg, #28e5c0 1%, #06c9a4)"
              borderRadius="4px"
              view={
                this.state.productCompleted &&
                !this.state.designCompleted &&
                !this.state.timelineCompleted
                  ? true
                  : false
              }
              active={this.state.productCompleted}
              date={returnDate(this.state.designDate)}
              title={
                <span>
                  2.<span className="title-padding">About Design</span>
                </span>
              }
              panelContent={
                <AboutDesign
                  projectId={this.state.projectId}
                  openPanel={() => {
                    this.openPanel();
                  }}
                />
              }
            />
            <OnBoardingTitles
              color="linear-gradient(248deg, #d878ef, #c45edd)"
              borderRadius="4px"
              view={
                this.state.productCompleted &&
                this.state.designCompleted &&
                !this.state.timelineCompleted
                  ? true
                  : false
              }
              active={this.state.designCompleted}
              date={returnDate(this.state.timelineDate)}
              title={
                <span>
                  3.<span className="title-padding">About Timeline</span>
                </span>
              }
              panelContent={
                <AboutTimeline
                  history={this.props.history}
                  openPanel={() => {
                    this.setState({
                      redirect: true
                    });
                    this.openPanel();
                  }}
                />
              }
            />
            <div style={{ marginBottom: "200px" }}>
              <Tooltip title="We'll share the Right Design Team & Product plan with you in 48 hours of your completion of these 3 steps." />
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
    getClienInfo: url => {
      dispatch(getClientInformation(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  OnboardingMonochromeForms
);
