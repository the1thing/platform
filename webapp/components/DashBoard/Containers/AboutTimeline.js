import React, { Component } from "react";
import "../Styles/AboutTimeline.css";
import {
  Row,
  Col,
  MenuItem,
  DropdownButton,
  FormGroup,
  Checkbox
} from "react-bootstrap";
import { Selection, SelectMultiple } from "../Components/Selection";
import { basepath } from "../utils/constant";
import axios from "axios";
import RadioBoxComp from "../Components/RadioBoxComp";
import { validateUrl, numberOnly } from "../utils/Methods";
import {
  getAboutTimelineData,
  setTimelineAddUpdate
} from "../Actions/AsyncActions";
import { isEmpty } from "../utils/Methods";
import { connect } from "react-redux";

class AboutTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      timeline: "",
      budgetRange: "",
      timeClass: false,
      timelineClass: false,
      budgetRangeClass: false,
      defaultRange: "",
      timeList: ["In a Week", "In 2 Week", "In a Month", "Later"],
      timeLineList: [
        "Immediate",
        "4 Weeks",
        "6 Weeks",
        "8 Weeks",
        "12 Weeks",
        "Long term"
      ],
      radioImageClass: "",
      containerClass: "radio-container",
      radioCircle: "radio-circle",
      radioText: "radio-text",
      defaultValue: "",
      loading: false,
      edit: true
    };
  }
  componentWillMount = () => {
    this.getTimeLineData();
  };

  componentWillReceiveProps(nextProps) {
    let temp = nextProps.timelineState.aboutTimeline;
    if (typeof temp.userProposal !== "undefined") {
      this.setState({
        time: temp.userProposal.startTime,
        timeline: temp.userProposal.timeline
      });
      if (
        temp.userProposal.budgetRange == "Later" ||
        temp.userProposal.budgetRange == "I'm here for top quality"
      ) {
        this.setState({
          defaultValue: temp.userProposal.budgetRange,
          budgetRange: temp.userProposal.budgetRange
        });
      } else {
        this.setState({
          defaultRange: temp.userProposal.budgetRange
        });
      }
    }
  }

  getTimeLineData = () => {
    let url =
      basepath +
      "project/getProjectByIds/" +
      this.props.timelineState.allProjectWorkspace._id +
      "?stage=3";
    this.props.getTimelineData(url);
  };

  setStateMethod = (label, value) => {
    this.setState({
      [label]: value,
      edit: false
    });
  };

  createRadio = label => {
    return (
      <Checkbox
        inline
        onChange={e => {
          this.setStateMethod("budgetRange", label);
          this.setStateMethod("defaultRange", "");
        }}
      >
        <span style={{ color: "#7f7f7f" }}>{label}</span>
      </Checkbox>
    );
  };
  dropdownList = (title, field, comClass, list) => {
    return (
      <div className="input-spacing">
        <Selection
          error={comClass}
          placeholder={title}
          optionList={list}
          onclick={(value, key) => {
            this.setState({
              [field]: value
            });
          }}
        />
      </div>
    );
  };
  renderClass = () => {
    if (
      this.state.time &&
      this.state.timeline &&
      (this.state.budgetRange || this.state.defaultRange)
    ) {
      return "Rectangle-4";
    } else {
      return "button-block-class";
    }
  };

  goTo = () => {
    if (!this.state.time) {
      document.getElementById("time").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("timeClass", true);
    } else if (!this.state.timeline) {
      document.getElementById("timeline").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("timelineClass", true);
    } else if (!this.state.budgetRange) {
      document.getElementById("budgetRange").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("budgetRangeClass", true);
    } else {
      let url = basepath + "project/updateTimelineForWorkspace";
      let method = "put";
      let _apidata = {
        startTime: this.state.time,
        timeline: this.state.timeline,
        budgetRange: this.state.budgetRange,
        projectId: this.props.timelineState.allProjectWorkspace._id
      };
      let _apigeturl =
        basepath +
        "project/getProjectByIds/" +
        this.props.timelineState.allProjectWorkspace._id +
        "?stage=3";
      let getUserApi =
        basepath +
        "project/getAllProjectsForWorkspace/" +
        this.props.timelineState.userTypeInfo._id;

      this.props.history.push("/proposal");
      this.props.TimelineAddUpdate(
        method,
        url,
        _apidata,
        _apigeturl,
        getUserApi
      );
    }
  };
  renderRadioClass = value => {
    if (value == this.state.defaultValue) {
      return "checked-radio-container";
    } else {
      return "radio-container";
    }
  };
  renderRadioCircleClass = value => {
    if (value == this.state.defaultValue) {
      return "checked-radio-circle";
    } else {
      return "radio-circle";
    }
  };
  renderRadioTextClass = value => {
    if (value == this.state.defaultValue) {
      return "checked-radio-text";
    } else {
      return "radio-text";
    }
  };
  handleRadioClick = value => {
    this.setStateMethod("defaultValue", "");
    this.setState({
      budgetRangeClass: false,
      defaultValue: value,
      budgetRange: value,
      defaultRange: ""
    });
  };

  render() {
    return (
      <div>
        <div className="input-spacing" id="time">
          <Selection
            defaultValue={this.state.time}
            value={this.state.time}
            placeholder="Expected start time"
            optionList={this.state.timeList}
            error={this.state.timeClass}
            onclick={(value, key) => {
              this.setState({
                time: value,
                edit: false
              });
            }}
          />
        </div>

        <div className="input-spacing" id="timeline">
          <Selection
            defaultValue={this.state.timeline}
            value={this.state.timeline}
            placeholder="Expected Timeline"
            optionList={this.state.timeLineList}
            error={this.state.timelineClass}
            onclick={(value, key) => {
              this.setState({ timeline: value, edit: false });
            }}
          />
        </div>

        <div className="input-spacing">
          <div className="form-label">Budget Range</div>
          <div
            className="subcomponent-spacing"
            style={{ display: "flex", alignItems: "baseline" }}
            className="identify-yourself"
          >
            <div style={{ width: "11%" }} id="budgetRange">
              <Selection
                defaultValue="INR"
                optionList={["INR", "$"]}
                onclick={(value, key) => {}}
              />
            </div>
            <div style={{ width: "21%" }}>
              <input
                onKeyPress={e => {
                  numberOnly(e);
                }}
                value={this.state.defaultRange}
                className={
                  this.state.budgetRangeClass ? "Error-input" : "simple-input"
                }
                placeholder="Enter Budget"
                onKeyPress={event => {
                  if (!(event.charCode >= 48 && event.charCode <= 57)) {
                    event.preventDefault();
                  }
                }}
                onChange={e => {
                  this.setStateMethod("defaultRange", e.target.value);
                  this.setStateMethod("budgetRange", e.target.value);
                  this.setStateMethod("radioImageClass", "radio-image");
                  this.setStateMethod("defaultValue", "");
                }}
              />
            </div>
            <div
              style={{ marginLeft: "1%" }}
              className={this.state.radioImageClass}
            >
              <div
                className="radio-group-container"
                style={{ display: "flex", height: "48px" }}
              >
                <div
                  className={this.renderRadioClass("Later")}
                  onClick={e => {
                    this.handleRadioClick("Later");
                  }}
                >
                  <div className={this.renderRadioCircleClass("Later")} />
                  <div className={this.renderRadioTextClass("Later")}>
                    Later
                  </div>
                </div>
                <div>
                  <span className="or-copy">or</span>
                </div>
                <div
                  className={this.renderRadioClass("I'm here for top quality")}
                  onClick={e => {
                    this.handleRadioClick("I'm here for top quality");
                  }}
                >
                  <div
                    className={this.renderRadioCircleClass(
                      "I'm here for top quality"
                    )}
                  />
                  <div
                    className={this.renderRadioTextClass(
                      "I'm here for top quality"
                    )}
                  >
                    "I'm here for top quality"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={this.state.edit}
          className={this.renderClass()}
          onClick={() => this.goTo()}
        >
          <span className="button-title">
            <span>DONE</span>
            <span>
              <img src={require("../Images/arrow-right.svg")} />
            </span>
          </span>
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    timelineState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTimelineData: url => {
      dispatch(getAboutTimelineData(url));
    },
    TimelineAddUpdate: (method, url, _apidata, _apigeturl, getUserApi) => {
      dispatch(
        setTimelineAddUpdate(method, url, _apidata, _apigeturl, getUserApi)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutTimeline);
