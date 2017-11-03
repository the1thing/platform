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
            loader:true,
        }
    }
    
    componentWillMount() { 
        this.setState({
            loader:true,
          })
        localStorage.clear()
         // new designer  bkxrfe5jhjgxjmer1suehk8dnc
         ///  new client  su3x1a3p83fnxy7ep7usbh9k6r
         //new designer aaf5yhz9pjbfjnabwsccctus5e
         ///  client   bq9x35q5m7dmzc9ccozmrdjrye
         /// client  5ukm6wohbjr1mkyj1y4uox6s4c
         //  designer   3kfn9qyugtfqbed48qiqs6grxc
         // des mnawartzcpraff5di1x33j6dnw
         /// work space  http://staging.1thing.io/dashboard
         // new designer   ferwodkzabgtucoi4bscd6hepw
         // new desi    31sa6oomb7b19m71us3ihgkbyr//izkfhkwfqfygzf9gu1aan9dc5o
         // new clien  yco81a7iu7rrjy1cnfhi68wice
         // client   ri3nod3nwtnpppous9xcbxmp7o\
         //  designer   5euyqmk573bypj7ie3q9zmrecy
         // client  3pimn5oa97y4zpsggk9dqjo3nc
         // desig   f6xnc8b8fffwdnjbuz1fkwu8hr
        axios.get(basepath+'user/getUser/f6xnc8b8fffwdnjbuz1fkwu8hr')
         .then((resp)=>{
            console.log('appapp@@@@@@@@@@@@',resp)
            this.setState({
                       userType:resp.data.data.userType,
                     })
                localStorage.setItem('userName',resp.data.data.name);
                localStorage.setItem('userId',resp.data.data._id);
                localStorage.setItem('userType',resp.data.data.userType),
                localStorage.setItem('signUpDate',resp.data.data.createdAt)
           })
           .then((resp)=>{
            this.setState({
                loader:false,
              })
           })
        .catch((err)=>{
            this.setState({
                loader:false,
              })
            console.log("errorrrrrrrrrrrrrrrr",err)
        })

    }

    
    
    render() {
        if(this.state.loader){
            return(
                <div>
                    loading ....
                </div>
            )
        }
        else{
        if(this.state.userType=='client')
        {
        return (
            <div>
                <OnboardingClient/>
                 {/* <OnboardingDesigner/>  */}
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
}
