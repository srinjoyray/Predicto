import { useState,useEffect } from "react";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import FixtureRow from "./FixtureRow/FixtureRow";
import './Fixture.css';
import { getUser } from "../../../actions/auth";

const Fixture = ({competitionId}) => {

    const user =JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile'))));
    
    const email = (user?.result?.email);
    const dispatch = useDispatch();
    let data = useSelector((state) => state)?.user?.data;
    let games = data?.games;

    const [posts,setPosts] = useState([]);
    const [fixture,setFixture] = useState([]);
    const [finalFixture,setFinalFixture] = useState([]);
    const [lastDate,setLastDate] = useState();

    const calculateTime = (date,time) => {
        return (Date.parse(date+"T"+time))+16200000;
    }
    const sortFixture = () => {
        if(fixture.length===0) return;
        const sortedFixture = fixture.sort(function(a,b){return calculateTime(a.date,a.time) - calculateTime(b.date,b.time)}) ;
        setFinalFixture(sortedFixture);
        // console.log(sortedFixture);
        // setFixture(sortedFixture);
    }
    const fetchFixture = async() =>{
        const {data} = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=${competitionId}`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
       
        setPosts(data);
        setFixture(data["fixtures-results"].matches.filter((item)=>(item.status.short !=="FT" && item.status.full[0]==='K')));

        // sortFixture();
        setFinalFixture(fixture.sort(function(a,b){return calculateTime(a.date,a.time) - calculateTime(b.date,b.time)}));
        // console.log(new Date((Date.parse(fixture[0].date+"T"+fixture[0].time)+16200000)).toString());
                
    }
    
    // console.log(posts);
    console.log(fixture);
    // console.log(finalFixture);

    useEffect(() => {
        fetchFixture();
        
        dispatch(getUser({email : email}));
        // sortFixture();
         // eslint-disable-next-line
    }, [competitionId]);
    
    return (
        <>  
            {
                fixture.length ? 
                <div className="fixture-body">
                    {fixture.map((item,index,array)=>{
                        const myDate = (new Date(Date.parse(item.date)));
                        var options = { weekday: 'long', month:"long",day: 'numeric'};
                        if(item.date!==array[index-1]?.date){
                            return (
                                <>
                                    <div key={item.date} className="fixture-date-row">   
                                        <div className="fixture-date-cell">  
                                            {new Intl.DateTimeFormat('en-US', options).format(myDate)}
                                        </div>
                                    </div>
                                    <FixtureRow item={item} key={item.id} games={games}/>
                                </>
                            )
                        }
                        else{
                            return (
                                <FixtureRow item={item} key={item.id} games={games}/>
                            )
                        }
                    
                    })}
                </div>
                :
                <CircularProgress className="fix-loader"/>
            }
            
            
            
        </>
    )
}

export default Fixture
