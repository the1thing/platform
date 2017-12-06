import {
  setAllProjectsForWorkspace,
  setUserInformation,
  setAboutProductData,
  setAboutDesignData,
  setAboutTimelineData,
  setAboutUserData,
  setAboutExpertiseData,
  setAboutPerspectiveData,
  setUserRatingData
} from "./UserActions";
import axios from "axios";

// ----------------------------identy user-------------------------
export function getUserInformation(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data.data !== null) {
          localStorage.setItem('dashVisibility',true)
          dispatch(setUserInformation(response.data.data));
        } else {
          localStorage.setItem('dashVisibility',false);
          let _temp = {
            userType: "",
            _id: "",
            userName: "",
            updatedAt: "",
            channelName: "",
            createdAt: ""
          };
          dispatch(setUserInformation(_temp));
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

// ---------------------------client details---------------------------
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
        console.log(error);
      });
  };
}

// ----------------------------product details---------------------------
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
        console.log(error);
      });
  };
}
export function setproductAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  id,
  getClientApi
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        let productId = id == "" ? response.data.data._id : id;
        dispatch(getAboutproductData(_apigeturl + productId + "?stage=1"));
        dispatch(getClientInformation(getClientApi));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// ------------------------------about design details---------------------------
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
        console.log(error);
      });
  };
}
export function setDesignAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  _getClientUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutDesignData(_apigeturl));
        dispatch(getClientInformation(_getClientUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// ----------------------------about timeline details------------------------------
export function getAboutTimelineData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutTimelineData(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setTimelineAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  _getClientUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutTimelineData(_apigeturl));
        dispatch(getClientInformation(_getClientUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

//-----------------------------designer details------------------------------
export function getDesignerInformation(_apiurl) {
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
        console.log(error);
      });
  };
}

// ---------------------------------about user details---------------------------------
export function getAboutUserData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutUserData(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setUserAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  getDesignerUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutUserData(_apigeturl));
        dispatch(getDesignerInformation(getDesignerUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

//---------------------------------about expertise details---------------------------
export function getAboutExpertiseData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutExpertiseData(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setExpertiseAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  getDesignerUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutExpertiseData(_apigeturl));
        dispatch(getDesignerInformation(getDesignerUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// -------------------------------user perspective details--------------------------------
export function getAboutPerspectiveData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setAboutPerspectiveData(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setPerspectiveAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  getDesignerUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutPerspectiveData(_apigeturl));
        dispatch(getDesignerInformation(getDesignerUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// ------------------------------user userself details-------------------------------
export function getAboutRatingData(_apiurl) {
  return dispatch => {
    axios({
      method: "get",
      url: _apiurl
    })
      .then(response => {
        if (response.data !== null || response.data !== "null") {
          dispatch(setUserRatingData(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setRatingAddUpdate(
  _apimethod,
  _apiurl,
  _apidata,
  _apigeturl,
  getDesignerUrl
) {
  return dispatch => {
    axios({
      method: _apimethod,
      url: _apiurl,
      data: _apidata
    })
      .then(response => {
        dispatch(getAboutRatingData(_apigeturl));
        dispatch(getDesignerInformation(getDesignerUrl));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
