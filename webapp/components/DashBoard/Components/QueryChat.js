import React, { Component } from 'react'
import '../Styles/queryChat.scss';
import {browserHistory} from 'react-router/es6';
// import ReactTooltip from 'react-tooltip';

export default class QueryChat extends Component {
    constructor(props){
        super();
        this.state={
            visible_chat:'hidden',
        }
    }
    goToHome=()=>{
       browserHistory.push('/');
    }
    render() {
        return (
            <div onClick={()=>{this.goToHome()}}>
               
             <div className="chat_icon_div">

               <div style={{visibility:this.state.visible_chat}} className="Rectangle-7">
                   <div className="profile_pic_div">
                     <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                     <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                   </div>
                 <div className="Rec_7_content">
                   Hi Eshaan, <br/>
                     I am your onboarding manager at 1THING.
                      Let me know if you hit any obstacle. I am available <a href="#">here.</a>
                    </div>  
                </div>
                <div className="chat_icon">
                    <img onClick={()=>{  this.state.visible_chat=='visible'?this.setState({visible_chat:'hidden'}):this.setState({visible_chat:'visible', }) }}
                    width='50px' height='50px' src={require('../Images/floating-button.svg')}/>
                </div>
              </div>
            </div>
        )
    }
}
