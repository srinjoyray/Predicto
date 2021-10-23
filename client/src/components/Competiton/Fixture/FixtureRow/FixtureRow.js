import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import PredictModal from "../Predict/PredictModal";
import './FixtureRow.css';


const FixtureRow = ({item,games}) => {
    
    // console.log(games);

    const [score1, setScore1] = useState(-1);
    const [score2, setScore2] = useState(-1);
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    

    const [logo1,setLogo1] = useState("");
    const [logo2,setLogo2] = useState("");
   
    // console.log({item});
    const fetchLogo = async () => {
        const getLogo1 = await axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${item["home-team"].name}`);
        if(getLogo1?.data?.teams){
            setLogo1(getLogo1?.data?.teams[0]?.strTeamBadge);
        }
        
        const getLogo2 = await axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${item["away-team"].name}`);
        if(getLogo2?.data?.teams){
            setLogo2(getLogo2?.data?.teams[0]?.strTeamBadge);
        }
    }
    const calculateTime = (date=0,time=0) => {
        return (Date.parse(date+"T"+time))+16200000;
    }
    const time = new Date(calculateTime(item?.date,item?.time));
    const isPredictable = (calculateTime(item?.date,item?.time) - Date.now())<=86400*1000*7 ;
    useEffect(() => {
        fetchLogo();
        // console.log(item);
        const time = new Date(calculateTime(item?.date,item?.time));
        // console.log(time.getHours());
        // console.log(moment(time).format("HH"));
        
        
        if(games && isPredictable){
            games.map((game)=>{
                if(game.id===item.id){
                    setScore1(game.homeTeamScore);
                    setScore2(game.awayTeamScore);
                    setCounter1(game.homeTeamScore);
                    setCounter2(game.awayTeamScore);
                    // console.log(score1,score2);
                }
            })
        }
        
        // eslint-disable-next-line
    }, []);
    
    // console.log(score1,score2);
   
    return (
        <div className="fix-row">
        <div key={item.id} className="fix-row-body">
            <div className="fix-time">
            {time.getHours()<=9 ? '0':''}{time.getHours()} : {time.getMinutes()}{time.getMinutes()<=9 ? '0':''}
            </div>
            <div className="fix-row-name">
                <span className="fix-team1">{item["home-team"].name}<img src={logo1} width="20px" height="20px"/></span>
                
                <span className="fix-team2"><img src={logo2} width="20px" height="20px"/>{item["away-team"].name}</span>  
            </div>
            <div className="fix-row-prediction">
                <span className="fix-team1">({score1!=-1 ? score1:'-'})</span>
                <span className="fix-team2">({score2!=-1 ? score2:'-'})</span>
            </div>
            
       
        {
            isPredictable && 
            <div className="btn">
                <PredictModal item={item} score1={score1} score2={score2} setScore1={setScore1} setScore2={setScore2} counter1={counter1} counter2={counter2} setCounter1={setCounter1} setCounter2={setCounter2} />
            </div>
        }
        </div>
        </div>
    )
}

export default FixtureRow
