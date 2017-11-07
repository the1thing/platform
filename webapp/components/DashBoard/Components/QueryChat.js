import React, { Component } from 'react'
import '../Styles/queryChat.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { basepath } from '../utils/constant';
// import ReactTooltip from 'react-tooltip';
export default class QueryChat extends Component {
    constructor(props){
        super();
        this.state={
            onboarding_chat:false,
            assignment_chat:false,
            requirement_chat:false,
            proposal_chat:false,
            visible_onboarding_chat:'none',
            visible_assignment_chat:'none',
            visible_requirement_chat:'none',
            visible_proposal_chat:'none',
            message1:false,
            message2:false,
            message3:false,
            message1_visibility:'none',
            message2_visibility:'none',
            message3_visibility:'none',
            stage1:false,
            stage2:false,
            stage3:false,
            stage4:false,
            stage_complete:false,
        }
    }
    
    componentWillMount=()=>{
        if(localStorage.getItem('userType')=='designer')
        this.getDesignerQueryChat();
       else if(localStorage.getItem('userType')=='client'){
        this.getClientQueryChat();
    }
        
    }
    
    componentWillReceiveProps=(nextProps)=> {
          this.setState({
            message1_visibility:'none',
            message2_visibility:'none',
            message3_visibility:'none',
          })
        if(localStorage.getItem('userType')=='designer')
        {
          let check_query=nextProps.setUserProgress;
          if(!check_query.aboutUser)
          {
                this.setState({
                  onboarding_chat:true,
                  stage1:true,
                  message1:true,
               })
               setTimeout(()=>{this.openQueryChatMessage1()},4000)   
               setTimeout(()=>{this.openQueryChatMessage2()},45000) 
          }
        else if(!check_query.aboutExpertise)
          {    
                 this.setState({
                 onboarding_chat:true,
                 stage2:true,
                 message2:true,
               })
               setTimeout(()=>{this.openQueryChatMessage2()},45000)   
          }
          else if(!check_query.aboutPerspective)
          {     
                 this.setState({
                 onboarding_chat:true,
                 stage3:true,
                 message2:true,
               })
               setTimeout(()=>{this.openQueryChatMessage2()},45000)   
              
          }
          else if(!check_query.userRating)
          {   
                 this.setState({
                 onboarding_chat:true,
                 stage4:true,
                 message2:true,
               })
               setTimeout(()=>{this.openQueryChatMessage2()},45000)   
              
          }
         else{
               this.setState({
                    onboarding_chat:false,
                    assignment_chat:true,
                    message2:true,
                    stage_complete:true,
                    })
                 setTimeout(()=>{this.openQueryChatMessage3()},4000)   
           }
        }
      else if(localStorage.getItem('userType')=='client')
          {
             let check_query=nextProps.setUserProgress;
             if(!check_query.aboutProduct)
             {    
                  this.setState({
                    requirement_chat:true,
                    stage1:true,
                    message1:true,
                 })
                 setTimeout(()=>{this.openQueryChatMessage1()},4000) 
                 setTimeout(()=>{this.openQueryChatMessage2()},45000)   
                
            }
          else if(!check_query.aboutDesign)
            {    
                   this.setState({
                   requirement_chat:true,
                    stage2:true,
                    message2:true,
                 })
                 setTimeout(()=>{this.openQueryChatMessage2()},45000)   
                
            }
            else if(!check_query.aboutTimeline)
            {   
                   this.setState({
                   requirement_chat:true,
                   stage3:true,
                    message2:true,
                 })
                 setTimeout(()=>{this.openQueryChatMessage2()},45000)   
                
            }
           else{
                 this.setState({
                     requirement_chat:false,
                     proposal_chat:true,
                     stage_complete:true,
                     message3:true,
                  })
               setTimeout(()=>{this.openQueryChatMessage3()},4000)   
             }
        }
    }
    getClientQueryChat=()=>{
        axios({
            method: 'get',
            url: basepath + 'project/getAllProjectsForWorkspace/' + localStorage.getItem('userId'),
          }).then((response) => {
            if(response.data==null){
                this.setState({
                   message1:false,
                   message2:true,
                   message3:false,
                  })
                  setTimeout(()=>{this.openQueryChatMessage1()},4000)   
                  setTimeout(()=>{this.openQueryChatMessage2()},45000)   
            }
         })
          .catch((error) => {
            console.log( 'err in get cient Query chat',error)
          });
    }
    getDesignerQueryChat=()=>{
       axios({
           method: 'get',
           url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
       }).then((response) => {
           if(response.data==null){
            setTimeout(()=>{this.openQueryChatMessage1()},5000)   
            setTimeout(()=>{this.openQueryChatMessage2()},45000)   
           }
        })
         .catch((error) => {
           console.log('get project error', error);
         });
   }

    openQueryChatMessage1=()=>{
      this.setState({
        message1_visibility:'block',
        message2_visibility:'none',
        message3_visibility:'none',
      })
     setTimeout(()=>{this.openQueryChatMessage2()},45000)  
     
    }
    openQueryChatMessage2=()=>{
        this.setState({
        message1_visibility:'none',
        message2_visibility:'block',
        message3_visibility:'none',
      })
    //     if(localStorage.getItem('userType')=='designer')
    //     {
    //     if(this.state.onboarding_chat){
    //         this.setState({
    //             visible_onboarding_chat:'block',
    //             visible_assignment_chat:'none'
    //             })
    //     }
    //     else if(this.state.assignment_chat){
    //         this.setState({
    //             visible_onboarding_chat:'none',
    //             visible_assignment_chat:'block'
    //            })
    //     }
    //     setTimeout(()=>{this.closeQueryChat()},18000)   
    // }
    // else if(localStorage.getItem('userType')=='client')
    // {
    //     if(this.state.requirement_chat){
    //         this.setState({
    //             visible_requirement_chat:'block',
    //             visible_proposal_chat:'none'
    //             })
    //     }
    //     else if(this.state.proposal_chat){
    //         this.setState({
    //             visible_requirement_chat:'none',
    //             visible_proposal_chat:'block'
    //            })
    //     }
    //     setTimeout(()=>{this.closeQueryChat()},18000)   
    //  }
    }
    openQueryChatMessage3=()=>{
        this.setState({
        message1_visibility:'none',
        message2_visibility:'none',
        message3_visibility:'block',
      })
    }
    
    render() {
        return (
            <div>
               
             <div className="chat_icon_div">
              <div style={{position:'absolute'}}>   
            {/* message at comming to dashboard of client and designer */}
               <div style={{display:this.state.message1_visibility}} className="Rectangle-7">
                    <div className="profile_pic_div">
                        <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                        <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                    </div>
                    <div className="Rec_7_content">
                       Hi {localStorage.getItem('userName')}, <br/>
                        I am your onboarding manager at 1THING.
                        Let me know if you hit any obstacle. I am available
                        <a href='https://workspace.1thing.io' target='_blank'><span style={{marginLeft:'6px',textDecoration: 'underline',color:'#030303'}}>here.</span></a>
                       
                      </div>  
                </div>
                  {/* message if client or designer stuck on filling form more than one minute */}
                
            <div style={{display:this.state.message2_visibility}} className="Rectangle-7">
                    <div className="profile_pic_div">
                        <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                        <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                    </div>
                    <div className="Rec_7_content">
                      Hi {localStorage.getItem('userName')}, <br/>
                       Seems like something holding you off. If you need any help,
                        we are always
                        <a href='https://workspace.1thing.io' target='_blank'><span style={{marginLeft:'6px',textDecoration: 'underline',color:'#030303'}}>here.</span></a>
                      
                     </div>  
                </div>
            {/* message if client or designer filled all forms  */}
                
                <div style={{display:this.state.message3_visibility}} className="Rectangle-7">
                    <div className="profile_pic_div">
                        <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                        <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                    </div>
                    <div className="Rec_7_content">
                       Hi {localStorage.getItem('userName')}, <br/>
                       If we have any questions to understand scope for Monochrome, 
                       I'll ping you
                       
                        {/* <span style={{marginLeft:'6px'}} className="clickable_text" target="_blank"onClick={()=>{window.location.assign("www.google.com")}} >here.</span> */}
                        <a href='https://workspace.1thing.io' target='_blank'><span style={{marginLeft:'6px',textDecoration: 'underline',color:'#030303'}}>here.</span></a>
                      </div>  
                </div>
                </div>
                <div style={{position:'absolute'}} className="chat_icon">
                    <img onClick={()=>{ window.open('https://workspace.1thing.io','_blank') }}
                    width='50px' height='50px' src={require('../Images/floating-button.svg')}/>
                </div>
              </div>
            </div>
        )
    }
}
