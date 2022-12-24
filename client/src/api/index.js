import axios from 'axios';

const API = axios.create({baseURL:'https://predicto.onrender.com'});
// const API = axios.create({baseURL:'https://predicto2.herokuapp.com'});
// const API = axios.create({baseURL:'http://localhost:5000'});


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` ;
    }
    return req;
});


export const getUser = (email) => API.get('/user/profile',email);
export const leaderboard = () => API.get('/user/leaderboard');

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);
export const googleLogin = (data) => API.post('/user/googlelogin',data);

export const updateFavouriteTeam = (data) => API.patch('/user/updateFavouriteTeam',data); 
export const updataGames = (data) => API.patch('/user/updateGames',data);

export const deleteUser = () => API.delete('/user/deleteUser');
export const deleteGame = (data) => API.patch('/user/deleteGame',data);
