import React, { Component } from "react";
import { validateUrl } from "../utils/Methods";
import "../Styles/AddLink.css";

export class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkList: [],
      buttonVisiblity: "hidden",
      linkreadonly: false,
      defaultInputValue: "",
      readOnlyValue: "",
      myList: [],
      btnDisability: true,
      linkColor: "#030303"
    };
  }
  componentWillMount = () => {
    if (this.props.defaultValue) {
      //this.props.addAnotherLink(e);
      this.props.defaultValue.map((value, key) => {
        let list = this.state.linkList;
        list = list.concat(
          <div className="subcomponent-spacing">
            <input className="simple-input" value={value} />
          </div>
        );
        this.setState({
          myList: this.props.defaultValue,
          linkList: list,
          buttonVisiblity: "hidden"
        });
      });
    }
  };
  // validateUrl = (checkLink) => {
  //     let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  //     let checkProduct = regex.test(checkLink);
  //     return checkProduct;
  // }
  renderLinkList = () => {
    return this.state.myList.map((v, k) => {
      return (
        <div key={k} className="subcomponent-spacing">
          <input
            readOnly
            style={{ color: " #0d65d8" }}
            className={this.props.error ? "Error-input" : "simple-input"}
            value={v}
          />
        </div>
      );
    });
  };
  handleButtonClick = e => {
    let list = this.state.myList;
    list = list.concat(e.target.value);
    if (validateUrl(e.target.value)) {
      this.setState({
        btnDisability: false,
        linkColor: "#0d65d8",
        error: false,
        buttonVisiblity: "visible",
        readOnlyValue: e.target.value,
        defaultInputValue: e.target.value
      });
    } else {
      this.setState({
        linkColor: "#030303",
        btnDisability: true,
        error: false,
        buttonVisiblity: "visible",
        readOnlyValue: e.target.value,
        defaultInputValue: e.target.value
      });
    }
    this.props.onclick(e, e.target.value);
  };
  addAnotherLink = e => {
    this.props.addAnotherLink(e);
    let list = this.state.myList;
    list = list.concat(this.state.readOnlyValue);
    this.setState({
      btnDisability: true,
      linkColor: "#030303",
      linkreadonly: true,
      linkList: list,
      defaultInputValue: "",
      myList: list,
      buttonVisiblity: "hidden"
    });
  };
  render() {
    return (
      <div id={this.props.id}>
        {this.renderLinkList()}
        <input
          style={{ color: this.state.linkColor, marginBottom: "8px" }}
          value={this.state.defaultInputValue}
          className={this.props.error ? "Error-input" : "simple-input"}
          placeholder="Link(s) to scope document, if any"
          onChange={e => {
            this.handleButtonClick(e);
          }}
        />
        <div
          style={{ display: this.props.errorLink ? 'block' : 'none' }}
          className="display-error"
        >
          Please identify yourself
        </div>

        <div className="input-spacing">
          <div
            style={{
              visibility: this.state.buttonVisiblity,
              cursor: "notAllowed"
            }}
          >
            <AddButtonLink
              checkDisable={this.state.btnDisability}
              onclick={e => {
                if (!this.state.btnDisability) {
                  this.addAnotherLink(e);
                }
              }}
              clearParentState={() => {
                this.props.clearDocument;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

// import React, { Component } from 'react'
export class AddButton extends Component {
  render() {
    return (
      <div
        className={
          this.props.disabledClass === true
            ? "add-button-disabled"
            : this.props.checkDisable ? "add-button-disabled" : "add-button"
        }
        onClick={e => {
          this.props.onclick(e);
        }}
      />
    );
  }
}

export class AddButtonLink extends Component {
  render() {
    return (
      <div
        className={
          this.props.disabledClass === true
            ? "add-button-disabled"
            : this.props.checkDisable ? "add-button-disabled" : "add-button"
        }
        onClick={e => {
          this.props.onclick(e);
          this.props.clearParentState();
        }}
      />
    );
  }
}
export class AddButtonDomain extends Component {
  render() {
    return (
      <div
        className={
          this.props.disabledClass === true
            ? "add-button-disabled"
            : "add-button"
        }
        onClick={this.props.onclick}
      />
    );
  }
}
