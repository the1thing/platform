import React, { Component } from 'react'
// import {browserHistory} from 'react-router/es6';

export default class DashboardHeader extends Component {
    render() {
        return (
            <div>
                 <span >{this.props.header_title1}
                     <div style={{borderBottom:'2px solid #030303',paddingBottom:'8px',position:'absolute',width:'48px',}}></div>
                    </span>

                 <span style={{color:"blue",marginLeft:'12px'}}>{this.props.header_title2}
                 </span>
            </div>
        )
    }
}
