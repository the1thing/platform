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
    render() {
        return (
            <div >
                <div>
                    <DesignerTitleMenu
                        title="assignment"
                        getOnboarding={() => {
                            this.setState({
                                onboarding_display: 'block',
                                assignment_display: 'none',
                                pricing_bandwidth_display: 'none',
                                welAboard_display: 'none',
                                manifesto_display: 'block',
                                designer_info_display: 'block',

                            })
                        }}
                        getAssignment={() => {
                            this.setState({
                                onboarding_display: 'none',
                                assignment_display: 'block',
                                pricing_bandwidth_display: 'none',
                                welAboard_display: 'none',
                                manifesto_display: 'none',
                                designer_info_display: 'none',

                            })
                        }}
                        getPricing_bandwidth={() => {
                            this.setState({
                                onboarding_display: 'none',
                                assignment_display: 'none',
                                pricing_bandwidth_display: 'block',
                                welAboard_display: 'none',
                                manifesto_display: 'none',
                                designer_info_display: 'none',

                            })
                        }}
                        getWelAboard={() => {
                            this.setState({
                                onboarding_display: 'none',
                                assignment_display: 'none',
                                pricing_bandwidth_display: 'none',
                                welAboard_display: 'block',
                                manifesto_display: 'none',
                                designer_info_display: 'none',

                            })
                        }}
                    />
                </div>
                <div styles={styles.borders} className="assign_info_text">
                    <div> <img width='24px' height="24px" src={require('./Images/thumb_up.png')} /></div>
                    <div>
                        We have received your information regarding onboarding and we are processing it ..
                    In next 48 hours, we'll share assignment with you with an time you need to complete
                 </div>
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
                <div style={{ marginTop: '35px' }}>
                    <Tooltip
                        title="Meanwhile, you should check out how 1THING selects the right design team and how it makes sure that you get the best designs, in time." />
                </div>
            </div>
        )
    }
}
