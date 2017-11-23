import React, { Component } from "react";
import "../Styles/RatingUserself.scss";
import { FormGroup, Checkbox, Row, Col } from "react-bootstrap";
import RadioBoxCom from "../Components/RadioBoxComp";
import axios from "axios";
import { basepath } from "../utils/constant";
let myStringList = [
  "Quality of design",
  "Ability to use tools",
  "Communication Skills",
  "Project management",
  "Working in a team",
  "Leading a design team"
];
import { isEmpty } from "../utils/Methods";
import { connect } from "react-redux";
import {
  setRatingAddUpdate,
  getAboutRatingData
} from "../Actions/AsyncActions";

let myList = [];
let CreateRadio = props => {
  return (
    <Checkbox inline>
      <span>{props.label}</span>
    </Checkbox>
  );
};
let i = 1;

class RatingUserself extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designQuality: "",
      useToolQuality: "",
      commSkills: "",
      proManagement: "",
      teamWorking: "",
      leadingTeam: "",
      loading: false,
      error: ["", "", "", "", "", ""],
      designQualityError: ""
    };
  }
  componentWillMount = () => {
    let userId = this.props.ratingState.allProjectWorkspace._id;
    if (userId !== "" && userId !== "undefined" && userId !== undefined) {
      let url =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.ratingState.allProjectWorkspace._id +
        "?stage=4";
      this.props.getRatingData(url);
    }
  };

  componentWillReceiveProps(nextProps) {
    let temp = nextProps.ratingState.userRating;
    if (temp.rating !== "undefined" && temp.rating !== undefined) {
      this.setState({
        designQuality: temp.about1thing,
        useToolQuality: temp.rating.tools,
        commSkills: temp.rating.communication,
        proManagement: temp.rating.projectManagement,
        teamWorking: temp.rating.workingWithTeam,
        leadingTeam: temp.rating.teamLead
      });
    }
  }
  putRatingUserSelf = () => {
    let method = "put";
    let url = basepath + "designer/ratingYourselfFromWorkspace";
    let data = {
      designerId: this.props.ratingState.allProjectWorkspace._id,
      about1thing: this.state.designQuality,
      rating: {
        design: this.state.designQuality,
        tools: this.state.useToolQuality,
        communication: this.state.commSkills,
        projectManagement: this.state.proManagement,
        workingWithTeam: this.state.teamWorking,
        teamLead: this.state.leadingTeam
      }
    };
    let getDesignerUrl =
      basepath +
      "designer/getDesignerDetailsByStage/" +
      this.props.ratingState.allProjectWorkspace._id +
      "?stage=1";
    let userId = this.props.ratingState.allProjectWorkspace._id;
    if (userId !== "" || userId !== "undefined" || userId !== undefined) {
      let _apiurl =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.ratingState.allProjectWorkspace._id +
        "?stage=4";
      this.props.history.push("/assignment");
      this.props.ratingAddUpdate(method, url, data, _apiurl, getDesignerUrl);
    }
  };

  renderClass = () => {
    if (
      this.state.designQuality &&
      this.state.useToolQuality &&
      this.state.commSkills &&
      this.state.proManagement &&
      this.state.teamWorking &&
      this.state.leadingTeam &&
      this.state.leadingTeam
    ) {
      return "Rectangle-4";
    } else {
      return "button-block-class";
    }
  };
  renderMyList = no => {
    return (
      <div key={no} style={{ overflow: "hidden" }} id={no}>
        <Row>
          <div className="input-spacing-radio" style={{ overflow: "auto" }}>
            <Col md={1} className="form-label">
              {no}.
            </Col>
            <Col md={11}>
              <div className="form-label">{myStringList[no]}</div>
            </Col>
            <Col md={11} mdOffset={1}>
              <div className="subcomponent-spacing">
                <div className={this.state.error[no]}>
                  <RadioBoxCom
                    defaultValue={this.renderDefaultValue(no)}
                    radioList={[
                      "10 on 10",
                      "9 on 10",
                      "8 on 10",
                      "Less than 8"
                    ]}
                    onclick={value => {
                      this.handleRadioClick(value, no);
                    }}
                  />
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    );
  };
  renderDefaultValue = no => {
    switch (no) {
      case "1":
        return this.state.useToolQuality;
        break;
      case "2":
        return this.state.commSkills;
        break;
      case "3":
        return this.state.proManagement;
        break;
      case "4":
        return this.state.teamWorking;
        break;
      case "5":
        return this.state.leadingTeam;
    }
  };
  handleRadioClick = (value, no) => {
    switch (no) {
      case "1":
        {
          let temp = this.state.error;
          temp[1] = "";
          this.setState({
            useToolQuality: value,
            error: temp
          });
        }
        break;
      case "2":
        {
          let temp = this.state.error;
          temp[2] = "";
          this.setState({
            commSkills: value,
            error: temp
          });
        }
        break;
      case "3":
        {
          let temp = this.state.error;
          temp[3] = "";
          this.setState({
            proManagement: value,
            error: temp
          });
        }
        break;
      case "4":
        {
          let temp = this.state.error;
          temp[4] = "";
          this.setState({
            teamWorking: value,
            error: temp
          });
        }
        break;
      case "5": {
        let temp = this.state.error;
        temp[5] = "";
        this.setState({
          leadingTeam: value,
          error: temp
        });
      }
    }
  };
  goTo = () => {
    if (this.state.useToolQuality == "") {
      let temp = this.state.error;
      temp[1] = "radio-error";
      document.getElementById("1").scrollIntoView();
      this.setState({
        error: temp
      });
    } else if (this.state.commSkills == "") {
      let temp = this.state.error;
      temp[2] = "radio-error";
      document.getElementById("2").scrollIntoView();
      this.setState({
        error: temp
      });
    } else if (this.state.proManagement == "") {
      let temp = this.state.error;
      temp[3] = "radio-error";
      document.getElementById("3").scrollIntoView();
      this.setState({
        error: temp
      });
    } else if (this.state.teamWorking == "") {
      let temp = this.state.error;
      temp[4] = "radio-error";
      document.getElementById("4").scrollIntoView();
      this.setState({
        error: temp
      });
    } else if (this.state.leadingTeam == "") {
      let temp = this.state.error;
      temp[5] = "radio-error";
      document.getElementById("5").scrollIntoView();
      this.setState({
        error: temp
      });
    } else if (this.state.designQuality == "") {
      document.getElementById("designQuality").scrollIntoView();
      this.setState({
        designQualityError: "radio-error"
      });
    } else {
      this.putRatingUserSelf();
    }
  };
  render() {
    if (this.state.loading) {
      return <div />;
    } else
      return (
        <div>
          <div className="input-spacing-radio">
            <div className="form-label">
              Please rate yourself for each of the following attributes
            </div>
          </div>
          <div style={{ marginBottom: "56px" }}>
            {this.renderMyList("1")}
            {this.renderMyList("2")}
            {this.renderMyList("3")}
            {this.renderMyList("4")}
            {this.renderMyList("5")}
          </div>
          <div style={{ overflow: "hidden" }} className="input-spacing">
            <Row>
              <Col md={1} className="form-label">
                <img src={require("../Images/1-thing-fevikon.svg")} />
              </Col>
              <Col md={11}>
                <div className="form-label">
                  How did you learn about 1THING?
                </div>
              </Col>
              <Col md={11} mdOffset={1} id="designQuality">
                <div className="subcomponent-spacing">
                  <div className={this.state.designQualityError}>
                    <RadioBoxCom
                      defaultValue={this.state.designQuality}
                      radioList={[
                        "Instagram",
                        "Twitter",
                        "Google Search",
                        "Friends",
                        "Monochrome",
                        "Other"
                      ]}
                      onclick={value => {
                        this.setState({
                          designQuality: value,
                          designQualityError: ""
                        });
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <button
            className={this.renderClass()}
            onClick={() => {
              this.goTo();
            }}
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
    ratingState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRatingData: url => {
      dispatch(getAboutRatingData(url));
    },
    ratingAddUpdate: (method, url, _apidata, _apigeturl, getDesignerUrl) => {
      dispatch(
        setRatingAddUpdate(method, url, _apidata, _apigeturl, getDesignerUrl)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingUserself);
