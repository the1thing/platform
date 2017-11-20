let initialState = {
  userTypeInfo: {},
  allProjectWorkspace: {},
  aboutProduct: {},
  aboutDesign: {},
  aboutTimeline:{},
  aboutUser:{},
  userPerspective:{},
  userExpertise:{},
  userRating:{},
  //  loading: false
};

export default function dashboard(state = initialState, action) {
   console.log("reducer called------>",action.data)
  switch (action.type) {
    case "SET_USERTYPE":
      return {
        ...state,
        userTypeInfo: action.data
      };
    case "SET_ALLPROJECTWORKSPACE":
      return {
        ...state,
        allProjectWorkspace: action.data
      };
    case "SET_ADDUPDATEPRODUCT":
      return {
        ...state,
        aboutProduct: action.data
      };
    case "SET_ADDUPDATEDESIGN":
      return {
        ...state,
        aboutDesign: action.data
      };
    case "SET_ADDUPDATETIMELINE":{
      return{
        ...state,
        aboutTimeline:action.data,
      }
    }
    case "SET_ADDUPDATEUSER":{
      return{
        ...state,
        aboutUser:action.data,
      }
    }
    case "SET_ADDUPDATEEXPERTISE":{
      return{
        ...state,
        userExpertise:action.data,
      }
    }
    case "SET_ADDUPDATEPERSPECTIVE":{
      return{
        ...state,
        userPerspective:action.data,
      }
    }
    case "SET_ADDUPDATERATING":{
      return{
        ...state,
        userRating:action.data,
      }
    }
    default:
      return state;
  }
}
