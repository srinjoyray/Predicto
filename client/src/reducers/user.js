import { LEADERBOARD,FETCH_USER } from '../constants/actionTypes';

const userReducer = (state={authData : null},action)=>{
    // console.log(action.data);
    switch(action.type){
        case LEADERBOARD :
            return action.data;   
        case FETCH_USER :  
            return action.data;
        default :
            return state;
    }
}
export default userReducer;