import React, { Component } from "react";
import "./Styles/MyComponents.css";
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

export default class OnboardingMonochromeForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutProductActive: true,
      aboutDesignActive: false,
      aboutTimelineActive: false,
      aboutProductView: false,
      aboutDesignView: false,
      aboutTimelineView: false,
      requirement_display: "block",
      proposal_display: "none",
      design_display: "none",
      feedback_display: "none",
      manifesto_display: "block",
      client_info_display: "block",
      product_date: "",
      design_date: "",
      timeline_date: "",
      loading: true,
      projectId: "",
      aboutProductCompleted: false,
      aboutDesignCompleted: false,
      aboutTimelineCompleted: false,
      redirect: false,
      menuOpacity:'0.4',
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.getUserData();
  }
  openPanel = () => {
    this.refs.openPanel();
    this.getUserData();
    
  };
  getUserData = () => {
    axios({
      method: "get",
      url:
        basepath +
        "project/getAllProjectsForWorkspace/" +
        localStorage.getItem("userId")
    })
      .then(response => {
        if (response.data && response.data._id) {
          var _response = response.data.statusBar;
          localStorage.setItem("projectId", response.data._id);
          this.setState({
            projectId: response.data._id,
            product_date: _response.product.completedDate,
            aboutDesignActive: _response.product.completed,
            aboutProductView:_response.product.completed,
            design_date: _response.design.completedDate,
            aboutTimelineActive: _response.design.completed,
            aboutDesignView: _response.design.completed,
            timeline_date: _response.timeline.completedDate,
            aboutProductCompleted: _response.product.completed,
            aboutDesignCompleted: _response.design.completed,
            aboutTimelineCompleted: _response.timeline.completed,
            aboutTimelineView: _response.timeline.completed,
            loading: false
          });
          if(this.state.aboutDesignActive && this.state.aboutProductView && this.state.aboutTimelineActive){
            this.setState({
              menuOpacity:'1',
            })
          }
          console.log("about designe view",this.state.aboutDesignView);
          let temp = {
            aboutProduct: this.state.aboutProductCompleted,
            aboutDesign: this.state.aboutDesignCompleted,
            aboutTimeline: this.state.aboutTimelineCompleted,
            aboutTimelineDate: this.state.timeline_date
          };
          this.props.reloadProgress(temp);
          //  this.props.route.reloadProgress(temp);
        } else {
          this.setState({
            loading: false,
          //  aboutProductView: true
          });
        }
      })
      .then(() => {
        if (this.state.aboutTimelineCompleted && this.state.redirect) {
          this.props.history.push("/proposal");
        }
      })
      .catch(error => {
        console.log("error", error);
        this.setState({ loading: false });
      });
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
      return <div>{/* loading ... */}</div>;
    } else {
      return (
        <div>
          <div
            className="title-content"
            style={{
              display: this.state.client_info_display,
              marginBottom: "32px"
            }}
          >
            <DashboardClientInfo channelName={this.props.channelName}/>
          </div>
          <ClientTitleMenu
            title="requirement"
            pushPropsRequire={this.pushTORequire}
            pushPropsProposal={this.pushTOProposal}
            pushPropsDesign={this.pushToDesign}
            pushPropsFeeddback={this.pushTOFeeddback}
            opacity={this.state.menuOpacity}
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
              openPanel={refs => (this.refs = refs)}
              color="linear-gradient(-200deg, #8776FF 0%, #743AFE 86%)"
              borderRadius="4px 4px 0 0"
              view={!this.state.aboutProductView && !this.state.aboutDesignView && !this.state.aboutTimelineView ? true : false}
              active={this.state.aboutProductActive}
              date={returnDate(this.state.product_date)}
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
              openPanel={refs => (this.refs = refs)}
              color="linear-gradient(248deg, #28e5c0 1%, #06c9a4)"
              borderRadius="4px"
              view={this.state.aboutProductView && !this.state.aboutDesignView && !this.state.aboutTimelineView ? true : false}
              active={this.state.aboutDesignActive}
              date={returnDate(this.state.design_date)}
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
              openPanel={refs => (this.refs = refs)}
              color="linear-gradient(248deg, #d878ef, #c45edd)"
              borderRadius="4px"
              view={this.state.aboutProductView && this.state.aboutDesignView && !this.state.aboutTimelineView ? true : false}
              active={this.state.aboutTimelineActive}
              date={returnDate(this.state.timeline_date)}
              title={
                <span>
                  3.<span className="title-padding">About Timeline</span>
                </span>
              }
              panelContent={
                <AboutTimeline
                  ref="openPanel"
                  openPanel={() => {
                    this.setState({
                      redirect: true
                    });
                    this.openPanel();
                  }}
                />
              }
            />
            <div style={{marginBottom:'200px'}}>
              <Tooltip title="We'll share the Right Design Team & Product plan with you in 48 hours of your completion of these 3 steps." />
            </div>
          </div>

          {/* very important      -------------   dont remove------- */}

          {/* <div className="title-content" style={{display:this.state.manifesto_display}}>
        <OnboardManifesto/>
        </div> */}
        </div>
      );
    }
  }
}
