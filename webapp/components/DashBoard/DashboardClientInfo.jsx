import React, { Component } from 'react'

export default class DashboardClientInfo extends Component {
    render() {
        return (
            <div>
              <div className="view-container">
                 <div style={{marginBottom:'8px'}}>  <span style={{textTransform:'capitalize'}}>{localStorage.getItem('userName')}</span>! This is your WorkSpace.<img  width='24px' src={require('./Images/1f60a.png')}/></div>
                 <div>
                 Designed specifically for you and your design team. Over here, we are reimagining 
                 the way products are built -  
                 {/* <img  width='24px' src={require('./Images/1f447.png')}/>   */}
                <span onClick={()=>window.open("https://1thing.io/communication/right-design-team").location} className="clickable_text"> the easiest way of working together.</span><br/>
               <div style={{marginTop:'8px'}}>First things first, in order to understand your Product better & find your Right Design Team, you must fill in the details.
               {/* <span onClick={()=>window.open("https://workspace.1thing.io").location}  className="clickable_text"> here</span> to guide you ahead. */}
               </div>
                </div>
            </div>
          </div>
        )
    }
}


