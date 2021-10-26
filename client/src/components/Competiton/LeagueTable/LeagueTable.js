import { useState, useEffect } from "react";
import { Table,TableBody,TableHead,TableRow,TableCell } from "@material-ui/core";
import axios from 'axios';
import { CircularProgress } from '@mui/material';

import LeagueTableRow from './LeagueTableRow/LeagueTableRow';
import './LeagueTable.css';

const LeagueTable = ({ competitionId }) => {

    const [posts, setPosts] = useState([]);
    const [standings,setStandings] = useState([]);
    
    const fetchLeagueTable = async () => {
        const { data } = await axios.get(`https://football-web-pages1.p.rapidapi.com/league-table.json?comp=${competitionId}`, { headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });

        setPosts(data);
        setStandings(data["league-table"].teams);
        
    }
    // console.log(posts);
    console.log(standings);
    
    useEffect(() => {
        fetchLeagueTable();

        // eslint-disable-next-line
    }, [competitionId]);

    return (
        <>
        {
            standings.length ? 
            <Table className="table">
            <TableHead className="header">
                <TableRow >
                    <TableCell className="position">Pos</TableCell>
                    <TableCell className="team">Team</TableCell>
                    <TableCell className="type1">Played</TableCell>
                    <TableCell className="type2">Won</TableCell>
                    <TableCell className="type2">Drawn</TableCell>
                    <TableCell className="type2">Lost</TableCell>
                    <TableCell className="type2">G.F.</TableCell>
                    <TableCell className="type2">G.A</TableCell>
                    <TableCell className="type1">G.D</TableCell>
                    <TableCell className="type1">Points</TableCell>
                
                </TableRow>
            </TableHead>
            <TableBody className="league-table-body">
                {standings.map((item) => (
                    <TableRow key={item.id}>
                        <LeagueTableRow item={item}/>
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        :
        <CircularProgress className="table-loader"/>
        }
        </>
    )
}

export default LeagueTable
// https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Chelsea