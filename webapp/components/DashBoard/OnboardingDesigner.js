import React, { Component } from 'react';
import logo from './logo.svg';
import OnboardingDesignerForms from './OnboardingDesignerForms';
import  DashboardHeader from './DashboardHeader'
import  DashboardDesignerInfo from './DashboardDesignerInfo'
import  DesignerProgress from './DesignerProgress'
import  OnboardManifesto from './OnboardManifesto'
import OnboardAssignment from './OnboardAssignment'
import MonochromeProposal from './MonochromeProposal'
import QueryChat from './Components/QueryChat';
import Tooltip from './Components/Tooltip';
import { browserHistory, Route, Router } from 'react-router';
import TeamButton from '../team_sidebar/components/team_button';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'


import './App.css';
class OnboardingDesigner extends Component {
  constructor(props){
    super(props);
    this.state={
      setUserProgress:[],
    }
  }
  render() {
    return (
      <div>
        <div className="_header">
          <DashboardHeader
           header_title1="ONBOARDING"
           />
        </div>
        <div className="dashboard-container">
          <div style={{width:'65%',marginTop:'32px'}}>
          <Router>
          <div>
          <Route 
            path='/'
            component={OnboardingDesignerForms}
            reloadProgress={(e)=>{this.setState({setUserProgress:e})}}
            />
              {/* render={(props)=>{return <OnboardingDesignerForms {...props} reloadProgress={(e)=>
          this.setState({setUserProgress:e})
          }/>}}/> */}
            {/* <Route exact path='/' render={(props)=>{<OnboardingDesignerForms {...props} reloadProgress={(e)=>{this.setState({setUserProgress:e})}}/>}}/> */}
            <Route path='/assignment' component={OnboardAssignment}/>
            {/* <Route path='/Pricing&Bandwidth' component={Pricing & Bandwidth}/> */}
            {/* <Route path='welcomeaboard' component={welcome aboard}/> */}
          </div>
        </Router>
      </div>
          <div  className="progressbar-container">
            <div className="progress-container">
              <DesignerProgress setUserProgress={this.state.setUserProgress}/>   
            </div>
           <QueryChat setUserProgress={this.state.setUserProgress}/>
          </div>
        </div>
      </div>
    );
  }
}

export default OnboardingDesigner;
