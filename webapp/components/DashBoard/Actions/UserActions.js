import {
    //LOADER_TRUE,
    //LOADER_FALSE, 
    SET_USERTYPE,
    SET_ALLPROJECTWORKSPACE,
    SET_ADDUPDATEPRODUCT,
    SET_ADDUPDATEDESIGN,
    SET_ADDUPDATETIMELINE} from '../../../reducers/views/dashboard';
export function setUserInformation(data){
    return {
        type:'SET_USERTYPE',
        data
    }
}
// export function setLoader(){
//     return{
//         type:'LOADER_TRUE'
//     }
// }
// export function removeLoader(){
//     return{
//         type:'LOADER_FALSE'
//     }
// }

export function setAllProjectsForWorkspace(data){
    return{
        type:'SET_ALLPROJECTWORKSPACE',
        data
    }
}
export function setAboutProductData(data){
    return{
        type:'SET_ADDUPDATEPRODUCT',
        data
    }
}
export function setAboutDesignData(data){
    // console.log("called action----->",data)
    return{
        type:'SET_ADDUPDATEDESIGN',
        data
    }
}
export function setAboutTimelineData(data){
    return{
        type:'SET_ADDUPDATETIMELINE',
        data
    }
}