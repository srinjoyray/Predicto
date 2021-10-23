import { AUTH,LEADERBOARD,FETCH_USER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData,history) => async(dispatch)=>{
    try{
        const {data} = await api.signIn(formData);

        dispatch({type:AUTH,data});

        history.push('/');
    } catch(error){
        console.log(error);
    }
}

export const signup = (formData,history) => async(dispatch)=>{
    console.log(formData);
    try{
        const {data} = await api.signUp(formData);

        dispatch({type:AUTH,data});

        history.push('/');
    } catch(error){
        console.log(error);
    }
}

export const googleLogin = (result,token,history) => async(dispatch)=>{
    try{
        const {data} = await api.googleLogin(result);

        dispatch({ type : AUTH, data:{result,token} });
        history.push('/');
    }catch(error){
        console.log(error);
    }
}

export const leaderboard = () => async(dispatch) =>{
    try{
        const {data} = await api.leaderboard();
        dispatch({type : LEADERBOARD, data:{data}});
    } catch(error){
        console.log(error);
    }
    
}

export const getUser = (email) => async (dispatch) => {
    try {
    //   dispatch({type : START_LOADING});
      const {data} = await api.getUser(email);
      dispatch({ type: FETCH_USER, data: {data} });
    //   dispatch({type : END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const updateFavouriteTeam = (favouriteTeam) => async(dispatch) =>{
    try{
        // console.log(favouriteTeam);
        const {data} = await api.updateFavouriteTeam(favouriteTeam);
        // console.log({data});
    } catch(error){
        console.log(error);
    }
};

export const updateGames = (data) => async(dispatch) => {
    try{
        // console.log(data);
        await api.updataGames(data);
    } catch(error){
        console.log(error);
    }
}

export const deleteUser = () => async(dispatch) =>{
    try{
        await api.deleteUser();
    } catch(error){
        console.log(error);
    }
}

export const deleteGame = (data) => async(dispatch) => {
    try{
        await api.deleteGame(data);
    } catch(error){
        console.log(error);
    }
}