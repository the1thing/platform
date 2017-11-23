import React, { Component } from "react";
import { Row, Col, Grid } from "react-bootstrap";
import ReactDOM from "react-dom";
import axios from "axios";
import { basepath } from "./utils/constant";
import { returnDate } from "./utils/Methods";
import { getAboutDesignData, setDesignAddUpdate } from "./Actions/AsyncActions";
import { isEmpty } from "./utils/Methods";
import { connect } from "react-redux";

var final_view = "";

class ClientProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin_bu8_requirement: "margin_bu8_subpart",
      margin_bu8_proposal: "margin_bu8_subpart",
      margin_bu8_design: "margin_bu8_subpart",
      check_proposal_nextpart: false,
      check_design_nextpart: false,

      not_cross_aboutProduct: false,
      not_cross_aboutDesign: false,
      not_cross_aboutTimeline: false,
      not_cross_inProcess: false,
      not_cross_received: false,
      not_cross_approval: false,
      loading: false,
      requirement_class: "show_full_requirement",
      assigment_class: "show_info_proposal",
      requirement_var: ["aboutProduct", "aboutDesign", "aboutTimeline"],
      requirement_data: [
        "requirement",
        "About yourself",
        "Your Expertise",
        "Your perspective",
        "How you think"
      ],
      requirement: {
        completed: {
          value: false
        },
        dateOfCompletion: {
          value: ""
        },
        aboutProduct: {
          completed: false,
          completedDate: ""
        },
        aboutDesign: {
          completed: false,
          completedDate: ""
        },
        aboutTimeline: {
          completed: false,
          completedDate: ""
        }
      },
      proposal: {
        completed: {
          value: false
        },
        dateOfCompletion: {
          value: ""
        },
        inProcess: {
          completed: false,
          completedDate: ""
        },
        received: {
          completed: false,
          completedDate: ""
        },
        approval: {
          completed: false,
          completedDate: ""
        }
      },
      design: {
        completed: {
          value: false
        },
        dateOfCompletion: {
          value: ""
        },
        inProcess: {
          completed: false,
          completedDate: ""
        },
        received: {
          completed: false,
          completedDate: ""
        },
        approval: {
          completed: false,
          completedDate: ""
        }
      }
    };
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      loading: true
    });
    let temp = nextProps.clientState.allProjectWorkspace.statusBar;
    //let gotProgressData = nextProps.setUserProgress;
    if (
      nextProps.clientState.allProjectWorkspace.statusBar.product.completed ==
      false
    ) {
      (this.state.requirement.completed.value = false),
        this.setState({
          requirement: this.state.requirement
        });
    } else {
      this.state.requirement.aboutProduct.completed = temp.product.completed;
      this.state.requirement.aboutDesign.completed = temp.design.completed;
      this.state.requirement.aboutTimeline.completed = temp.timeline.completed;
      this.state.requirement.aboutTimeline.completedDate =
        temp.timeline.completedDate;
      this.state.requirement.dateOfCompletion = temp.timeline.completedDate;
      //this.state.margin_bu8_requirement = temp.timeline.completed;
      if (!temp.product.completed) {
        (this.state.requirement.completed.value = false),
          this.setState({
            requirement: this.state.requirement
          });
      } else if (!temp.design.completed) {
        (this.state.requirement.completed.value = false),
          this.setState({
            requirement: this.state.requirement
          });
      } else if (!temp.timeline.completed) {
        (this.state.requirement.completed.value = false),
          this.setState({
            requirement: this.state.requirement
          });
      } else {
        (this.state.requirement.completed.value = true),
          this.setState({
            requirement: this.state.requirement
          });
      }
      this.checkRenderStaus();
    }

    this.checkRenderStaus();

    this.setState({
      requirement: this.state.requirement
    });
  };
  checkRenderStaus = () => {
    if (!this.state.requirement.completed.value) {
      this.updateRequirementState();
      this.setState({
        margin_bu8_proposal: "margin_bu8_subpart_completed",
        check_proposal_nextpart: false
      });
    } else if (!this.state.proposal.completed.value) {
      this.setState({
        margin_bu8_proposal: "margin_bu8_subpart",
        margin_bu8_requirement: "margin_bu8_subpart_completed",
        check_proposal_nextpart: true,
        check_design_nextpart: false,
        margin_bu8_design: "margin_bu8_subpart_completed"
      });
      this.updateProposalState();
    } else if (!this.state.design.completed.value) {
      this.setState({
        margin_bu8_design: "margin_bu8_subpart",
        check_proposal_nextpart: true,
        check_design_nextpart: true,
        margin_bu8_requirement: "margin_bu8_subpart_completed",
        margin_bu8_proposal: "margin_bu8_subpart_completed"
      });
      this.updateProposalState();
    } else {
      this.setState({
        margin_bu8_requirement: "margin_bu8_subpart_completed",
        margin_bu8_proposal: "margin_bu8_subpart_completed",
        margin_bu8_design: "margin_bu8_subpart_completed"
      });
    }
    this.setState({
      loading: false
    });
  };
  updateRequirementState = () => {
    if (!this.state.requirement.aboutProduct.completed) {
      this.setState({
        not_cross_aboutProduct: true,
        not_cross_aboutDesign: false,
        not_cross_aboutTimeline: false
      });
    } else if (!this.state.requirement.aboutDesign.completed) {
      this.setState({
        not_cross_aboutProduct: false,
        not_cross_aboutDesign: true,
        not_cross_aboutTimeline: false
      });
    } else if (!this.state.requirement.aboutTimeline.completed) {
      this.setState({
        not_cross_aboutProduct: false,
        not_cross_aboutDesign: false,
        not_cross_aboutTimeline: true
      });
    } else {
      this.setState({
        not_cross_aboutProduct: false,
        not_cross_aboutDesign: false,
        not_cross_aboutTimeline: false
      });
    }
  };
  updateProposalState = () => {
    if (!this.state.proposal.inProcess.completed) {
      this.setState({
        not_cross_inProcess: true,
        not_cross_received: false,
        not_cross_approval: false
      });
    } else if (!this.state.proposal.received.completed) {
      this.setState({
        not_cross_inProcess: false,
        not_cross_received: true,
        not_cross_approval: false
      });
    } else {
      this.setState({
        not_cross_inProcess: false,
        not_cross_received: false,
        not_cross_approval: false
      });
    }
  };

  renderRequirementStatus = () => {
    return (
      <div>
        <Row className="margin_bu16">
          <Col md={1}>
            <div
              className={
                this.state.requirement.completed.value
                  ? "check_Oval_md"
                  : "Oval_md"
              }
            />
          </Col>
          <Col
            md={6}
            className={
              this.state.requirement.completed.value
                ? "checked_progress_text"
                : "progress_text_dark"
            }
          >
            {" "}
            Requirements
          </Col>
          <Col
            md={4}
            className={
              !this.state.requirement.completed.value
                ? "hide_progress_text"
                : "progress_text_position"
            }
          >
            {returnDate(this.state.requirement.dateOfCompletion)}
          </Col>
        </Row>
        <Row className={this.state.margin_bu8_requirement}>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.requirement.aboutProduct.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_aboutProduct
                      ? "Oval_sm"
                      : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.requirement.aboutProduct.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_aboutProduct
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              {" "}
              About product
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_aboutProduct
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.requirement.aboutDesign.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_aboutDesign
                      ? "Oval_sm"
                      : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.requirement.aboutDesign.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_aboutDesign
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              {" "}
              About design
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_aboutDesign
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.requirement.aboutTimeline.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_aboutTimeline
                      ? "Oval_sm"
                      : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.requirement.aboutTimeline.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_aboutTimeline
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              {" "}
              AboutTimeline
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_aboutTimeline
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
        </Row>
      </div>
    );
  };

  renderProposalStatus = () => {
    return (
      <div>
        <Row className="margin_bu16">
          <Col md={1}>
            <div
              className={
                this.state.proposal.completed.value
                  ? "check_Oval_md"
                  : this.state.check_proposal_nextpart
                    ? "Oval_md"
                    : "dim_Oval_md"
              }
            />
          </Col>
          <Col
            md={6}
            className={
              this.state.proposal.completed.value
                ? "checked_progress_text"
                : this.state.check_proposal_nextpart
                  ? "progress_text_dark"
                  : "progress_text"
            }
          >
            {" "}
            proposal
          </Col>
          <Col
            md={4}
            className={
              !this.state.proposal.completed.value
                ? "hide_progress_text"
                : "progress_text_position"
            }
          >
            {" "}
            Date
          </Col>
        </Row>
        <div className={this.state.margin_bu8_proposal}>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.proposal.inProcess.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_inProcess ? "Oval_sm" : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.proposal.inProcess.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_inProcess
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              {" "}
              In process
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_inProcess
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.proposal.received.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_received ? "Oval_sm" : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.proposal.received.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_received
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              {" "}
              Received
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_received
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
          <Row className="margin_bu8">
            <Col md={1}>
              <div
                className={
                  this.state.proposal.approval.completed
                    ? "check_Oval_sm"
                    : this.state.not_cross_approval ? "Oval_sm" : "dim_Oval_sm"
                }
              />
            </Col>
            <Col
              md={6}
              className={
                this.state.proposal.approval.completed
                  ? "checked_progress_text_sub"
                  : this.state.not_cross_approval
                    ? "progress_text_subpart"
                    : "progress_text_sub_dim"
              }
            >
              Approved
            </Col>
            <Col
              md={4}
              className={
                !this.state.not_cross_approval
                  ? "hide_progress_text"
                  : "progress_text_curr_position"
              }
            >
              you are here
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  render() {
    if (this.state.loading) {
      return <div />;
    } else {
      return (
        <Grid style={{ width: "90%" }}>
          <Row className="margin_bu28">
            <Col md={1}>
              {" "}
              <div className="box" />
            </Col>
            <Col md={8} className="progress_text">
              your journey with 1thing...
            </Col>
            <Col md={2}>
              <div className="Oval" />
              <div className="Oval" />
              <div className="Oval" />
            </Col>
          </Row>
          <Row className="margin_bu24">
            <Col md={1}>
              <div className="check_Oval_md" />
            </Col>
            <Col md={6} className="checked_progress_text margin_le20">
              Sign up
            </Col>
            <Col md={4} className="progress_text_position">
              {returnDate(localStorage.getItem("signUpDate"))}
            </Col>
          </Row>
          {this.renderRequirementStatus()}
          {this.renderProposalStatus()}
        </Grid>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    clientState: state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDesignData: url => {
      dispatch(getAboutDesignData(url));
    },
    productAddUpdate: (method, url, _apidata, _storedata) => {
      dispatch(setDesignAddUpdate(method, url, _apidata, _storedata));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProgress);
