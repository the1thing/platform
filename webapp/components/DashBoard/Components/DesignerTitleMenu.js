import React, { Component } from "react";
import "../Styles/TitleMenu.scss";

export default class DisignerTitleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_hover_class_requirements: "",
      menu_hover_class_design: "",
      menu_hover_class_analysis: "",
      menu_hover_class_feedback: "",
      menu_requirements_visiblity: "visible",
      menu_design_visiblity: "hidden",
      menu_analysis_visiblity: "hidden",
      menu_feedback_visiblity: "hidden",
      requirement_width: "24px",
      design_width: "8px",
      analysis_width: "8px",
      feedback_width: "8px",
      menu_title_visiblity: "block",
      menu_list: "none",

      menu_class: "menu-image",
      vis_onboarding: "block",
      vis_assignment: "none",
      vis_pricing: "none",
      vis_wel_aboard: "none",
      selected_menu: this.props.title,
      onboardingColor: "",
      assignmentColor: "",
      princingColor: "",
      abroadColor: ""
    };
  }
  componentWillMount() {
    this.selectMenu(this.state.selected_menu);
  }
  openMenuList = e => {
    this.state.menu_class =
      this.state.menu_class == "menu-image" ? "cross_menu_img" : "menu-image";
    this.setState({
      menu_class: this.state.menu_class
    });
    if (this.state.menu_class == "cross_menu_img") {
      this.setState({
        vis_onboarding: "block",
        vis_assignment: "block",
        vis_pricing: "block",
        vis_wel_aboard: "block"
      });
    } else {
      this.selectMenu(this.state.selected_menu);
    }
  };
  selectMenu = menu_list => {
    if (menu_list == "onboarding") {
      this.props.pushPropsOnboarding();
      this.setState({
        onboardingColor: "#ffbc00",
        assignmentColor: "",
        princingColor: "",
        abroadColor: "",
        vis_onboarding: "block",
        vis_assignment: "none",
        vis_pricing: "none",
        vis_wel_aboard: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "assignment") {
      this.props.pushPropsAssignment();
      this.setState({
        onboardingColor: "",
        assignmentColor: "#118bf3",
        princingColor: "",
        abroadColor: "",
        vis_onboarding: "none",
        vis_assignment: "block",
        vis_pricing: "none",
        vis_wel_aboard: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "pricing") {
      this.props.pushPropsPricing();
      this.setState({
        onboardingColor: "",
        assignmentColor: "",
        princingColor: "#36cb3b",
        abroadColor: "",
        vis_onboarding: "none",
        vis_assignment: "none",
        vis_pricing: "block",
        vis_wel_aboard: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "aboard") {
      this.props.pushPropsAboard();
      this.setState({
        onboardingColor: "",
        assignmentColor: "",
        princingColor: "",
        abroadColor: "#7560fd",
        vis_onboarding: "none",
        vis_assignment: "none",
        vis_pricing: "none",
        vis_wel_aboard: "block",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    }
  };
  render() {
    return (
      <div style={{ display: "flex", cursor: "pointer" }}>
        <span
          className={this.state.menu_class}
          onClick={this.openMenuList}
        />
        <span
          onClick={() => this.selectMenu("onboarding")}
          className={
            this.state.selected_menu == "onboarding"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_onboarding,
            textTransform: "uppercase",
            color: this.state.onboardingColor
          }}
        >
          ONBOARDING
        </span>
        <span
          onClick={() => this.selectMenu("assignment")}
          className={
            this.state.selected_menu == "assignment"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_assignment,
            color: this.state.assignmentColor
          }}
        >
          ASSIGNMENT
        </span>
        <span
          onClick={() => this.selectMenu("pricing")}
          className={
            this.state.selected_menu == "pricing"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_pricing,
            color: this.state.princingColor
          }}
        >
          PRICING & BANDWIDTH
        </span>
        <span
          onClick={() => this.selectMenu("aboard")}
          className={
            this.state.selected_menu == "aboard"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_wel_aboard,
            color: this.state.abroadColor
          }}
        >
          WELCOME ABOARD
        </span>
      </div>
    );
  }
}
