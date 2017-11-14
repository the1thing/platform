
let initialState={
    userTypeInfo:{},
    loading:false,
 }
 
 export default function dashboard(state=initialState,action)
 {
   console.log('reducer data', action.data)
     switch(action.type)
     {
       case 'SET_USERTYPE':
         return {
           ...state,
           userTypeInfo:action.data,
         }
       case 'LOADER_TRUE':
         return{
             ...state,
             loading:true,
         }
       case 'LOADER_FALSE':
           return{
              ...state,
              loading:false,
             }
       default:
         return state
     }
 
 }