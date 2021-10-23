import { BrowserRouter,Switch,Route,Redirect,useLocation} from "react-router-dom";
import { useEffect,useState } from "react";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Matches from './pages/Matches/Matches';
import Leaderboard  from './pages/Leaderboard/Leaderboard';
import Rules from './pages/Rules/Rules';
import Auth from "./pages/Auth/Auth";
import Profile from './pages/Profile/Profile.js';
import Footer from './components/Footer/Footer'

const App = () =>{
  let user =JSON.parse(JSON.stringify(localStorage.getItem('profile')));
  const location = useLocation();
  useEffect(() => {
    user =JSON.parse(JSON.stringify(localStorage.getItem('profile')));
  }, [location])
 
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/matches" exact component={Matches}/>
        <Route path="/rules" exact component={Rules}/>
        <Route path="/leaderboard" exact component={Leaderboard}/>
        <Route path="/profile" exact component={()=> (user? <Profile/> : <Redirect to="/auth" />) }/>
        <Route path="/auth" exact component={()=> (!user ? <Auth/> : <Redirect to="/" />)} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
