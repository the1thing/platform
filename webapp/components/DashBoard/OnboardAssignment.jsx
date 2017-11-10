import React, { Component } from 'react';
import DesignerTitleMenu from './Components/DesignerTitleMenu';
import './Styles/OnboardAssignment.css';
import Tooltip from './Components/Tooltip';
const styles = {
    borders: {
        border: '1px solid #f7f7f7'
    }
}

export default class OnboardAssignment extends Component {
    componentWillMount() {
        
           console.log("gggggggggg",this.props.history)
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
        return (
            <div >
                <div>
                    <DesignerTitleMenu
                        title="assignment"
                        pushPropsOnboarding={this.pushToOnboarding}
                        pushPropsAssignment={this.pushToAssignment}
                        pushPropsPricing={this.pushToPricing}
                        pushPropsAboard={this.pushToAboard} 
                    />
                </div>
                <div style={{paddingLeft:'3%'}}>
                <div styles={styles.borders} className="assign_info_text">
                    <div> <img width='24px' height="24px" src={require('./Images/thumb_up.png')} /></div>
                    <div>
                    Wasn’t that easy? We’ve successfully generated your application.
                    Please allow 2 days for the final stage assignment to be shared with you. </div>
                </div>
                <div className="small_info_text margin_top">
                    Your assignment will appear here..
               </div>
                <div className="assimnt_box margin_top">
                    <div className="Rectangle-6">
                    </div>
                    <div>
                        <div className="assmnt_text_marging_le_40">
                            Assignment
                        </div>
                        <div className="assmnt_text_bottom">
                            <span><img width='20px' height='20px' src={require('./Images/envelope.svg')} /> Mail yourself</span>
                            <span className="margin_left"> <img width='20px' height='20px' src={require('./Images/download-arrow.svg')} />Download Proposal</span>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '35px',marginBottom:'200px' }}>
                    <Tooltip
                        title="Meanwhile, you could           about how 1THING works.  " />
                </div>
                </div>
            </div>
        )
    }
}
