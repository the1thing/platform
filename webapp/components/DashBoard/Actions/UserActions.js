import {LOADER_TRUE,LOADER_FALSE, SET_USERTYPE} from '../../../reducers/views/dashboard';
export function setUserInformation(data){
    return {
        type:'SET_USERTYPE',
        data
    }
}
export function setLoader(){
    return{
        type:'LOADER_TRUE'
    }
}
export function removeLoader(){
    return{
        type:'LOADER_FALSE'
    }
}