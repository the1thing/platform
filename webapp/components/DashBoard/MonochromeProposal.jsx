import React, { Component } from 'react';
import './Styles/OnboardAssignment.css';
import ClientTitleMenu from './Components/ClientTitleMenu';
import Tooltip from './Components/Tooltip';
const styles = {
    borders: {
        border: '1px solid #f7f7f7'
    }
}

export default class MonochromeProposal extends Component {
    componentWillMount() {
    console.log("gggggggggg",this.props.history)
  }
  
 pushTORequire=(push_argu)=>{
                   this.props.history.push('/')
      }
pushTOProposal=()=>{
        this.props.history.push('/proposal')
    }
  pushToDesign=()=>{
    this.props.history.push('/design')
  }
  pushTOFeeddback=()=>{
    this.props.history.push('/feedback')
  }
    render() {
        return (
            <div>
                <div>
                    <ClientTitleMenu
                    title='proposal'
                    pushPropsRequire={this.pushTORequire}
                    pushPropsProposal={this.pushTOProposal}
                    pushPropsDesign={this.pushToDesign}
                    pushPropsFeeddback={this.pushTOFeeddback} 

                  />

                </div>
                <div style={{paddingLeft:'3%'}}>
                <div styles={styles.borders} className="assign_info_text">
                    <div> <img width='24px' height="24px" src={require('./Images/thumb_up.png')} /></div>
                    <div>
                    Wasn’t that easy? We’ve successfully generated your application.
                    Please allow 2 days for the final project proposal, with an estimated time and cost for Monochrome.
                 </div>
                </div>
                <div className="small_info_text margin_top">
                    Your proposal will appear here..
               </div>
                <div className="assimnt_box margin_top">
                    <div className="Rectangle-6">
                    </div>
                    <div>
                        <div className="assmnt_text_marging_le_40">
                            Proposal for Monochrome
                        </div>
                        <div className="assmnt_text_bottom">
                            <span><img width='20px' height='20px' src={require('./Images/envelope.svg')} /> Mail yourself</span>
                            <span className="margin_left"> <img width='20px' height='20px' src={require('./Images/download-arrow.svg')} />Download Proposal</span>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '35px',marginBottom:'200px' }}>
                    <Tooltip
        title={<span>Meanwhile, you could  <span><u> read</u></span>         about how 1THING works.</span>} />
                </div>
                </div>
            </div>
        )
    }
}
