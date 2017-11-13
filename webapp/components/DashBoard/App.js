import React, { Component } from "react";
import axios from "axios";
import OnboardingDesigner from "./OnboardingDesigner";
import OnboardingClient from "./OnboardingClient";
import { basepath } from "./utils/constant";
// import { browserHistory } from 'react-router/es6';
// import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      loader: true,
      dashboardIconClass:'',
      channelName:'a',
    };
  }

  // getCookie=(name)=> {
  //     // console.log('-------------->>',name);
  //      var re = new RegExp(name + "=([^;]+)");
  //      var value = re.exec(document.cookie);
  //      return (value != null) ? unescape(value[1]) : null;
  //  }

  componentWillMount() {
    if (window.location.href.includes("dashboard")) {
      this.setState({
          dashboardIconClass:'dashboard-active-icon',
      })
    }else{
        this.setState({
            dashboardIconClass:'',
        })
    }
    // let uId=this.getCookie('MMUSERID');
    // console.log('----->',uId)
    // k5iu4qh1kfy1iyft4dh7gwus3r  designer
    // axios.get(basepath + 'user/getUser/8pi33tgbe38ypq5xr378bcbjwa') //b5moybzsetncpqg88y6icxu48o
    // axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //client
    //axios.get(basepath + 'user/getUser/pwgy5iddnfnw9edp7mdb966tke')  //designer
    //  axios.get(basepath + 'user/getUser/'+uId)

    //   axios({
    //     method:'get',
    //     url:basepath + 'user/getUser/'+'pwgy5iddnfnw9edp7mdb966tke'
    // })
    //       .then((resp) => {
    //           console.log(resp.data.data.userType,'------------>',resp)
    //           this.setState({
    //               userType: resp.data.data.userType,
    //           })
    //           localStorage.setItem('userName', resp.data.data.name);
    //           localStorage.setItem('userId', resp.data.data._id);
    //           localStorage.setItem('projectDate', resp.data.data.createdAt)
    //           localStorage.setItem('designerProgressId','pwgy5iddnfnw9edp7mdb966tke')
    //       })
    //       .catch((err) => {
    //           console.log("errorrrrrrrrrrrrrrrr123", err)
    //       })

    this.setState({
      loader: true
    });
    localStorage.clear();
    axios
      .get(basepath + "user/getUser/pjpff7qakpnp8rxyucofrh4rbr")
      .then(resp => {
        console.log("response----->",resp);
        this.setState({
          channelName:resp.data.data.channelName,
          userType: resp.data.data.userType
        });
        localStorage.setItem("userName", resp.data.data.name);
        localStorage.setItem("userId", resp.data.data._id);
        localStorage.setItem("userType", resp.data.data.userType),
          localStorage.setItem("signUpDate", resp.data.data.createdAt);
      })
      .then(resp => {
        this.setState({
          loader: false
        });
      })
      .catch(err => {
        this.setState({
          loader: false
        });
        console.log("errorrrrrrrrrrrrrrrr", err);
      });
  }

  render() {
    if (this.state.loader) {
      return <div>{/* loading .... */}</div>;
    } else {
      if (this.state.userType == "client") {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingClient channelName={this.state.channelName}/>
          </div>
        );
      } else if (this.state.userType == "designer") {
        return (
          <div className={this.state.dashboardIconClass}>
            <OnboardingDesigner channelName={this.state.channelName}/>
          </div>
        );
      } else {
        return (
          <div className={this.state.dashboardIconClass}>
            You have no workspace. Please start Afresh.
          </div>
        );
      }
    }
  }
}
