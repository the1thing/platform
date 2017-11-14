import { setLoader, removeLoader, setUserInformation } from "./UserActions";
import axios from "axios";

export function getUserInformation(_apiurl) {
  return dispatch => {
    dispatch(setLoader());
    axios({
      method: "get",
      url: _apiurl,
    })
      .then(response => {
        
        console.log("getUserInformation",response.data.data);
         if(response.data.data !== null || response.data.data !== 'null' ){
            dispatch(setUserInformation(response.data.data));  
            // localStorage.setItem("userName", response.data.data.name);
            // localStorage.setItem("userId", response.data.data._id);
            // localStorage.setItem("userType", response.data.data.userType),
            // localStorage.setItem("signUpDate", response.data.data.createdAt);
         }
         else{
           let _temp={
             noData:'noData'
           }
          dispatch(setUserInformation(_temp));  
         }
         dispatch(removeLoader());
      })
      .catch(error => {
        console.log("in error");
         dispatch(removeLoader());
      });
  };
}