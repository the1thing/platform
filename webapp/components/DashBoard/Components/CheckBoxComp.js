import React, { Component } from "react";
import { Checkbox } from "react-bootstrap";

export default class CheckBoxComp extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }
  handleCheckBox = (event, label) => {
    this.props.checkboxOnClick(label);
    this.setState({
      toggle: !this.state.toggle
    });
  };
  render() {
    return (
      <Checkbox
        inline
        checked={this.props.isChecked}
        className={
          this.props.toggle ? "checkbox-bordered" : "checkbox-unbordered"
        }
        onClick={event => {
          this.handleCheckBox(event, this.props.label);
        }}
      >
        <span style={{ marginLeft: "3px" }}>{this.props.label}</span>
      </Checkbox>
    );
  }
}
