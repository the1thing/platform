import React, { Component } from 'react';
import './Styles/MyComponents.css';
import DesignerTitleMenu from './Components/DesignerTitleMenu';
import OnBoardingTitles from './Components/OnBoardingTitles';
import { Panel, FormGroup, Checkbox } from 'react-bootstrap';
import AboutUser from './Containers/AboutUser';
import UserExperties from './Containers/UserExperties';
import UserPerspective from './Containers/UserPerspective';
import RatingUserself from './Containers/RatingUserself';
import AboutProduct from './Containers/AboutProduct';
import AboutDesign from './Containers/AboutDesign';
import AboutTimeline from './Containers/AboutTimeline';
import OnboardAssignment from './OnboardAssignment';
import  OnboardManifesto from './OnboardManifesto';
import  DashboardDesignerInfo from './DashboardDesignerInfo';
import Tooltip from './Components/Tooltip';
import {returnDate} from './utils/Methods';
import axios from 'axios';
import { basepath } from './utils/constant';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'




export default class OnboardingDesignerForms extends Component {
  constructor(props){
    super(props);
    this.state={
      aboutUserActive:true,
      aboutExpertiseActive:false,
      aboutPerspectiveActive:false,
      userRatingActive:false,
      onboarding_display:'block',
      assignment_display:'none',
      pricing_bandwidth_display:'none',
      welAboard_display:'none',
      manifesto_display:'block',
      designer_info_display:'block',
      //************************** panel dates ****************//
      aboutYourselfDate:'',
      expertiseDate:'',
      perspectiveDate:'',
      thinkAboutYourselfDate:'',
      aboutUserCompleted:'',
      expertiseCompleted:'',
      perspectiveCompleted:'',
      userRatingCompleted:'',
      userRatingCompletedDate:'',
      
      


      loading:false,
      redirect:false,
      
    }
  }
  
  componentWillMount() {
    this.setState({loading:true});
    this.getUserData();
  }
  getUserData=()=>{
    axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
           }).then((response) => {
           console.log('response of get about userrrrrrrrrrr11111', response.data.statusBar);
           let _tempStatus=response.data.statusBar;
            this.setState({
                aboutYourselfDate:_tempStatus.aboutYourself.completedDate,
                aboutExpertiseActive:_tempStatus.aboutYourself.completed,
                expertiseDate:_tempStatus.expertise.completedDate,
                aboutPerspectiveActive:_tempStatus.expertise.completed,
                perspectiveDate:_tempStatus.perspective.completedDate,
                userRatingActive:_tempStatus.perspective.completed,
                thinkAboutYourselfDate:_tempStatus.thinkAboutYourself.completedDate,
                loading:false,
                aboutUserCompleted:_tempStatus.aboutYourself.completed,
                expertiseCompleted:_tempStatus.expertise.completed,
                perspectiveCompleted:_tempStatus.perspective.completed,
                userRatingCompleted:_tempStatus.thinkAboutYourself.completed,
                userRatingCompletedDate:_tempStatus.thinkAboutYourself.completedDate,
                
                
               })
               let temp={
                aboutUser:this.state.aboutUserCompleted,
                aboutExpertise:this.state.expertiseCompleted,
                aboutPerspective:this.state.perspectiveCompleted,
                userRating:this.state.userRatingCompleted,
                userRatingDate:this.state.userRatingCompletedDate
              };
               this.props.reloadProgress(temp);
              // alert("hiii")
              
            }).then(()=>{
              if(this.state.userRatingCompleted && this.state.redirect){
                this.props.history.push('/assignment');
              }
              // this.props.reloadProgress(temp);
            }).catch((error) => {
            console.log('get project error', error);
             this.setState({loading:false});
          });
            //aboutYourself
            //expertise
           //perspective
           //thinkAboutYourself
  
  }
  
  // componentWillReceiveProps=(nextProps)=> {
  //   this.setState({loading:true});
  //   axios({
  //           method: 'get',
  //           url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
  //          }).then((response) => {
  //          console.log('props props  response of get about userrrrrrrrrrr11111', response);
  //          let _tempStatus=response.data.statusBar;
  //           this.setState({
  //               aboutYourselfDate:_tempStatus.aboutYourself.completedDate,
  //               aboutExpertiseActive:_tempStatus.aboutYourself.completed,
  //               expertiseDate:_tempStatus.expertise.completedDate,
  //               aboutPerspectiveActive:_tempStatus.expertise.completed,
  //               perspectiveDate:_tempStatus.perspective.completedDate,
  //               userRatingActive:_tempStatus.perspective.completed,
  //               thinkAboutYourselfDate:_tempStatus.thinkAboutYourself.completedDate,
  //               loading:false,
  //              })
  //         })
  //         .catch((error) => {
  //           console.log('get project error', error);
  //            this.setState({loading:false});
  //         });
  // }

  openPanel=()=>{
    this.refs.openPanel();
    this.getUserData();
    // if(this.state.userRatingCompleted){
    //   this.props.history.push('/assignment');
    // }
  }

  render() {
    if(this.state.loading){
      return <div>
        loading...
      </div>
    }
    else   return (
      <div>
         <div className="title-content" style={{display:this.state.designer_info_display,marginBottom:'32px'}} >
         <DashboardDesignerInfo/>
        </div> 
        <div>
          <DesignerTitleMenu
          getOnboarding={()=>{this.setState({
                                            onboarding_display:'block',
                                            assignment_display:'none',
                                            pricing_bandwidth_display:'none',
                                            welAboard_display:'none',
                                            manifesto_display:'block',
                                            designer_info_display:'block',
                                            
                                            })}}
          getAssignment={()=>{this.setState({
                                            onboarding_display:'none',
                                            assignment_display:'block',
                                            pricing_bandwidth_display:'none',
                                            welAboard_display:'none',
                                            manifesto_display:'none',
                                            designer_info_display:'none',
                                            
                                                })}}
          getPricing_bandwidth={()=>{this.setState({
                                            onboarding_display:'none',
                                            assignment_display:'none',
                                            pricing_bandwidth_display:'block',
                                            welAboard_display:'none',
                                            manifesto_display:'none',
                                            designer_info_display:'none',
                                            
                                              })}}
          getWelAboard={()=>{this.setState({
                                           onboarding_display:'none',
                                            assignment_display:'none',
                                            pricing_bandwidth_display:'none',
                                            welAboard_display:'block',
                                            manifesto_display:'none',
                                            designer_info_display:'none',
                                            
                                           })}}
          />
        </div>
       
        <div style={{display:this.state.onboarding_display}} className="title-content">
          <div className="Onboarding-content-f">
            Onboarding content four steps: 1st is about yourself, 2nd is about expertise, 
            3rd about your perspective and lastly, how you think about yourself .. here it is 
            <img  width='24px' src={require('./Images/1f447.png')}/>
          </div>
          <OnBoardingTitles 
            openPanel={refs=>this.refs=refs}
            color='linear-gradient(248deg, #8776ff, #743afe)'
            borderRadius='4px'
            active={this.state.aboutUserActive}
            date={returnDate(this.state.aboutYourselfDate)}
            title={<span>1.<span className="title-padding">About yourself</span></span>}
            panelContent={(
              <AboutUser openPanel={()=>{this.openPanel()}}/>
            )}
              />
          <OnBoardingTitles 
            openPanel={refs=>this.refs=refs}
            color='linear-gradient(248deg, #28e5c0 1%, #06c9a4)'
            borderRadius='4px'
            active={this.state.aboutExpertiseActive}
            date={returnDate(this.state.expertiseDate)}
            title={<span>2.<span className="title-padding">Your expertise</span></span>}
            panelContent={(
              <UserExperties openPanel={()=>{this.openPanel()}}/>
            )}
              />
          <OnBoardingTitles 
           openPanel={refs=>this.refs=refs}
            color=' linear-gradient(248deg, #d878ef, #c45edd)'
            borderRadius='4px'
            active={this.state.aboutPerspectiveActive}
            date={returnDate(this.state.perspectiveDate)}
            title={<span>3.<span className="title-padding">Your perspective</span></span>}
            panelContent={(
              <UserPerspective openPanel={()=>{this.openPanel()}}/>
            )}
              />
          <OnBoardingTitles 
            openPanel={refs=>this.refs=refs}
            color='linear-gradient(227deg, #ffb061, #ff9c39)'
            borderRadius='4px'
            active={this.state.userRatingActive}
            date={returnDate(this.state.thinkAboutYourselfDate)}
            title={<span>4.<span className="title-padding">How you think about yourself</span></span>}
            panelContent={(
              <RatingUserself openPanel={()=>{this.setState({redirect:true});this.openPanel()}}/>
            )}
          />
          <div>
            <Tooltip
              title="Right after you are done with these 4 steps, we'll share a assignment with you in next 48 hours."/>
          </div>
        </div>
        <div className="title-content" style={{display:this.state.assignment_display}}>
           <OnboardAssignment/>
         </div>
        {/* very important      -------------   dont remove------- */}

        {/* <div className="title-content" style={{display:this.state.manifesto_display}}>
         <OnboardManifesto/>
         </div> */}
         
      </div>
    )
  }
}
