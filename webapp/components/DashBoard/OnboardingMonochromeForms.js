import React, { Component } from 'react';
import './Styles/MyComponents.css';
import ClientTitleMenu from './Components/ClientTitleMenu';
import OnBoardingTitles from './Components/OnBoardingTitles';
import { Panel, FormGroup, Checkbox } from 'react-bootstrap';
import AboutUser from './Containers/AboutUser';
import UserExperties from './Containers/UserExperties';
import UserPerspective from './Containers/UserPerspective';
import RatingUserself from './Containers/RatingUserself';
import AboutProduct from './Containers/AboutProduct';
import AboutDesign from './Containers/AboutDesign';
import AboutTimeline from './Containers/AboutTimeline';
import MonochromeProposal from './MonochromeProposal';
import OnboardManifesto from './OnboardManifesto';
import DashboardClientInfo from './DashboardClientInfo';
import axios from 'axios';
import { basepath } from './utils/constant'
import { returnDate } from './utils/Methods'
import Tooltip from './Components/Tooltip';


export default class OnboardingMonochromeForms extends Component {
  constructor(props) {
    super(props);
    this.state={
      aboutProductActive:true,
      aboutDesignActive:false,
      aboutTimelineActive:false,
      requirement_display:'block',
      proposal_display:'none',
      design_display:'none',
      feedback_display:'none',
      manifesto_display:'block',
      client_info_display:'block',
      product_date:'',
      design_date:'',
      timeline_date:'',
      loading:true,
      projectId:'',
      aboutProductCompleted:false,
      aboutDesignCompleted:false,
      aboutTimelineCompleted:false,
      redirect:false,
      
    }
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.getUserData();
  }
  openPanel = () => {
    this.refs.openPanel();
    this.getUserData();

  }
  getUserData = () => {
    axios({
      method: 'get',
      url: basepath + 'project/getAllProjectsForWorkspace/' + localStorage.getItem('userId'),
         }
        ).then((response)=>{
          var _response=response.data.statusBar;
            console.log('1111111111111111111',response);
            if(response.data._id){
              localStorage.setItem('projectId',response.data._id)
              this.setState({
                projectId:response.data._id,
                  product_date: _response.product.completedDate,
                  aboutDesignActive:_response.product.completed,
                  design_date: _response.design.completedDate,
                  aboutTimelineActive: _response.design.completed,
                  timeline_date: _response.timeline.completedDate,
                  aboutProductCompleted:_response.product.completed,
                  aboutDesignCompleted:_response.design.completed,
                  aboutTimelineCompleted:_response.timeline.completed,
                  loading:false,
                })
                let temp={
                  aboutProduct:this.state.aboutProductCompleted,
                  aboutDesign:this.state.aboutDesignCompleted,
                  aboutTimeline:this.state.aboutTimelineCompleted,
                  aboutTimelineDate:this.state.timeline_date
                };
                 this.props.reloadProgress(temp);
            
            }
          else{
            this.setState({
              loading:false,
            })
          }
        }).then(()=>{
          if(this.state.aboutTimelineCompleted && this.state.redirect){
            this.props.history.push('/proposal');
          }
        }).catch((error)=>{console.log('error',error)
           this.setState({loading:false})
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          loading ....
      </div>
      )
    }
    else {
      return (
        <div>
          <div className="title-content" style={{ display: this.state.client_info_display, marginBottom: '32px' }} >
            <DashboardClientInfo />
          </div>
            <ClientTitleMenu
              title="Requirements"
              getRequirement={() => {
                this.setState({
                  requirement_display: 'block',
                  proposal_display: 'none',
                  design_display: 'none',
                  feedback_display: 'none',
                  manifesto_display: 'block',
                  client_info_display: 'block',

                })
              }}
              getProposal={() => {
                this.setState({
                  requirement_display: 'none',
                  proposal_display: 'block',
                  design_display: 'none',
                  feedback_display: 'none',
                  manifesto_display: 'none',
                  client_info_display: 'none',

                })
              }}
              getDesign={() => {
                this.setState({
                  requirement_display: 'none',
                  proposal_display: 'none',
                  design_display: 'block',
                  feedback_display: 'none',
                  manifesto_display: 'none',
                  client_info_display: 'none',

                })
              }}
              getFeedback={() => {
                this.setState({
                  requirement_display: 'none',
                  proposal_display: 'none',
                  design_display: 'none',
                  feedback_display: 'block',
                  manifesto_display: 'none',
                  client_info_display: 'none',

                })
              }}
            />
          <div style={{ display: this.state.requirement_display }} className="title-content">
            <div className="Onboarding-content-f">
              Requirements content three steps 1st is product where you tell us about your product,
           what kinda product you want to build,
            2nd is about design, which type of design philosophy you want to follow and 3rd about timeline.. here it is
            <img width='24px' src={require('./Images/1f447.png')} />
            </div>
            <OnBoardingTitles
              openPanel={refs => this.refs = refs}
              color='linear-gradient(-200deg, #8776FF 0%, #743AFE 86%)'
              borderRadius='4px 4px 0 0'
              active={this.state.aboutProductActive}
              date={returnDate(this.state.product_date)}
              title={<span>1.<span className="title-padding">About your product</span></span>}
              panelContent={(
                <AboutProduct openPanel={() => { this.openPanel() }} />
              )}
            />
            <OnBoardingTitles
              openPanel={refs => this.refs = refs}
              color='linear-gradient(248deg, #28e5c0 1%, #06c9a4)'
              borderRadius='4px'
              active={this.state.aboutDesignActive}
              date={returnDate(this.state.design_date)}
              title={<span>2.<span className="title-padding">About Design</span></span>}
              panelContent={(
                <AboutDesign projectId={this.state.projectId} openPanel={() => { this.openPanel() }} />
              )}
            />
            <OnBoardingTitles
              openPanel={refs => this.refs = refs}
              color='linear-gradient(248deg, #d878ef, #c45edd)'
              borderRadius='4px'
              active={this.state.aboutTimelineActive}
              date={returnDate(this.state.timeline_date)}
              title={<span>3.<span className="title-padding">About Timeline</span></span>}
              panelContent={(
                <AboutTimeline openPanel={() => {   this.setState({
                     redirect:true,
                   }); this.openPanel() }} />
              )}
            />
          <div>
            <Tooltip 
              title="Right after you are done with these 3 steps, we'll share a proposal with you in next 48 hours."/>
          </div>
          </div>
          
          
{/* very important      -------------   dont remove------- */}

          {/* <div className="title-content" style={{display:this.state.manifesto_display}}>
        <OnboardManifesto/>
        </div> */}

        </div>
      )
    }
  }
}
