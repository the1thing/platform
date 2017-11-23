import React, { Component } from "react";
import {
  FormGroup,
  Checkbox,
  Row,
  Col,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import { Selection, SelectContent } from "../Components/Selection";
import { AddButton } from "../Components/AddLink";
import CheckBoxComp from "../Components/CheckBoxComp";
import RadioBoxComp from "../Components/RadioBoxComp";
import { getCheckBoxValue } from "../utils/Methods";
import { basepath } from "../utils/constant";
import "../Styles/UserExperties.scss";
import axios from "axios";
import { isEmpty } from "../utils/Methods";
import { connect } from "react-redux";
import {
  setExpertiseAddUpdate,
  getAboutExpertiseData
} from "../Actions/AsyncActions";

let count = 0;

class UserExperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      domains: [],
      domain: "",
      content: "",
      selectionList: [],
      domainsClass: false,
      platformsVisiblityError: "",
      checkboxList: [
        "Web App",
        "Android App",
        "iOS App",
        "Responsive Web",
        "Windows App",
        "Mac App",
        "Android wearable",
        "VR/AR",
        "Apple Watch"
      ],
      options: [
        "Ecommerce",
        "Social Network",
        "Payments",
        "News + Content",
        "IoT Analytics",
        "Chatbots",
        "OnDemand",
        "Marketplace",
        "Travel",
        "Edu-tech",
        "Food-tech",
        "Fin-tech",
        "VR/AR",
        "Health-tech",
        "AI powered",
        "Others"
      ],
      //*******************************************//
      domainArray: [{ name: "", info: "" }],
      loading: false,
      domainError: false
    };
  }
  renderClass = () => {
    if (
      this.state.platforms.length > 0 &&
      (this.state.domainArray[0].name != "" &&
        this.state.domainArray[0].info != "")
    ) {
      return "Rectangle-4";
    } else {
      return "button-block-class";
    }
  };
  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  componentWillMount = () => {
    let userId = this.props.expertiseState.allProjectWorkspace._id;
    if (userId !== "" && userId !== "undefined" && userId !== undefined) {
      let url =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.expertiseState.allProjectWorkspace._id +
        "?stage=2";
      this.props.getExpertiseData(url);
    }
  };

  componentWillReceiveProps(nextProps) {
    let temp = nextProps.expertiseState.userExpertise;
    if (temp.expertisePlatform !== "undefined" && temp.expertisePlatform !== undefined) {
      this.setState({
        platforms: temp.expertisePlatform,
        domainArray:
          temp == null || temp.expertiseDomain.length > 0
            ? temp.expertiseDomain
            : [{ name: "", info: "" }]
      });
    }
  }

  setStateMethod = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  renderSelectionList = () => {
    return this.state.domainArray.map((value, key) => {
      return (
        <div key={key}>
          <Row>
            <Col md={1}>
              <h4>{key + 1}.</h4>
            </Col>
            <Col md={11} style={{ marginTop: "-6px" }}>
              <Selection
                optionList={this.state.options}
                defaultValue={this.state.domainArray[key].name}
                onChange={e => {
                  this.handleButtonClick(e);
                }}
                placeholder="Select your preferred domain"
                error={this.state.productTypeClass}
                onclick={value => {
                  this.renderClass();
                  this.state.domainArray[key].name = value;
                  this.setState({
                    domainArray: this.state.domainArray,
                    domainError: false
                  });
                }}
              />
              <textarea
                rows={3}
                value={this.state.domainArray[key].info}
                className={"about-link-textares"}
                style={{ width: "100%" }}
                placeholder="Write all the modules in Social (if Social  is selected) you have worked upon. Ex - chronological feed about updates from friends/connections"
                onChange={event => {
                  this.state.domainArray[key].info = event.target.value;
                  this.setState({
                    domainArray: this.state.domainArray,
                    domainError: false
                  });
                  this.renderClass();
                }}
              />
            </Col>
          </Row>
        </div>
      );
    });
  };
  handleAddButton = e => {
    let len = this.state.domainArray.length;
    if (
      this.state.domainArray[len - 1].name != "" &&
      this.state.domainArray[len - 1].info != ""
    ) {
      this.state.domainArray.push({ name: "", info: "" });
      this.setState({ domainArray: this.state.domainArray });
    }
  };
  submitExpertise = () => {
    let len = this.state.domainArray.length;
    if (
      this.state.domainArray[len - 1].name == "" &&
      this.state.domainArray[len - 1].info == ""
    ) {
      this.state.domainArray.pop();
      this.setState({ domainArray: this.state.domainArray });
    }
    let method = "put";
    let url = basepath + "designer/addExpertigeForWorkspace";
    let data = {
      expertisePlatform: this.state.platforms,
      expertiseDomain: this.state.domainArray,
      designerId: this.props.expertiseState.allProjectWorkspace._id
    };
    let getDesignerUrl = 
      basepath +
      "designer/getDesignerDetailsByStage/" +
      this.props.expertiseState.allProjectWorkspace._id +
      "?stage=1";
    let userId = this.props.expertiseState.allProjectWorkspace._id;
    if (userId !== "" || userId !== "undefined" || userId !== undefined) {
      let _apiurl =
        basepath +
        "designer/getDesignerDetailsByStage/" +
        this.props.expertiseState.allProjectWorkspace._id +
        "?stage=2";
      this.props.expertiseAddUpdate(method, url, data, _apiurl, getDesignerUrl);
    }
  };
  goTo = () => {
    let len = this.state.domainArray.length;
    if (this.state.platforms.length == 0) {
      document.getElementById("platforms").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("platformsVisiblityError", "radio-error");
    } else if (this.state.domainArray[len - 1].name == "") {
      document.getElementById("domains").scrollIntoView();
      window.scrollBy(0, -100);
      this.setState({
        domainError: true
      });
    } else if (this.state.domainArray[len - 1].info == "") {
      window.scrollBy(0, -100);
      this.setState({
        domainError: true
      });
    } else {
      this.submitExpertise();
    }
  };
  setStateMethod = (label, value) => {
    this.setState({
      [label]: value
    });
  };
  renderCheckBox = () => {
    return this.state.checkboxList.map((value, key) => {
      return (
        <span key={key}>
          <CheckBoxComp
            label={value}
            isChecked={this.state.platforms.indexOf(value) >= 0}
            toggle={this.state.platforms.indexOf(value) >= 0}
            checkboxOnClick={e => {
              this.renderClass();
              this.setStateMethod(
                "platforms",
                getCheckBoxValue(e, this.state.platforms)
              );
              this.setStateMethod("platformsVisiblityError", "");
            }}
          />
        </span>
      );
    });
  };

  render() {
    if (this.state.loading) {
      return <div />;
    } else
      return (
        <div>
          <div className="input-spacing-radio">
            <div className="form-label" id="platforms">
              Select your preferred platforms
            </div>
            <div className="subcomponent-spacing">
              <div className={this.state.platformsVisiblityError}>
                {this.renderCheckBox()}
              </div>
            </div>
          </div>
          <div className="input-spacing selection-content">
            <div className="form-label" id="domains">
              Select domain you worked upon
            </div>
            <div>
              {this.renderSelectionList()}
              {
                <p
                  style={{ color: "#eb444c", marginLeft: "52px" }}
                  className="display-error"
                >
                  {this.state.domainError ? "Please Select All values" : ""}
                </p>
              }
            </div>
            {this.state.selectionList}
            <div>
              <Row>
                <Col md={1} style={{ padding: "0" }}>
                  <div style={{ paddingLeft: "16px" }}>
                    <div>
                      <AddButton
                        disabledClass={
                          this.state.domainArray[
                            this.state.domainArray.length - 1
                          ].name == "" ||
                          this.state.domainArray[
                            this.state.domainArray.length - 1
                          ].info == ""
                            ? true
                            : false
                        }
                        onclick={e => {
                          this.handleAddButton(e);
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  md={10}
                  style={{
                    padding: "0",
                    lineHeight: "40px",
                    paddingLeft: "16px"
                  }}
                >
                  <div className="add-button-content">
                    Select another preferred domain
                  </div>
                </Col>
              </Row>
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
function mapStateToProps(state) {
  return {
    expertiseState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getExpertiseData: url => {
      dispatch(getAboutExpertiseData(url));
    },
    expertiseAddUpdate: (method, url, _apidata, _apigeturl, getDesignerUrl) => {
      dispatch(
        setExpertiseAddUpdate(method, url, _apidata, _apigeturl, getDesignerUrl)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserExperties);
