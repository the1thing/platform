import {
  // setLoader,
  // removeLoader,
  setAllProjectsForWorkspace,
  setUserInformation,
  setAboutProductData,
  setAboutDesignData,
  setAboutTimelineData,
} from "./UserActions";
import axios from "axios";


// identy user-----------------
export function getUserInformation(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data.data !== null) {
          dispatch(setUserInformation(response.data.data));
          // localStorage.setItem("userName", response.data.data.name);
          // localStorage.setItem("userId", response.data.data._id);
          // localStorage.setItem("userType", response.data.data.userType),
          //   localStorage.setItem("signUpDate", response.data.data.createdAt);
        } else {
          let _temp = {
            userType: "",
            _id:'',
            userName:'',
            updatedAt:'',
            channelName:'',
            createdAt:'',
          };
          dispatch(setUserInformation(_temp));
        }
      })
      .catch(error => {
        console.log( error.response);
      });
  };
}


// user details-------------
export function getClientInformation(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null) {
          dispatch(setAllProjectsForWorkspace(response.data));
        } else {

          let _temp = {
            statusBar: {
              design: {
                completed: false,
                completedDate: ""
              },
              product: {
                completed: false,
                completedDate: ""
              },
              timeline: {
                completed: false,
                completedDate: ""
              }
            },
            _id: ""
          };
          dispatch(setAllProjectsForWorkspace(_temp));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}

// product api----------------
export function getAboutproductData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutProductData(response.data));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}
export function setproductAddUpdate(_apimethod, _apiurl, _apidata, _apigeturl,getClientApi) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        getClientInformation(getClientApi);
        dispatch(getAboutproductData(_apigeturl));
      })
      .catch(error => {
        console.log( error);
      });
  };
}


// about design----------------------
export function getAboutDesignData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutDesignData(response.data));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}
export function setDesignAddUpdate(_apimethod, _apiurl, _apidata, _apigeturl) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutDesignData(_apigeturl));
      })
      .catch(error => {
        console.log( error);
      });
  };
}


// about timeline----------------------
export function getAboutTimelineData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        console.log( response);
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutTimelineData(response.data));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}
export function setTimelineAddUpdate(_apimethod, _apiurl, _apidata, _apigeturl) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutTimelineData(_apigeturl));
      })
      .catch(error => {
        console.log( error);
      });
  };
}


//designer-------------------
export function getDesignerInformation(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null) {
          console.log("response------>",response)
          dispatch(setAllProjectsForWorkspace(response.data));
        } else {

          let _temp = {
            statusBar: {
              aboutYourself: {
                completed: false,
                completedDate: ""
              },
              expertise: {
                completed: false,
                completedDate: ""
              },
              perspective: {
                completed: false,
                completedDate: ""
              },
              thinkAboutYourself: {
                completed: false,
                completedDate: ""
              }
            },
            _id: ""
          };
          dispatch(setAllProjectsForWorkspace(_temp));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}


// about user---------------------------------
export function getAboutUserData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        console.log("getAboutUserData response------>", response);
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutTimelineData(response.data));
        }
      })
      .catch(error => {
        console.log( error);
      });
  };
}
export function setUserAddUpdate(_apimethod, _apiurl, _apidata, _apigeturl) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        console.log("setUserAddUpdate response---------->",response)
        dispatch(getAboutTimelineData(_apigeturl));
      })
      .catch(error => {
        console.log( error);
      });
  };
}
