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

import React, { Component } from "react";
import { browserHistory } from "react-router/es6";
import axios from "axios";
import OnboardingDesigner from "./OnboardingDesigner";
import OnboardingClient from "./OnboardingClient";
import { basepath } from "./utils/constant";
import { connect } from "react-redux";
import "./App.scss";
import {getUserInformation} from './Actions/AsyncActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      loading: false,
      dashboardIconClass:'',
    };
  }
  getCookie = name => {
    // console.log('-------------->>',name);
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return value != null ? unescape(value[1]) : null;
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading:true,
    })
    let temp=nextProps.dashboardState.userTypeInfo;
    this.setState({
      userType:temp.userType,
      loading:false,
    })
  }
  
  componentWillMount() {
    if (window.location.href.includes("dashboard")) {
    //   this.setState({
    //     dashboardIconClass: "dashboard-active-icon"
    //   });
    } else {
      this.setState({
        dashboardIconClass: "",
      });
    }

    // this.setState({
    //   loader: true
    // });
    // console.log('----->',uId)
    // k5iu4qh1kfy1iyft4dh7gwus3r  designer
    // axios.get(basepath + 'user/getUser/8pi33tgbe38ypq5xr378bcbjwa') //b5moybzsetncpqg88y6icxu48o
    // axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //client
    //axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //designer
    //  axios.get(basepath + 'user/getUser/'+uId)
    //designer aaf5yhz9pjbfjnabwsccctus5e
    // axios({
    //   method: "get",
    //   url: basepath + "user/getUser/" + uId,
    // })
    //   .then(resp => {
    //     console.log(resp.data.data.userType, "api data------------>", resp);
    //     this.setState({
    //       userType: resp.data.data.userType
    //     });
    //     localStorage.setItem("userName", resp.data.data.name);
    //     localStorage.setItem("userId", resp.data.data._id);
    //     localStorage.setItem("userType", resp.data.data.userType),
    //       localStorage.setItem("signUpDate", resp.data.data.createdAt);
    //     this.setState({
    //       loader: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loader: false
    //     });
    //     console.log("errorrrrrrrrrrrrrrrr123", err);
    //   });  var arr = checkboxArray.filter((v)=>v!==value);
    // client 8pi33tgbe38ypq5xr378bcbjwa
    //ij7s8nft4fduf8ys6pt3g54for  hipfqsojdp84bntcoce7wjk1ia up9hakdow3ywfg59snhesh49sc uqtasosqyinwuxsgqsnfzti53y
    let uId = this.getCookie("MMUSERID");
    let url = basepath + "user/getUser/" + uId;
    this.props.getUserInfo(url);
  }
  // getData=()=>{
  //   let uId = this.getCookie("MMUSERID");
  //   let url = basepath + "user/getUser/" + 'hgy16f4m6pdupfspnuuepsccfr';
  //   let data = {
  //     userType: resp.data.data.userType,
  //     userName: resp.data.data.name,
  //     userId: resp.data.data._id,
  //     signUpDate: resp.data.data.createdAt,
  //   };
  //   this.props.getUserInfo(url, data);
  // }
  render() {
    if (this.state.loading) {
      return <div>{/* loading... */}
      
      </div>;
    } else {
      if (this.props.dashboardState.userTypeInfo.userType === "client") {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingClient channelName={this.props.dashboardState.userTypeInfo.channelName}/>
          </div>
        );
      } else if (this.props.dashboardState.userTypeInfo.userType === "designer") {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingDesigner />
          </div>
        );
      } else{
        return (
          <div className={this.state.dashboardIconClass}>
            You have no workspace. Please start Afresh.
          </div>
        );
      }
    }
  }
}
function mapStateToProps(state) {
  return {
    dashboardState:state.views.dashboard
  };
}

function mapDispatchToProps(dispatch) {
    return {
      getUserInfo: (url) => {
        dispatch(getUserInformation(url));
      }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
