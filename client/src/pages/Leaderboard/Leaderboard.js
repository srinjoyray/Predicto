import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { leaderboard } from '../../actions/auth';
import axios from 'axios';

import './Leaderboard.css';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state)?.user?.data;
    let sortedData;
    const [ucl,setUcl] = useState('');
    const [laLiga,setLaLiga] = useState('');
    const [pl,setPl] = useState('');

    const pointFunction = (predicted1,predicted2,actual1,actual2) =>{
        // console.log(predicted1,predicted2,actual1,actual2);
        let ans=0;
        let predictedOutcome = predicted1-predicted2;
        let actualOutcome = actual1-actual2;
        if(predictedOutcome===actualOutcome)ans+=3;
        if(predicted1-predicted2===actual1-actual2) ans+=1;
        if(predicted1===actual1) ans+=1;
        if(predicted2===actual2) ans+=1;

        return ans;
    }

    const calculatePoints = (item) => {
        // console.log(item);
        let count=0,noOfGames=0;
        item?.games?.map((game)=>{
            ucl?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    noOfGames++;
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
            laLiga?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    noOfGames++;
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
            pl?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    noOfGames++;
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
        })
        if(noOfGames===0){
            return 0;
        }
        return count/noOfGames;
    }   
    const fetchResult = async() =>{
        const data1 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=24`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setUcl(data1.data['fixtures-results']);
        
        const data2 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=94`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setLaLiga(data2.data['fixtures-results']);
        
        let data3 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=1`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setPl(data3.data['fixtures-results']);
                
    }
    const sortData = async() =>{
        // console.log(data);
        sortedData = data?.sort((a, b) => {
            return b?.p - a?.p;
        });
        // console.log(sortedData);
    }
    // console.log(ucl);
    // console.log(laLiga);
    // console.log(pl);
    useEffect(() => {
        dispatch(leaderboard());

        fetchResult();

        
    }, [])
    
    // console.log(data);
    // console.log(sortedData);
    if(data && data[0]){
        data?.map((item)=>{
            item.p=calculatePoints(item);
            // console.log(item);
        })
        sortData();
    }

    
    return (
        <div className="leaderboard-body">
            <div className="leaderboard-heading">
                Leaderboard
            </div>
            
            <div className="leaderboard-table">
                <div className="leaderboard-table-head">
                    <span className="leaderboard-name">Name</span>
                    <span className="leaderboard-email">Email</span>
                    <span className="leaderboard-points">Points Avg</span>
                    <span className="leaderboard-team">Favourite Team</span>
                </div>
                
                <div className="leaderboard-table-body">
                    {sortedData && sortedData[0] && sortedData?.map((item)=>(
                        <div key={item.id} className="leaderboard-table-row">
                            <span className="leaderboard-name">{item.name}</span>
                            <span className="leaderboard-email">{item.email}</span>
                            <span className="leaderboard-points">{item?.p.toFixed(2)}</span>
                            <span className="leaderboard-team">{item.favouriteTeam ? item.favouriteTeam:'-'}</span>
                        </div>    
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
