import React, { Component } from 'react'

export default class DashboardDesignerInfo extends Component {
    render() {
        return (
            <div>
              <div className="view-container">
                 <div style={{marginBottom:'8px'}}> <span style={{textTransform:'capitalize'}}>{localStorage.getItem('userName')}</span>! This is your WorkSpace.<img  width='24px' src={require('./Images/1f60a.png')}/></div>
                 <div>
                 <div style={{marginBottom:'8px'}}>
                     Welcome to the era of<span onClick={()=>window.open("https://1thing.io/communication/right-design-team").location} className="clickable_text"> Seamless Design Communication</span> - the easiest way of working together.
                </div>
                <div>
                    First things first, in order to join 1THING Design Network you must complete the onboarding.
                </div>
                 {/* Here you can design, discuss & manage your project with 1THING.For join <span onClick={()=>window.open("https://1thing.io/communication/1thing-design-network").location} className="clickable_text">1THING Design Network</span> you need to complete onboarding first
                <img  width='24px' src={require('./Images/1f447.png')}/>  
                so that we can understand your skills and expertise.<br/> */}
                {/* If you have any query you can also talk to us, 1THING is<span onClick={()=>window.open("https://workspace.1thing.io").location}  className="clickable_text"> here</span> to guide you ahead. */}
                </div>
            </div>
          </div>
        )
    }
}
// Tyrion! This is your WorkSpace.
// Welcome to the era of Seamless Design Communication - the easiest way of working together.
// First things first, in order to join 1THING Design Network you must complete the onboarding.

