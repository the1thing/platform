// import React, { Component } from 'react';
// import {browserHistory} from 'react-router/es6';
// import MyComponents from './MyComponents';
// import  DashboardHeader from './DashboardHeader'
// import  DashboardInfo from './DashboardInfo'
// import  DashboardProgress from './DashboardProgress'
// import  OnboardManifesto from './OnboardManifesto'
// import OnboardAssignment from './OnboardAssignment'
// import MonochromeProposal from './MonochromeProposal'
// import QueryChat from './Components/QueryChat'

// import './Dashboard.scss';
// class Dashboard extends Component {
//   render() {
//     return (
//       <div>
//         <div className="_header">
//            <DashboardHeader/> 
//         </div>
//          <div className="dashboard-container">
//           <div style={{border:'1px solid red'}}>
//               <DashboardInfo/>  
//                 <MyComponents/>    
//              <OnboardManifesto/>
//              <OnboardAssignment/>
//              <MonochromeProposal/>    
//           </div>
//           <div style={{width:'27%'}}>
//             <div className="progress-container">
//                <DashboardProgress/>    
//             </div>
//             <QueryChat/> 
//           </div>
//         </div>  
//       </div>
//     );
//   }
// }

// export default Dashboard;



import React, { Component } from 'react'
import { browserHistory } from 'react-router/es6';
import axios from 'axios';
import OnboardingDesigner from './OnboardingDesigner';
import OnboardingClient from './OnboardingClient';
import { basepath } from './utils/constant';
import './App.scss';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
        }
    }
    getCookie=(name)=> {
       // console.log('-------------->>',name);
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    componentWillMount() {
        let uId=this.getCookie('MMUSERID');
       // console.log('----->',uId)
        // k5iu4qh1kfy1iyft4dh7gwus3r  designer
        // axios.get(basepath + 'user/getUser/8pi33tgbe38ypq5xr378bcbjwa') //b5moybzsetncpqg88y6icxu48o
        // axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //client
         //axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //designer
      //  axios.get(basepath + 'user/getUser/'+uId)
      axios({
          method:'get',
          url:basepath + 'user/getUser/'+'pwgy5iddnfnw9edp7mdb966tke'
      })
            .then((resp) => {
                console.log(resp.data.data.userType,'------------>',resp)
                this.setState({
                    userType: resp.data.data.userType,
                })
                localStorage.setItem('userName', resp.data.data.name);
                localStorage.setItem('userId', resp.data.data._id);
                localStorage.setItem('projectDate', resp.data.data.createdAt)
                localStorage.setItem('designerProgressId','pwgy5iddnfnw9edp7mdb966tke')
            })
            .catch((err) => {
                console.log("errorrrrrrrrrrrrrrrr123", err)
            })
    }

    render() {
        if (this.state.userType == 'client') {
            return (
                <div>
                    <OnboardingClient />
                    {/* <OnboardingDesigner/>  */}
                </div>
            )
        }
        else if (this.state.userType == 'designer') {
            return (
                <div>
                    {/* <OnboardingClient /> */}
                     <OnboardingDesigner/>  
                </div>
            )
        }
        else {
            return (
                <div>
                    {/* {<OnboardingClient/>  } */}
                    You have no workspace. Please start Afresh.
               {/* <OnboardingDesigner/>    */}
                </div>
            )
        }
    }
}




