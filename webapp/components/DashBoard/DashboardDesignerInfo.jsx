import React, { Component } from 'react'

export default class DashboardDesignerInfo extends Component {
    render() {
        return (
            <div>
              <div style={{border:'1px solid #f7f7f7'}} className="view-container">
                 <div style={{marginBottom:'8px'}}> <span style={{textTransform:'capitalize'}}>{localStorage.getItem('userName')}</span> , This is your space .. <img  width='24px' src={require('./Images/1f60a.png')}/></div>
                 <div>
                 Here you can design, discuss & manage your project with 1THING.For join <span className="clickable_text">1THING Design Network</span> you need to complete onboarding first
                <img  width='24px' src={require('./Images/1f447.png')}/>  
                so that we can understand your skills and expertise.<br/>
                If you have any query you can also talk to us, 1THING is<span className="clickable_text"> here</span> to guide you ahead.
                </div>
            </div>
          </div>
        )
    }
}
