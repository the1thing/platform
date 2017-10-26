import React, { Component } from 'react'
import {Row,Col,Grid} from 'react-bootstrap';
import ReactDOM from 'react-dom';
var final_view='';

export default class DesignerProgress extends Component {
    constructor(props){
        super(props);
        this.state={
            margin_bu8_onboarding:"margin_bu8_subpart",
            margin_bu8_assignment:"margin_bu8_subpart",
            margin_bu8_pricing_bandwidth:"margin_bu8_subpart",
            check_assignment_nextpart:false,
            check_pricing_bandwidth_nextpart:false,
            
            not_cross_aboutYourself:false,
            not_cross_yourExpertise:false,
            not_cross_yourPerspective:false,
            not_cross_howYouThink:false,
            not_cross_inProcess:false,
            not_cross_received:false,
            not_cross_approval:false,
            onboarding_class:"show_full_onboarding",
            assigment_class:'show_info_assignment',
            onboarding_var:['aboutYourself','yourExpertise','yourPerspective','howYouThink'],
            onboarding_data:['Onboarding','About yourself','Your Expertise','Your perspective', 'How you think'],
            onboarding:{
                        completed:{
                                   value:true,
                                  },
                        dateOfCompletion:{
                                         value:'30 sep'
                                        },
                        aboutYourself:{
                                      completed:true,
                                      completedDate:'30 sep'
                                      },
                       yourExpertise:{
                                        completed:true,
                                        completedDate:'30 sep'
                                    },   
                       yourPerspective:{
                                        completed:false,
                                        completedDate:'30 sep'
                                    }, 
                       howYouThink:{
                                        completed:false,
                                        completedDate:'30 sep'
                                    }, 
                       },
                       assignment:{
                        completed:{
                                   value:false
                                  },
                        dateOfCompletion:{
                                         value:''
                                        },
                        inProcess:{
                                      completed:true,
                                      completedDate:'30 sep'
                                      },
                       received:{
                                        completed:true,
                                        completedDate:'30 sep'
                                    },   
                       approval:{
                                        completed:false,
                                        completedDate:''
                                    }, 
                      
                       },
                       pricing_bandwidth:{
                        completed:{
                                   value:false
                                  },
                        dateOfCompletion:{
                                         value:''
                                        },
                        inProcess:{
                                      completed:true,
                                      completedDate:'30 sep'
                                      },
                       received:{
                                        completed:true,
                                        completedDate:'30 sep'
                                    },   
                       approval:{
                                        completed:false,
                                        completedDate:''
                                    }, 
                      
                       }
              }
      }
    checkRenderStaus=()=>{
        if(!this.state.onboarding.completed.value)
        {
            this.updateOnboardingState();
            this.setState({
                margin_bu8_assignment:"margin_bu8_subpart_completed",
                check_assignment_nextpart:false,
             })
         }
         else if(!this.state.assignment.completed.value)
         {  
             this.setState({
                margin_bu8_onboarding:"margin_bu8_subpart_completed",
                check_assignment_nextpart:true,
                check_pricing_bandwidth_nextpart:false,
                margin_bu8_pricing_bandwidth:"margin_bu8_subpart_completed",
             })
             this.updateAssignmentState();
         }
         else if(!this.state.pricing_bandwidth.completed.value)
         {
            this.setState({
                check_assignment_nextpart:true,
                check_pricing_bandwidth_nextpart:true,
                margin_bu8_onboarding:"margin_bu8_subpart_completed",
                margin_bu8_assignment:"margin_bu8_subpart_completed",
             })
             this.updateAssignmentState();
         }
         else {
            this.setState({
                margin_bu8_onboarding:"margin_bu8_subpart_completed",
                margin_bu8_assignment:"margin_bu8_subpart_completed",
                margin_bu8_pricing_bandwidth:"margin_bu8_subpart_completed",
             })

         }
      }
    updateOnboardingState=()=>{
        if(!this.state.onboarding.aboutYourself.completed){
            this.setState({
            not_cross_aboutYourself:true,
            not_cross_yourExpertise:false,
            not_cross_yourPerspective:false,
            not_cross_howYouThink:false,
        })

        }
        else if(!this.state.onboarding.yourExpertise.completed)
        {
            this.setState({
                not_cross_aboutYourself:false,
                not_cross_yourExpertise:true,
                not_cross_yourPerspective:false,
                not_cross_howYouThink:false,
            })
        }
        else if(!this.state.onboarding.yourPerspective.completed)
        {
            this.setState({
                not_cross_aboutYourself:false,
                not_cross_yourExpertise:false,
                not_cross_yourPerspective:true,
                not_cross_howYouThink:false,
            })
        }
        else {
            this.setState({
                not_cross_aboutYourself:false,
                not_cross_yourExpertise:false,
                not_cross_yourPerspective:false,
                not_cross_howYouThink:true,
            })
        }
    }
    updateAssignmentState=()=>{
        if(!this.state.assignment.inProcess.completed){
            this.setState({
                not_cross_inProcess:true,
                not_cross_received:false,
                not_cross_approval:false,
        })

        }
        else if(!this.state.assignment.received.completed)
        {
            this.setState({
                not_cross_inProcess:false,
                not_cross_received:true,
                not_cross_approval:false,
            })
        }
        else {
            this.setState({
                not_cross_inProcess:false,
                not_cross_received:false,
                not_cross_approval:true,
            })
        }
    }
    
    componentWillMount=()=> {
        this.checkRenderStaus();
        
    }
    
    
     renderOnboardingStatus=()=>{
                     return(
                     <div>
                        <Row  className="margin_bu16">
                            <Col  md={1} ><div className={this.state.onboarding.completed.value?"check_Oval_md":"Oval_md"}></div></Col>
                            <Col  md={6} className={this.state.onboarding.completed.value?"checked_progress_text":"progress_text_dark"}> Onboarding</Col>
                            <Col  md={4} className={!this.state.onboarding.completed.value?"hide_progress_text":"progress_text_position"}> Date</Col>
                        </Row>
                        <Row className={this.state.margin_bu8_onboarding}>
                        <Row className="margin_bu8">
                            <Col  md={1} ><div className={this.state.onboarding.aboutYourself.completed?"check_Oval_sm":this.state.not_cross_aboutYourself?"Oval_sm":"dim_Oval_sm"}></div></Col>
                            <Col  md={6} className={this.state.onboarding.aboutYourself.completed?"checked_progress_text_sub":this.state.not_cross_aboutYourself?"progress_text_subpart":"progress_text_sub_dim"}> About yourself</Col>
                            <Col  md={4} className={!this.state.not_cross_aboutYourself?"hide_progress_text":"progress_text_position"}>you are here</Col>
                        </Row>
                        <Row  className="margin_bu8">
                            <Col  md={1} ><div className={this.state.onboarding.yourExpertise.completed?"check_Oval_sm":this.state.not_cross_yourExpertise?"Oval_sm":"dim_Oval_sm"}></div></Col>
                            <Col  md={6}  className={this.state.onboarding.yourExpertise.completed?"checked_progress_text_sub":this.state.not_cross_yourExpertise?"progress_text_subpart":"progress_text_sub_dim"}> Your expertise</Col>
                            <Col  md={4}  className={!this.state.not_cross_yourExpertise?"hide_progress_text":"progress_text_position"}>you are here</Col>
                        </Row>
                        <Row  className="margin_bu8">
                            <Col  md={1} ><div className={this.state.onboarding.yourPerspective.completed?"check_Oval_sm":this.state.not_cross_yourPerspective?"Oval_sm":"dim_Oval_sm"}></div></Col>
                            <Col  md={6}  className={this.state.onboarding.yourPerspective.completed?"checked_progress_text_sub":this.state.not_cross_yourPerspective?"progress_text_subpart":"progress_text_sub_dim"}> Your perspective</Col>
                            <Col  md={4}  className={!this.state.not_cross_yourPerspective?"hide_progress_text":"progress_text_position"}>you are here</Col>
                        </Row>
                        <Row  className="margin_bu8">
                            <Col  md={1} ><div className={this.state.onboarding.howYouThink.completed?"check_Oval_sm":this.state.not_cross_howYouThink?"Oval_sm":"dim_Oval_sm"}></div></Col>
                            <Col  md={6}  className={this.state.onboarding.howYouThink.completed?"checked_progress_text_sub":this.state.not_cross_howYouThink?"progress_text_subpart":"progress_text_sub_dim"}>How you think</Col>
                            <Col  md={4}  className={!this.state.not_cross_howYouThink?"hide_progress_text":"progress_text_position"}>you are here</Col>
                        </Row>
                     </Row>
                  </div>
                )
        }

     renderAssignmentStatus=()=>{
        return(
        <div>
           <Row  className="margin_bu16">
               <Col  md={1} ><div className={this.state.assignment.completed.value?"check_Oval_md":this.state.check_assignment_nextpart?"Oval_md":"dim_Oval_md"}></div></Col>
               <Col  md={6} className={this.state.assignment.completed.value?"checked_progress_text":this.state.check_assignment_nextpart?"progress_text_dark":"progress_text"}> Assignment</Col>
               <Col  md={4} className={!this.state.assignment.completed.value?"hide_progress_text":"progress_text_position"}> Date</Col>
           </Row>
           <div className={this.state.margin_bu8_assignment}>
           <Row className="margin_bu8">
               <Col  md={1} ><div className={this.state.assignment.inProcess.completed?"check_Oval_sm":this.state.not_cross_inProcess?"Oval_sm":"dim_Oval_sm"}></div></Col>
               <Col  md={6} className={this.state.assignment.inProcess.completed?"checked_progress_text_sub":this.state.not_cross_inProcess?"progress_text_subpart":"progress_text_sub_dim"}> In process</Col>
               <Col  md={4} className={!this.state.not_cross_inProcess?"hide_progress_text":"progress_text_position"}>you are here</Col>
           </Row>
           <Row  className="margin_bu8">
               <Col  md={1} ><div className={this.state.assignment.received.completed?"check_Oval_sm":this.state.not_cross_received?"Oval_sm":"dim_Oval_sm"}></div></Col>
               <Col  md={6}  className={this.state.assignment.received.completed?"checked_progress_text_sub":this.state.not_cross_received?"progress_text_subpart":"progress_text_sub_dim"}> Received</Col>
               <Col  md={4}  className={!this.state.not_cross_received?"hide_progress_text":"progress_text_position"}>you are here</Col>
           </Row>
           <Row  className="margin_bu8">
               <Col  md={1} ><div className={this.state.assignment.approval.completed?"check_Oval_sm":this.state.not_cross_approval?"Oval_sm":"dim_Oval_sm"}></div></Col>
               <Col  md={6}  className={this.state.assignment.approval.completed?"checked_progress_text_sub":this.state.not_cross_approval?"progress_text_subpart":"progress_text_sub_dim"}>Approval</Col>
               <Col  md={4}  className={!this.state.not_cross_approval?"hide_progress_text":"progress_text_position"}>you are here</Col>
           </Row>
        </div>
     </div>
   )
}
    render() {
        console.log("ntcrappr",this.state.not_cross_approval)
        return (
            <Grid style={{width:'90%'}}>
              <Row className="margin_bu28" >
                  <Col  md={1}> <div  className="box"></div></Col>
                  <Col  md={8} className="progress_text_main">your journey with 1thing</Col>
                  <Col  md={2} >
                  <div className="Oval"></div>
                  <div className="Oval"></div>
                  <div className="Oval"></div>
                  </Col>
               </Row >
               <Row className="margin_bu24" >
                 <Col  md={1} ><div className="check_Oval_md"></div></Col>
                 <Col  md={6} className="checked_progress_text margin_le20">Sign up</Col>
                 <Col  md={4} className="progress_text_position">Date</Col>
              </Row>
              {this.renderOnboardingStatus()}
              {this.renderAssignmentStatus()}
            </Grid>
        )

    }
}
