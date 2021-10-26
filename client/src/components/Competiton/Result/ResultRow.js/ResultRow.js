import { useState, useEffect } from "react";
import axios from 'axios';
import { TableCell,TableRow } from "@material-ui/core"
import './ResultRow.css';

const ResultRow = ({item,games}) => {

    const [score1, setScore1] = useState(-1);
    const [score2, setScore2] = useState(-1);

    const [logo1,setLogo1] = useState("");
    const [logo2,setLogo2] = useState("");
    // console.log(item.status.full[0]);
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

    useEffect(() => {
        fetchLogo();

        if(games){
            games.map((game)=>{
                if(game.id===item.id){
                    setScore1(game.homeTeamScore);
                    setScore2(game.awayTeamScore);
                    // console.log(score1,score2);
                }
            })
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="res-row">
        <div key={item.id} className="res-row-body">
            <div className="res-row-name">
                <span className="res-team1">{item["home-team"].name}<img src={logo1} width="20vw" height="20px"/></span>
                <span className="res-score1">{item["home-team"].score}</span>
                <span className="res-hyphen">:</span>
                <span className="res-score2">{item["away-team"].score}</span>
                <span className="res-team2"><img src={logo2} width="20vw" height="20px"/>{item["away-team"].name}</span>
            </div>
           
            <div className="fix-row-prediction">
                <span className="res-team1">({score1!=-1 ? score1:'-'})</span>
                <span className="res-team2">({score2!=-1 ? score2:'-'})</span>
            </div>
            
            <div className="status">{item.status.full}</div> 
        </div>
        </div>
    )
}

export default ResultRow
