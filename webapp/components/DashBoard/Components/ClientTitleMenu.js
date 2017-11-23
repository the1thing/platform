import React, { Component } from "react";
import "../Styles/TitleMenu.scss";

export default class ClientTitleMenu extends Component {
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
      vis_requirement: "block",
      vis_proposal: "none",
      vis_design: "none",
      vis_feedback: "none",
      selected_menu: this.props.title,
      requirementColor: "",
      proposalColor: "",
      designColor: "",
      feedbackColor: "",
      loader: true
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
        vis_requirement: "block",
        vis_proposal: "block",
        vis_design: "block",
        vis_feedback: "block"
      });
    } else {
      this.selectMenu(this.state.selected_menu);
    }
  };
  selectMenu = menu_list => {
    if (menu_list == "requirement") {
      this.props.pushPropsRequire();
      this.setState({
        requirementColor: "ffbc00",
        proposalColor: "",
        designColor: "",
        feedbackColor: "",
        vis_requirement: "block",
        vis_proposal: "none",
        vis_design: "none",
        vis_feedback: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "proposal") {
      this.props.pushPropsProposal();
      this.setState({
        proposalColor: "#118bf3",
        requirementColor: "",
        designColor: "",
        feedbackColor: "",
        vis_requirement: "none",
        vis_proposal: "block",
        vis_design: "none",
        vis_feedback: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "design") {
      this.props.pushPropsDesign();
      this.setState({
        proposalColor: "",
        requirementColor: "",
        designColor: "#36cb3b",
        feedbackColor: "",
        vis_requirement: "none",
        vis_proposal: "none",
        vis_design: "block",
        vis_feedback: "none",
        selected_menu: menu_list,
        menu_class: "menu-image"
      });
    } else if (menu_list == "feedback") {
      this.props.pushPropsFeeddback();
      this.setState({
        proposalColor: "",
        requirementColor: "",
        designColor: "",
        feedbackColor: "#7560fd",
        vis_requirement: "none",
        vis_proposal: "none",
        vis_design: "none",
        vis_feedback: "block",
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
          onClick={() => this.selectMenu("requirement")}
          className={
            this.state.selected_menu == "requirement"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_requirement,
            textTransform: "uppercase",
            color: this.state.requirementColor
          }}
        >
          REQUIREMENTS
        </span>
        <span
          onClick={() => this.selectMenu("proposal")}
          className={
            this.state.selected_menu == "proposal"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_proposal,
            color: this.state.proposalColor
          }}
        >
          Right Design Team
        </span>
        <span
          onClick={() => this.selectMenu("design")}
          className={
            this.state.selected_menu == "design"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_design,
            color: this.state.designColor
          }}
        >
          Design Journey
        </span>
        <span
          onClick={() => this.selectMenu("feedback")}
          className={
            this.state.selected_menu == "feedback"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_feedback,
            color: this.state.feedbackColor
          }}
        >
          Support
        </span>
        <span
          onClick={() => this.selectMenu("feedback")}
          className={
            this.state.selected_menu == "feedback"
              ? "selected_menu_class"
              : "unselected_menu"
          }
          style={{
            display: this.state.vis_feedback,
            color: this.state.feedbackColor
          }}
        >
          Analysis
        </span>
      </div>
    );
  }
}
