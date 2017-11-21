import React, { Component } from 'react';
import channelpath from './utils/constant';

export default class DashboardClientInfo extends Component {
    render() {
        return (
            <div>
              <div className="view-container">
                 <div style={{marginBottom:'8px'}}> Welcome to your space at 1THING, <span style={{textTransform:'capitalize'}}>{localStorage.getItem('userName')}</span><img  width='24px' src={require('./Images/1f60a.png')}/></div>
                 <div>
                 This is where we discuss & design your product together. Help us learn
                 more about your product by entering details in coloured boxes below so we
                 can put together just the Right Design Team along with product plan for you.{/* <img  width='24px' src={require('./Images/1f447.png')}/>   */}
                {/* <span onClick={()=>window.open("https://1thing.io/communication/right-design-team").location} className="clickable_text"> the easiest way of working together.</span><br/> */}
               <div style={{marginTop:'8px'}}>We are 
               <a href={channelpath+this.props.channelName}><span style={{marginLeft:'6px',textDecoration: 'underline',color:'#030303'}}>here</span></a> for anything else you may want to talk about.
               {/* <span onClick={()=>window.open("https://workspace.1thing.io").location}  className="clickable_text"> here</span> to guide you ahead. */}
               </div>
                </div>
            </div>
          </div>
        )
    }
}


