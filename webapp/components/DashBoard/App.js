import React, { Component } from 'react'
import axios from 'axios';
import OnboardingDesigner from './OnboardingDesigner';
import OnboardingClient from './OnboardingClient';
import {basepath} from './utils/constant';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            userType:'',
        }
    }
    
    componentWillMount() { 
        //b5moybzsetncpqg88y6icxu48o
        // axios.get(basepath+'user/getUser/b5moybzsetncpqg88y6icxu48o')
        // .then((resp)=>{
        //   //  console.log("response of client or designer",resp);
        //     this.setState({
        //         userType:resp.data.data.userType,
        //     })
        //     localStorage.setItem('userName',resp.data.data.userName);
        //     localStorage.setItem('userId',resp.data.data._id);
        //     localStorage.setItem('userSignUpDate',resp.data.data.createdAt)
            
            
        // })
        // .catch((err)=>{
        //     console.log("errorrrrrrrrrrrrrrrr",err)
        // })
        // b5moybzsetncpqg88y6icxu48o client bey3ipmw1ifqzk969oggrfbjde
        // k5iu4qh1kfy1iyft4dh7gwus3r  designer
        axios.get(basepath+'user/getUser/bey3ipmw1ifqzk969oggrfbjde')
        .then((resp)=>{
            console.log("response of client or designer",resp, resp.data.data.userType);
            this.setState({
                userType:resp.data.data.userType,
            })
                localStorage.setItem('userName',resp.data.data.userName);
                localStorage.setItem('userId',resp.data.data._id);
                localStorage.setItem('signUpDate',resp.data.data.createdAt)
                localStorage.setItem('designerProgressId','bey3ipmw1ifqzk969oggrfbjde')
           })
        .catch((err)=>{
            console.log("errorrrrrrrrrrrrrrrr",err)
        })

    }

    
    
    render() {
        if(this.state.userType=='client')
        {
        return (
            <div>
                <OnboardingClient/>
                {/* <OnboardingDesigner/> */}
            </div>
        )
    }
    else if(this.state.userType=='designer'){
        return (
            <div>
                <OnboardingDesigner/>
                {/* <OnboardingClient/> */}
            </div>
        )
    }
    else {
        return(
        <div>
            You have no workspace. Please start Afresh.
        </div>
        )
    }
  }
}
