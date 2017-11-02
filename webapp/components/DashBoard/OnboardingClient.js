import React, { Component } from 'react';
import logo from './logo.svg';
import OnboardingMonochromeForms from './OnboardingMonochromeForms';
import DashboardHeader from './DashboardHeader'
import DashboardClientInfo from './DashboardClientInfo'
import ClientProgress from './ClientProgress'
import OnboardManifesto from './OnboardManifesto'
import OnboardAssignment from './OnboardAssignment'
import MonochromeProposal from './MonochromeProposal'
import QueryChat from './Components/QueryChat';
import { browserHistory, Route, Router } from 'react-router';
import TeamButton from '../team_sidebar/components/team_button';

// import MonochromeProposal from './Components/MonochromeProposal';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'


import './App.css';
class OnboardingClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setUserProgress: [],
    }
  }
  reloadProgress = (e) => {
    this.setState({
      setUserProgress: e,
    })
  }
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
          <div style={{ width: '65%', marginTop: '32px' }}>
          <Router>
          <Route path='/'
          component={OnboardingMonochromeForms}
          reloadProgress={(e)=>{this.setState({setUserProgress:e})}}
          />
          <Route  path='/proposal' component={MonochromeProposal} />
          {/* <Route path='/Design' component={Design}/> */}
          {/* <Route path='/Feedback' component={Feedback}/> */}
          </Router>
    </div>
          <div className="progressbar-container">
            <div className="progress-container">
              <ClientProgress setUserProgress={this.state.setUserProgress} />
            </div>
               <QueryChat setUserProgress={this.state.setUserProgress} />
           </div>
        </div>
        {/* very important      -------------   dont remove------- */}
        {/* <div >
               <img width='1260px' src={require('./Images/map.svg')} />
            </div> */}

      </div>
    );
  }
}

export default OnboardingClient;
