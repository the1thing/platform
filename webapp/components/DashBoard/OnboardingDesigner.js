import React, { Component } from 'react';
// import logo from './logo.svg';
import OnboardingDesignerForms from './OnboardingDesignerForms';
import  DashboardHeader from './DashboardHeader'
// import  DashboardDesignerInfo from './DashboardDesignerInfo'
import  DesignerProgress from './DesignerProgress'
// import  OnboardManifesto from './OnboardManifesto'
// import OnboardAssignment from './OnboardAssignment'
// import MonochromeProposal from './MonochromeProposal'
import QueryChat from './Components/QueryChat'

// import './App.css';
class OnboardingDesigner extends Component {
  render() {
    return (
      <div>
        <div className="_header">
            <DashboardHeader 
           header_title1="ONBOARDING"
           /> 
        </div>
        <div className="dashboard-container">
          <div style={{border:'1px solid red',width:'76%'}}>
             <OnboardingDesignerForms/> 
          </div>
          <div style={{width:'24%'}}>
            <div className="progress-container">
                <DesignerProgress/>     
            </div>
            <QueryChat/> 
          </div>
        </div>
      </div>
    );
  }
}

export default OnboardingDesigner;
