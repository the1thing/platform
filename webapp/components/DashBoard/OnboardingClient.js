import React, { Component } from 'react';
// import logo from './logo.svg';
import OnboardingMonochromeForms from './OnboardingMonochromeForms';
import  DashboardHeader from './DashboardHeader'
import  DashboardClientInfo from './DashboardClientInfo'
import  ClientProgress from './ClientProgress'
import  OnboardManifesto from './OnboardManifesto'
import OnboardAssignment from './OnboardAssignment'
import MonochromeProposal from './MonochromeProposal'
import QueryChat from './Components/QueryChat'

import './App.scss';
class OnboardingClient extends Component {
  render() {
    return (
      <div>
        <div className="_header">
          <DashboardHeader 
            header_title1="MONOCHROME"
          //  header_title2="+  Start New Project"
          />
        </div>
        <div className="dashboard-container">
          <div style={{width:'65%'}}>
            <OnboardingMonochromeForms/>
          </div>
          <div style={{width:'35%'}}>
            <div className="progress-container">
              <ClientProgress/>   
            </div>
           <QueryChat/>
          </div>
        </div>
         <div >
            <img width='1260px' src={require('./Images/map.svg')} />
         </div>
      </div>
    );
  }
}

export default OnboardingClient;
