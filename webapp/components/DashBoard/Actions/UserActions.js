import {
    SET_USERTYPE,
    SET_ALLPROJECTWORKSPACE,
    SET_ADDUPDATEPRODUCT,
    SET_ADDUPDATEDESIGN,
    SET_ADDUPDATETIMELINE,
    SET_ADDUPDATEUSER,
    SET_ADDUPDATEEXPERTISE,
    SET_ADDUPDATEPERSPECTIVE,
    SET_ADDUPDATERATING
} from '../../../reducers/views/dashboard';
export function setUserInformation(data){
    return {
        type:'SET_USERTYPE',
        data
    }
}
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
export function setAboutUserData(data){
    return{
        type:'SET_ADDUPDATEUSER',
        data
    }
}
export function setAboutExpertiseData(data){
    return{
        type:'SET_ADDUPDATEEXPERTISE',
        data
    }
}
export function setAboutPerspectiveData(data){
    return{
        type:'SET_ADDUPDATEPERSPECTIVE',
        data
    }
}
export function setUserRatingData(data){
    return{
        type:'SET_ADDUPDATERATING',
        data
    }
}