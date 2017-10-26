import React, { Component } from 'react';
import './Styles/OnboardAssignment.scss';
const styles={
   borders:{
       border:'1px solid #f7f7f7'
    }
 }

export default class OnboardAssignment extends Component {
    render() {
        return (
            <div >
                <div styles={styles.borders} className="assign_info_text">
                 <div> <img width='24px'height="24px" src={require('./Images/thumb_up.png')}/></div>
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
                            <span><img width='20px' height='20px' src={require('./Images/envelope.svg')}/> Mail yourself</span>
                            <span className="margin_left"> <img width='20px' height='20px' src={require('./Images/download-arrow.svg')}/>Download Proposal</span>
                        </div>
                  </div>   
               </div>
            </div>
        )
    }
}
