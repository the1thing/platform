import React, { Component } from 'react'

export default class DashboardClientInfo extends Component {
    render() {
        return (
            <div>
              <div className="view-container">
                 <div style={{marginBottom:'8px'}}>  <span style={{textTransform:'capitalize'}}>{localStorage.getItem('userName')}</span>, This is your space .. <img  width='24px' src={require('./Images/1f60a.png')}/></div>
                 <div>
                This is your space, here you can discuss & design your product with 1THING. For better understanding of 
                your product you need to enter product details below
                <img  width='24px' src={require('./Images/1f447.png')}/>  
                so that we can understand product and find <span className="clickable_text">Right Design Team.</span><br/>
               <div style={{marginTop:'8px'}}> If you have any query you can also talk to us, 1THING is<span className="clickable_text"> here</span> to guide you ahead.</div>
                </div>
            </div>
          </div>
        )
    }
}
