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
            visible_onboarding_chat:'hidden',
            visible_assignment_chat:'hidden',
            
         onboarding:{
                completed:{
                           value:false,
                          },
                dateOfCompletion:{
                                 value:''
                                },
                aboutYourself:{
                              completed:false,
                              completedDate:''
                              },
               yourExpertise:{
                                completed:false,
                                completedDate:''
                            },   
               yourPerspective:{
                                completed:false,
                                completedDate:''
                            }, 
               howYouThink:{
                                completed:false,
                                completedDate:''
                            }, 
               },
         }
    }
    
    componentWillMount=()=> {
        if(localStorage.getItem('userType')=='designer')
        this.getDesignerQueryChat();
        else if(localStorage.getItem('userType')=='client'){
            this.getClientQueryChat();
        }
    }
    
    componentWillReceiveProps=(nextProps)=> {
        if(localStorage.getItem('userType')=='designer')
        {
          console.log("qqqqqqqq@@@@@@@@@@@",nextProps)
          let check_query=nextProps.setUserProgress;
          if(!check_query.aboutUser)
          {     this.state.onboarding.completed.value=false,
                this.setState({
                  onboarding:this.state.onboarding,
                  onboarding_chat:true,
               })
               setTimeout(()=>{this.openQueryChat()},15000)   
              
          }
        else if(!check_query.aboutExpertise)
          {     this.state.onboarding.completed.value=false,
                 this.setState({
                 onboarding_chat:true,
                 onboarding:this.state.onboarding,
               })
               setTimeout(()=>{this.openQueryChat()},15000)   
              
          }
          else if(!check_query.aboutPerspective)
          {     this.state.onboarding.completed.value=false,
                 this.setState({
                 onboarding_chat:true,
                 onboarding:this.state.onboarding,
               })
               setTimeout(()=>{this.openQueryChat()},15000)   
              
          }
          else if(!check_query.userRating)
          {     this.state.onboarding.completed.value=false,
                 this.setState({
                 onboarding_chat:true,
                 onboarding:this.state.onboarding,
               })
               setTimeout(()=>{this.openQueryChat()},15000)   
              
          }
         else{
              this.state.onboarding.completed.value=true,
               this.setState({
                  onboarding_chat:false,
                  assignment_chat:true,
                 requirement:this.state.requirement,
               })
                   setTimeout(()=>{this.openQueryChat()},4000)   
           }
        } 
        else if(localStorage.getItem('userType')=='client'){
        //     console.log("qqqqqqqq@@@@@@@@@@@",nextProps)
        //     let check_query=nextProps.setUserProgress;
        //     if(!check_query.aboutUser)
        //     {     this.state.onboarding.completed.value=false,
        //           this.setState({
        //             onboarding:this.state.onboarding,
        //             onboarding_chat:true,
        //          })
        //          setTimeout(()=>{this.openQueryChat()},15000)   
                
        //     }
        //   else if(!check_query.aboutExpertise)
        //     {     this.state.onboarding.completed.value=false,
        //            this.setState({
        //            onboarding_chat:true,
        //            onboarding:this.state.onboarding,
        //          })
        //          setTimeout(()=>{this.openQueryChat()},15000)   
                
        //     }
        //     else if(!check_query.aboutPerspective)
        //     {     this.state.onboarding.completed.value=false,
        //            this.setState({
        //            onboarding_chat:true,
        //            onboarding:this.state.onboarding,
        //          })
        //          setTimeout(()=>{this.openQueryChat()},15000)   
                
        //     }
        //     else if(!check_query.userRating)
        //     {     this.state.onboarding.completed.value=false,
        //            this.setState({
        //            onboarding_chat:true,
        //            onboarding:this.state.onboarding,
        //          })
        //          setTimeout(()=>{this.openQueryChat()},15000)   
                
        //     }
        //    else{
        //         this.state.onboarding.completed.value=true,
        //          this.setState({
        //             onboarding_chat:false,
        //             assignment_chat:true,
        //            requirement:this.state.requirement,
        //          })
        //              setTimeout(()=>{this.openQueryChat()},4000)   
        //      }


        }
    }
    
    openQueryChat=()=>{
        if(this.state.onboarding_chat){
            this.setState({
                visible_onboarding_chat:'visible',
                visible_assignment_chat:'hidden'
                })
        }
        else if(this.state.assignment_chat){
            this.setState({
                visible_onboarding_chat:'hidden',
                visible_assignment_chat:'visible'
               })
        }
        setTimeout(()=>{this.closeQueryChat()},15000)   
    }
     closeQueryChat=()=>{
              this.setState({
                visible_onboarding_chat:'hidden',
                visible_assignment_chat:'hidden'
              })
    }
    getClientQueryChat=()=>{
        // axios({
        //     method: 'get',
        //     url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
        // }).then((response) => {
        //     console.log("chhhhhhhhhhhhhhhh--------->",response)
        //     if(response.data!=null){
        //     let _tempStatus=response.data.statusBar;
        //     this.state.onboarding.dateOfCompletion=_tempStatus.thinkAboutYourself.completedDate;
        //     this.state.onboarding.aboutYourself=_tempStatus.aboutYourself;
        //     this.state.onboarding.yourExpertise=_tempStatus.expertise;
        //     this.state.onboarding.yourPerspective=_tempStatus.perspective;
        //     this.state.onboarding.howYouThink=_tempStatus.thinkAboutYourself;
        //     if(!_tempStatus.aboutYourself.completed)
        //         {     this.state.onboarding.completed.value=false,
        //              this.setState({
        //              onboarding:this.state.onboarding,
        //              onboarding_chat:true,
        //              })
        //         setTimeout(()=>{this.openQueryChat()},15000)   
                
                    
        //         }
        //       else if(!_tempStatus.expertise.completed)
        //         {     this.state.onboarding.completed.value=false,
        //              this.setState({
        //                onboarding_chat:true,
        //                onboarding:this.state.onboarding,
        //              })
        //         setTimeout(()=>{this.openQueryChat()},15000)   
                
                    
        //         }
        //        else if(!_tempStatus.perspective.completed)
        //         {     this.state.onboarding.completed.value=false,
        //              this.setState({
        //                onboarding_chat:true,
        //               onboarding:this.state.onboarding,
        //              })
        //         setTimeout(()=>{this.openQueryChat()},15000)   
                
        //         } 
        //         else if(!_tempStatus.thinkAboutYourself.completed)
        //         {
        //             this.state.onboarding.completed.value=false,
        //              this.setState({
        //                onboarding_chat:true,
        //                onboarding:this.state.onboarding,
        //              })
        //         setTimeout(()=>{this.openQueryChat()},15000)   
                
        //         }
        //        else{
        //             this.state.onboarding.completed.value=true,
        //              this.setState({
        //                 onboarding_chat:false,
        //                 assignment_chat:true,
        //                requirement:this.state.requirement,
        //              })
        //                 setTimeout(()=>{this.openQueryChat()},15000)   
        //          }
        //       }
        //  })
        //   .catch((error) => {
        //     console.log('get project error', error);
        //   });

    }
    getDesignerQueryChat=()=>{
       axios({
           method: 'get',
           url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
       }).then((response) => {
           console.log("chhhhhhhhhhhhhhhh--------->",response)
           if(response.data!=null){
           let _tempStatus=response.data.statusBar;
           this.state.onboarding.dateOfCompletion=_tempStatus.thinkAboutYourself.completedDate;
           this.state.onboarding.aboutYourself=_tempStatus.aboutYourself;
           this.state.onboarding.yourExpertise=_tempStatus.expertise;
           this.state.onboarding.yourPerspective=_tempStatus.perspective;
           this.state.onboarding.howYouThink=_tempStatus.thinkAboutYourself;
           if(!_tempStatus.aboutYourself.completed)
               {     this.state.onboarding.completed.value=false,
                    this.setState({
                    onboarding:this.state.onboarding,
                    onboarding_chat:true,
                    })
               setTimeout(()=>{this.openQueryChat()},15000)   
               
                   
               }
             else if(!_tempStatus.expertise.completed)
               {     this.state.onboarding.completed.value=false,
                    this.setState({
                      onboarding_chat:true,
                      onboarding:this.state.onboarding,
                    })
               setTimeout(()=>{this.openQueryChat()},15000)   
               
                   
               }
              else if(!_tempStatus.perspective.completed)
               {     this.state.onboarding.completed.value=false,
                    this.setState({
                      onboarding_chat:true,
                     onboarding:this.state.onboarding,
                    })
               setTimeout(()=>{this.openQueryChat()},15000)   
               
               } 
               else if(!_tempStatus.thinkAboutYourself.completed)
               {
                   this.state.onboarding.completed.value=false,
                    this.setState({
                      onboarding_chat:true,
                      onboarding:this.state.onboarding,
                    })
               setTimeout(()=>{this.openQueryChat()},15000)   
               
               }
              else{
                   this.state.onboarding.completed.value=true,
                    this.setState({
                       onboarding_chat:false,
                       assignment_chat:true,
                      requirement:this.state.requirement,
                    })
                       setTimeout(()=>{this.openQueryChat()},15000)   
                }
             }
        })
         .catch((error) => {
           console.log('get project error', error);
         });
   }
    render() {
        return (
            <div>
               
             <div className="chat_icon_div">

               <div style={{visibility:this.state.visible_onboarding_chat}} className="Rectangle-7">
                   <div className="profile_pic_div">
                     <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                     <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                   </div>
                 <div className="Rec_7_content">
                   Hi {localStorage.getItem('userName')}, <br/>
                     I am your onboarding manager at 1THING.
                      Let me know if you hit any obstacle. I am available
                       <span style={{marginLeft:'6px'}} className="clickable_text" target="_blank"onClick={()=>{window.location.assign("www.google.com")}} >here.</span>
                    </div>  
                </div>
                <div style={{visibility:this.state.visible_assignment_chat}} className="Rectangle-7">
                   <div className="profile_pic_div">
                     <img className="profile_pic_live_circle" src={require('../Images/live_pic.svg')} />  
                     <img className="profile_pic_circle" src={require('../Images/seagulls-401453_960_720.jpg')} />
                   </div>
                 <div className="Rec_7_content">
                   Hi {localStorage.getItem('userName')}, <br/>
                     I am your onboarding manager at 1THING.
                      Let me know if you hit any obstacle. I am available
                       <span style={{marginLeft:'6px'}} className="clickable_text" target="_blank"onClick={()=>{window.location.assign("www.google.com")}} >here.</span>
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
