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
// import TeamSidebar from '../team_sidebar/team_sidebar_controller.jsx';
import TeamSidebar from '../team_sidebar/index';
import DesignerPricing from './DesignerPricing';
import DesignerAboard from './DesignerAboard';

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
        <div className="dashboard-sidebar"><TeamSidebar/></div>
        <div className="_header">
          <DashboardHeader
           header_title1="ONBOARDING"
           />
        </div>
        <div className="dashboard-container">
          <div style={{width:'65%',marginTop:'32px'}}>
          <TeamSidebar/>
          <Router>
          <div>
          <Route 
            path='/'
            component={OnboardingDesignerForms}
            reloadProgress={(e)=>{this.setState({setUserProgress:e})}}
            />
            <Route path='/assignment' component={OnboardAssignment}/>
            <Route path='/pricing' component={DesignerPricing}/>
            <Route path='/aboard' component={DesignerAboard}/>
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
