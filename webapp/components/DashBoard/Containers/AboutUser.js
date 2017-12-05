import React, { Component } from "react";
import {
  FormGroup,
  Checkbox,
  OverlayTrigger,
  Tooltip,
  Button
} from "react-bootstrap";
import "../Styles/AboutUser.scss";
import CheckBoxComp from "../Components/CheckBoxComp";
import RadioBoxComp from "../Components/RadioBoxComp";
import { getCheckBoxValue } from "../utils/Methods";
import { basepath } from "../utils/constant";
import { validateUrl, numberOnly } from "../utils/Methods";
import axios from "axios";
import LoreamTooltip from "../Components/LoreamTooltip";
import { isEmpty } from "../utils/Methods";
import { connect } from "react-redux";
import { setUserAddUpdate, getAboutUserData } from "../Actions/AsyncActions";

const tooltip = (
  <Tooltip id="tooltip">
    <div className="questionMarkToolTipDiv">
      Your Linkedin profile adds authenticity to your account. It further helps
      account managers start more contextual conversations with you. We do not
      share your information with anyone outside of 1THING.
    </div>
  </Tooltip>
);
class AboutUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      view: "hidden-me",
      linkdinLink: "",
      workExperience: "",
      jobTiming: "",
      availability: "",
      checkboxArray: [],
      workExperienceClass: false,
      linkdinLinkClass: false,
      linkdinErrorMessage: "",
      availabilityClass: false,
      linkdinLinkColor: "#0d65d8",
      idVisiblityError: "",
      jobTimingError: "",
      linkVisiblityError: "hidden",
      checkboxList: [
        "UI Designer",
        "UX Designer",
        "Graphics Designer",
        "Branding",
        "Fron-end Devloper",
        "Android Devloper",
        "UX Writer"
      ]
    };
  }

  componentWillMount = () => {
    let userId = this.props.userState.allProjectWorkspace._id;
    if (userId !== "" && userId !== "undefined" && userId !== undefined) {
      let url =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.userState.allProjectWorkspace._id +
        "?stage=1";
      this.props.getUserData(url);
    }
  };

  componentWillReceiveProps(nextProps) {
    let temp = nextProps.userState.allProjectWorkspace;
    if (temp.statusBar.aboutYourself.completed !== false) {
      this.setState({
        linkdinLink: temp.linkedinProfile,
        workExperience: temp.workExperience,
        jobTiming: temp.role,
        availability: temp.hoursAvailable,
        checkboxArray: temp.profile != null ? temp.profile : []
      });
    }
  }

  renderClass = () => {
    if (
      this.state.checkboxArray[0] &&
      this.state.linkdinLink &&
      validateUrl(this.state.linkdinLink) &&
      this.state.workExperience &&
      this.state.jobTiming &&
      this.state.availability
    ) {
      return "Rectangle-4";
    } else {
      return "button-block-class";
    }
  };
  setStateMethod = (label, value) => {
    this.setState({
      [label]: value
    });
  };
  putAboutUser = () => {
    let method = "put";
    let url = basepath + "designer/addAboutYourself";
    let _apiurl =
      basepath +
      "designer/getDesignerDetailsByStage/" +
      this.props.userState.allProjectWorkspace._id +
      "?stage=1";
    let data = {
      designerId: this.props.userState.allProjectWorkspace._id,
      profile: this.state.checkboxArray,
      linkedinProfile: this.state.linkdinLink,
      workExperience: this.state.workExperience,
      role: this.state.jobTiming,
      hoursAvailable: this.state.availability
    };
    let userId = this.props.userState.allProjectWorkspace._id;
    if (userId !== "" || userId !== "undefined" || userId !== undefined) {
      let getDesignerUrl = (_apiurl =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.userState.allProjectWorkspace._id +
        "?stage=1");
      this.props.userAddUpdate(method, url, data, _apiurl, getDesignerUrl);
    }
  };
  goTo = () => {
    if (this.state.checkboxArray.length == 0) {
      document.getElementById("id").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("idVisiblityError", "radio-error");
    } else if (!this.state.linkdinLink) {
      document.getElementById("linkedin").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("linkdinLinkClass", true);
      this.setStateMethod("linkVisiblityError", "hidden");
    } else if (!validateUrl(this.state.linkdinLink)) {
      document.getElementById("linkedin").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("linkVisiblityError", "visible");
    } else if (!this.state.workExperience) {
      document.getElementById("workExperience").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("workExperienceClass", true);
    } else if (!this.state.jobTiming) {
      document.getElementById("jobTiming").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("jobTimingError", "radio-error");
    } else if (!this.state.availability) {
      document.getElementById("availability").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("availabilityClass", true);
    } else {
      this.putAboutUser();
    }
  };
  renderCheckBox = () => {
    return this.state.checkboxList.map((value, key) => {
      return (
        <span key={key}>
          <CheckBoxComp
            isChecked={this.state.checkboxArray.indexOf(value) >= 0}
            toggle={this.state.checkboxArray.indexOf(value) >= 0}
            label={value}
            checkboxOnClick={e => {
              this.setStateMethod(
                "checkboxArray",
                getCheckBoxValue(e, this.state.checkboxArray)
              );
              this.setStateMethod("idVisiblityError", "");
            }}
          />
        </span>
      );
    });
  };
  render() {
    if (this.state.loader) {
      return <div />;
    } else {
      return (
        <div>
          <div className="input-spacing-radio">
            <div className="form-label" id="id">
              You identify yourself as
            </div>
            <div className="subcomponent-spacing">
              <div className={this.state.idVisiblityError}>
                {this.renderCheckBox()}
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <input
              id="linkedin"
              style={{ color: this.state.linkdinLinkColor, width: "85%" }}
              value={this.state.linkdinLink}
              className={
                this.state.linkdinLinkClass ? "Error-input" : "simple-input"
              }
              placeholder="Paste your linkedin profile link"
              onChange={e => {
                this.setStateMethod("linkdinLink", e.target.value);
                if (validateUrl(e.target.value)) {
                  this.setStateMethod("linkdinLinkColor", "#0d65d8");
                  this.setStateMethod("linkVisiblityError", "hidden");
                } else {
                  this.setStateMethod(
                    "linkdinErrorMessage",
                    "Please enter valid URL"
                  );
                  this.setStateMethod("linkdinLinkColor", "#030303");
                }
              }}
            />
            <div style={{ height: "40px" }}>
              {/* <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="tooltip-image" />
              </OverlayTrigger> */}
            </div>
          </div>
          <div style={{ marginBottom: "35px" }}>
            <div
              style={{ visibility: this.state.linkVisiblityError }}
              className="display-error"
            >
              Please Enter Valid I'D
            </div>
          </div>
          <div className="input-spacing" id="workExperience">
            <input
              onKeyPress={e => numberOnly(e)}
              value={this.state.workExperience}
              className={
                this.state.workExperienceClass ? "Error-input" : "simple-input"
              }
              placeholder="Total work experience (in years)?"
              onChange={e =>
                this.setStateMethod("workExperience", e.target.value)
              }
            />
          </div>
          <div className="input-spacing-radio">
            <div className="form-label">You are here for?</div>
            <div className="subcomponent-spacing" id="jobTiming">
              <div className={this.state.jobTimingError}>
                <RadioBoxComp
                  defaultValue={this.state.jobTiming}
                  radioList={["Part time", "Full time"]}
                  onclick={e => {
                    this.setStateMethod("jobTiming", e);
                    this.setStateMethod("jobTimingError", "");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="input-spacing" style={{ display: "flex" }}>
            <input
              id="availability"
              onKeyPress={e => numberOnly(e)}
              style={{ width: "85%" }}
              value={this.state.availability}
              className={
                this.state.availabilityClass ? "Error-input" : "simple-input"
              }
              placeholder="Your availability in hours/week?"
              onChange={e =>
                this.setStateMethod("availability", e.target.value)
              }
            />
            <div style={{ height: "40px" }}>
              {/* <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="tooltip-image" />
              </OverlayTrigger> */}
            </div>
          </div>
          <button className={this.renderClass()} onClick={() => this.goTo()}>
            <span className="button-title">
              <span>NEXT</span>
              <span>
                <img src={require("../Images/arrow-down.svg")} />
              </span>
            </span>
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserData: url => {
      dispatch(getAboutUserData(url));
    },
    userAddUpdate: (method, url, _apidata, _apigeturl, getDesignerUrl) => {
      dispatch(
        setUserAddUpdate(method, url, _apidata, _apigeturl, getDesignerUrl)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUser);
