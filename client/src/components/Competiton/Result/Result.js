import { useState,useEffect } from "react";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import { getUser } from "../../../actions/auth";
import ResultRow from "./ResultRow.js/ResultRow";
import './Result.css';

const Result = ({competitionId}) => {

    const user =JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile'))));
    
    const email = (user?.result?.email);
    const dispatch = useDispatch();
    let data = useSelector((state) => state)?.user?.data;
    let games = data?.games;

    const [posts,setPosts] = useState([]);
    const [result,setResult] = useState([]);
    const [finalResult,setFinalResult] = useState([]);

    const calculateTime = (date,time) => {
        return (Date.parse(date+"T"+time))+16200000;
    }
 
    const fetchResult = async() =>{
        const {data} = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=${competitionId}`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
       
        setPosts(data);
        
        setResult(data["fixtures-results"].matches.filter((item)=>(item.status.short ==="FT" || item.status.full[0]!=='K')).reverse());
        
       
        setFinalResult(result.sort(function(a,b){return calculateTime(a.date,a.time) - calculateTime(b.date,b.time)}));
        // console.log(new Date((Date.parse(fixture[0].date+"T"+fixture[0].time)+16200000)).toString());
                
    }
    
    // console.log(posts);
    // console.log(result);
    

    useEffect(() => {
        fetchResult();
        
        dispatch(getUser({email : email}));
         // eslint-disable-next-line
    }, [competitionId]);
    
    return (
        <>
            {result.length ? 
                <div className="result-body">
                    {result.map((item,index,array)=>{
                        const myDate = (new Date(Date.parse(item.date)));
                        var options = { weekday: 'long', month:"long",day: 'numeric'};
                        if(item.date!==array[index-1]?.date){
                            return (
                                <>
                                    <div key={item.date} className="result-date-row">   
                                        <div className="result-date-cell">  
                                            {new Intl.DateTimeFormat('en-US', options).format(myDate)}
                                        </div>
                                    </div>
                                    <ResultRow item={item} key={item.id} games={games} />
                                </>
                            )
                        }
                        else{
                            return (
                                <ResultRow item={item} key={item.id} games={games} />
                            )
                        }
                        
                    })}
                </div>
                :
                <CircularProgress className="res-loader"/>
            }

            
        </>
    )
}

export default Result
