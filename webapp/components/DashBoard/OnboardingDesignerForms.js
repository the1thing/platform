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
      aboutUserView:false,
      aboutExpertiseView:false,
      aboutPerspectiveView:false,
      userRatingView:false,
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
    this.setState({
      loading:true,
      
    });
    this.getUserData();
    console.log("checkoing hostory props",this.props.history)
  }
  getUserData=()=>{
    axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
           })
           .then((response)=>{
             let _tempStatus=response.data.statusBar;
            this.setState({
                        aboutYourselfDate:_tempStatus.aboutYourself.completedDate,
                        aboutExpertiseActive:_tempStatus.aboutYourself.completed,
                        aboutUserView:_tempStatus.aboutYourself.completed,
                        expertiseDate:_tempStatus.expertise.completedDate,
                        aboutPerspectiveActive:_tempStatus.expertise.completed,
                        aboutExpertiseView:_tempStatus.expertise.completed,
                        perspectiveDate:_tempStatus.perspective.completedDate,
                        userRatingActive:_tempStatus.perspective.completed,
                        aboutPerspectiveView:_tempStatus.perspective.completed,
                        thinkAboutYourselfDate:_tempStatus.thinkAboutYourself.completedDate,
                        loading:false,
                        aboutUserCompleted:_tempStatus.aboutYourself.completed,
                        expertiseCompleted:_tempStatus.expertise.completed,
                        perspectiveCompleted:_tempStatus.perspective.completed,
                        userRatingCompleted:_tempStatus.thinkAboutYourself.completed,
                        userRatingView:_tempStatus.thinkAboutYourself.completed,
                        userRatingCompletedDate:_tempStatus.thinkAboutYourself.completedDate,
                        })
               })
               .then((res)=>{ 
                      let temp={
                      aboutUser:this.state.aboutUserCompleted,
                      aboutExpertise:this.state.expertiseCompleted,
                      aboutPerspective:this.state.perspectiveCompleted,
                      userRating:this.state.userRatingCompleted,
                      userRatingDate:this.state.userRatingCompletedDate
                      };
                  // this.props.reloadProgress(temp);
                  this.props.route.reloadProgress(temp);
               })
               .then((res)=>{
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
  pushToOnboarding=()=>{
    this.props.history.push('/')
  }
  pushToAssignment=()=>{
    this.props.history.push('/assignment')
  }
 pushToPricing=()=>{
  this.props.history.push('/pricing')
}
pushToAboard=()=>{
 this.props.history.push('/aboard')
}
  render() {
    if(this.state.loading){
      return (
                <div>
                    {/* Loading ... */}
              </div>
            )
    }
    else   return (
      <div>
         <div className="title-content" style={{display:this.state.designer_info_display,marginBottom:'32px'}} >
         <DashboardDesignerInfo/>
        </div> 
        <div>
          <DesignerTitleMenu
          title='onboarding'
          pushPropsOnboarding={this.pushToOnboarding}
          pushPropsAssignment={this.pushToAssignment}
          pushPropsPricing={this.pushToPricing}
          pushPropsAboard={this.pushToAboard} 
          />
        </div>
       
        <div style={{display:this.state.onboarding_display}} className="title-content">
          <div className="Onboarding-content-f">
            {/* Onboarding content four steps: 1st is about yourself, 2nd is about expertise, 
            3rd about your perspective and lastly, how you think about yourself .. here it is 
            <img  width='24px' src={require('./Images/1f447.png')}/> */}
          </div>
          <OnBoardingTitles 
            openPanel={refs=>this.refs=refs}
            color='linear-gradient(248deg, #8776ff, #743afe)'
            borderRadius='4px'
            view={!this.state.aboutUserView && !this.state.aboutExpertiseView && !this.state.aboutPerspectiveView && !this.state.userRatingView ? true : false}
            active={this.state.aboutUserActive}
            date={returnDate(this.state.aboutYourselfDate)}
            title={<span>1.<span className="title-padding">About Yourself</span></span>}
            panelContent={(
              <AboutUser openPanel={()=>{this.openPanel()}}/>
            )}
              />
          <OnBoardingTitles 
            openPanel={refs=>this.refs=refs}
            color='linear-gradient(248deg, #28e5c0 1%, #06c9a4)'
            borderRadius='4px'
            view={this.state.aboutUserView && !this.state.aboutExpertiseView && !this.state.aboutPerspectiveView && !this.state.userRatingView ? true : false}
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
            view={this.state.aboutUserView && this.state.aboutExpertiseView && !this.state.aboutPerspectiveView && !this.state.userRatingView ? true : false}
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
            view={this.state.aboutUserView && this.state.aboutExpertiseView && this.state.aboutPerspectiveView && !this.state.userRatingView ? true : false}
            active={this.state.userRatingActive}
            date={returnDate(this.state.thinkAboutYourselfDate)}
            title={<span>4.<span className="title-padding">Rate Yourself</span></span>}
            panelContent={(
              <RatingUserself
              ref="openPanel"
              openPanel={()=>{this.setState({redirect:true});this.openPanel()}}/>
            )}
          />
          <div style={{marginBottom:'200px'}}>
            <Tooltip
              title="After this, an assignment will be shared with you in the next 48 hrs."/>
          </div>
        </div>
        {/* <div className="title-content" style={{display:this.state.assignment_display}}>
           <OnboardAssignment/>
         </div> */}
        {/* very important      -------------   dont remove------- */}

        {/* <div className="title-content" style={{display:this.state.manifesto_display}}>
         <OnboardManifesto/>
         </div> */}
         
      </div>
    )
  }
}
