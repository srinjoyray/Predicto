import { useState,useEffect } from 'react';
import {Tab,Tabs} from "@material-ui/core";
import Fixture from './Fixture/Fixture';
import { makeStyles } from "@material-ui/core/styles";


import LeagueTable from './LeagueTable/LeagueTable';
import Result from './Result/Result';
import './Competition.css';

const useStyles = makeStyles({
  tab: {  
    backgroundColor: 'wheat',
  },

});

const Competition = ({competitionId}) => {
  const classes = useStyles();

  const [type, setType] = useState(0);

  useEffect(() => {
    setType(0);
   
  }, [competitionId]);

  // console.log(competitionId);
  return (
    <div className="competition">
      <Tabs value={type} indicatorColor="primary" textColor="primary" className={classes.tab} onChange={(event,value)=>{setType(value)}}>
        <Tab style={{width:"30%"}} label="Fixtures" />
        <Tab style={{width:"30%"}} label="Results" />
        <Tab style={{width:"30%"}} label="League Table" disabled={competitionId===24} />
      </Tabs>
      {type===0 ? <Fixture competitionId={competitionId}/>:<></>}
      {type===1 ? <Result competitionId={competitionId} />:<></>}
      {type===2 ? <LeagueTable competitionId={competitionId}/> : <></>}
      
    </div>
  )
}

export default Competition
