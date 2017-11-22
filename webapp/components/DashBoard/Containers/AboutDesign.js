import React, { Component } from "react";
import "../Styles/AboutDesign.css";
import { Row, Col, MenuItem, DropdownButton } from "react-bootstrap";
import { Selection, SelectMultiple } from "../Components/Selection";
import { AddLink } from "../Components/AddLink";
import axios from "axios";
import { basepath } from "../utils/constant";
import { validateUrl } from "../utils/Methods";
import {
  getAboutDesignData,
  setDesignAddUpdate
} from "../Actions/AsyncActions";
import { isEmpty } from "../utils/Methods";
import { connect } from "react-redux";

let DropdownList = props => {
  return (
    <div className="input-spacing">
      <Selection
        placeholder={props.placeholder}
        error={props.className}
        optionList={props.list}
        onclick={props.onChange}
      />
    </div>
  );
};

class AboutDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      services: "b",
      objective: "",
      domains: "",
      addLink: [],
      document: "",
      platformClass: false,
      servicesClass: false,
      objectiveClass: false,
      linkClass: false,
      designList: ["a", "b"],
      objectiveList: [
        "New platform",
        "Improve conversions",
        "Improve engagement",
        "Improve retention",
        "Improve overall experience",
        "Improve aesthetics"
      ],
      platformList: [
        "Web app",
        "Responsive web",
        "Android app",
        "IOS app",
        "Desktop App (W)",
        "Desktop App (Mac)",
        "Android wearable",
        "Apple Watch",
        "AR/VR"
      ],
      loading: false,
      edit: true,
      projectId: "",
      documentErrorVisiblity: false
    };
  }
  componentWillMount = () => {
    this.getAboutDesignData();
  };
  componentWillReceiveProps(nextProps) {
    let temp = nextProps.designState.aboutDesign;
    if (typeof temp.userProposal !== "undefined") {
      this.setState({
        platforms: temp.platform != null ? temp.platform : [],
        services: "services",
        objective: temp.userProposal.designObjective,
        addLink:
          temp.userProposal.referenceLink != null
            ? temp.userProposal.referenceLink
            : []
      });
    }
  }
  getAboutDesignData = () => {
    if (this.props.designState.allProjectWorkspace._id !== "") {
      let url =
        basepath +
        "project/getProjectByIds/" +
        this.props.designState.allProjectWorkspace._id +
        "?stage=2";
      this.props.getDesignData(url);
    }
  };

  renderClass = () => {
    if (
      this.state.platforms.length > 0 &&
      this.state.services &&
      this.state.objective &&
      (this.state.document || this.state.addLink.length > 0)
    ) {
      return "Rectangle-4";
    } else {
      return "button-block-class";
    }
  };
  setStateMethod = (label, value) => {
    this.setState({
      [label]: value,
      edit: false
    });
  };
  goTo = () => {
    if (this.state.platforms.length == 0) {
      document.getElementById("platforms").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("platformClass", true);
    } else if (!this.state.services) {
      document.getElementById("services").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("servicesClass", true);
    } else if (!this.state.objective) {
      document.getElementById("objective").scrollIntoView();
      window.scrollBy(0, -100);
      this.setStateMethod("objectiveClass", true);
    } else if (!this.state.addLink[0]) {
      if (!this.state.document) {
        this.setStateMethod("linkClass", true);
        document.getElementById("addLink").scrollIntoView();
        window.scrollBy(0, -100);
      } else {
        if (validateUrl(this.state.document)) {
          this.state.addLink.push(this.state.document);
          this.postAboutDesignData();
        } else {
          this.setStateMethod("documentErrorVisiblity", true);
          document.getElementById("addLink").scrollIntoView();
          window.scrollBy(0, -100);
        }
      }
    } else {
      if (this.state.document) {
        if (validateUrl(this.state.document)) {
          this.state.addLink.push(this.state.document);
          this.postAboutDesignData();
        } else {
          this.setStateMethod("documentErrorVisiblity", true);
          document.getElementById("addLink").scrollIntoView();
          window.scrollBy(0, -100);
        }
      } else {
        this.postAboutDesignData();
      }
    }
  };
  postAboutDesignData = link_list => {
    let method = "put";
    let url = basepath + "project/updateProjectFromWorkspace";
    let _apidata = {
      platform: this.state.platforms,
      designServices: this.state.services,
      designObjective: this.state.objective,
      referenceLink: this.state.addLink,
      projectId: this.props.designState.allProjectWorkspace._id
    };
    let getUserApi =
      basepath +
      "project/getAllProjectsForWorkspace/" +
      this.props.designState.userTypeInfo._id;

    let _apigeturl =
      basepath +
      "project/getProjectByIds/" +
      this.props.designState.allProjectWorkspace._id +
      "?stage=2";
    this.props.productAddUpdate(method, url, _apidata, _apigeturl, getUserApi);
  };

  render() {
    return (
      <div>
        {console.log("design-------->", this.props.productState)}
        <div className="input-spacing platform-selection" id="platforms">
          {/********************* Select Multiple *****  */}

          <SelectMultiple
            width="100%"
            placeholder="Product Platforms"
            handleRemoval={list => {
              this.setStateMethod("edit", false);
              this.setStateMethod("platforms", list);
            }}
            defaultValue={this.state.platforms}
            optionList={this.state.platformList}
            error={this.state.platformClass}
            onclick={(value, key) => {
              let platform = [];
              platform = this.state.platforms;
              platform = platform.concat(value);
              this.setStateMethod("platforms", platform);
              this.setStateMethod("edit", false);
            }}
          />
        </div>
        {/* ***************** selection dsign service  ***** */}
        <div
          style={{ display: "none" }}
          className="input-spacing"
          id="services"
        >
          <Selection
            defaultValue={this.state.services}
            value={this.state.services}
            onChange={e => {
              this.handleButtonClick(e);
            }}
            placeholder="Design Services"
            optionList={this.state.designList}
            error={this.state.servicesClass}
            onclick={(value, key) => {
              this.setState({
                edit: false,
                services: value
              });
            }}
          />
        </div>
        {/* ***************** selection Design Objective  ***** */}
        <div className="input-spacing" id="objective">
          <Selection
            defaultValue={this.state.objective}
            value={this.state.objective}
            // onChange={(e) => { this.handleButtonClick(e) }}
            placeholder="Design Objective"
            optionList={this.state.objectiveList}
            error={this.state.objectiveClass}
            onclick={(value, key) => {
              this.setState({
                edit: false,
                objective: value
              });
            }}
          />
        </div>
        {/* <AddLink
                
                error={this.state.scopeDocumentClass}
                placeholder="Link(s) to scope document, if any"
                onclick={(e) => {
                    
                    this.setStateMethod('document', e.target.value)
                }}
                addAnotherLink={(e) => {
                    let list = this.state.scopeDocument;
                    list = list.concat(this.state.document);
                    this.setStateMethod('scopeDocument', list)
                    this.setStateMethod('document', '')
                    this.setStateMethod('scopeDocumentClass', false)
                }} /> */}
        <AddLink
          id="addLink"
          defaultValue={this.state.addLink}
          error={this.state.linkClass}
          errorLink={this.state.documentErrorVisiblity}
          placeholder="Link to a site or an app you like"
          onclick={e => {
            this.setState({ document: e.target.value });
            //if(validateUrl(e.target.value)){
            this.setState({
              edit: false,
              documentErrorVisiblity: false
            });
            // }
            // else{
            //     this.setState({
            //         edit:true,
            //     })
            // }
          }}
          addAnotherLink={e => {
            let list = this.state.addLink;
            list = list.concat(this.state.document);
            this.setStateMethod("addLink", list);
            this.setStateMethod("document", "");
            this.setStateMethod("linkClass", false);
          }}
        />

        <button
          disabled={this.state.edit}
          onClick={() => this.goTo()}
          className={this.renderClass()}
        >
          <span className="button-title">
            <span>SAVE</span>
            <span>
              <img src={require("../Images/arrow-down.svg")} />
            </span>
          </span>

          {/* <span className="button-title">DONE<span style={{marginLeft:'42px'}}><img  width='18px'height='16px' src={require('../Images/invalid-name.png')}/>  </span></span> */}
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    designState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDesignData: url => {
      dispatch(getAboutDesignData(url));
    },
    productAddUpdate: (method, url, _apidata, _apigeturl, getUserApi) => {
      dispatch(
        setDesignAddUpdate(method, url, _apidata, _apigeturl, getUserApi)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutDesign);
