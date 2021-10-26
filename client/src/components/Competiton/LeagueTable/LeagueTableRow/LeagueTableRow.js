import { TableCell } from "@material-ui/core"
import { useState,useEffect } from "react";
import axios from 'axios';

import './LeagueTableRow.css';
const LeagueTableRow = ({item}) => {

    const [logo,setLogo] = useState("");

    const fetchLogo = async () => {
        const getLogo = await axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${item.name}`);

        setLogo(getLogo.data.teams[0].strTeamBadge);
        console.log(logo);
    }

    useEffect(() => {
        fetchLogo();

        // eslint-disable-next-line
    }, []);
    return (
        <>
            <TableCell className="league-table-row-position">{item.position}</TableCell>
            <TableCell className="league-table-row-team">{item.name}<img src={logo} width="20px" height="20px"></img></TableCell>
            <TableCell className="league-table-row-type1">{item["all-matches"].played}</TableCell>
            <TableCell className="league-table-row-type2">{item["all-matches"].won}</TableCell>
            <TableCell className="league-table-row-type2">{item["all-matches"].drawn}</TableCell>
            <TableCell className="league-table-row-type2">{item["all-matches"].lost}</TableCell>
            <TableCell className="league-table-row-type2">{item["all-matches"].for}</TableCell>
            <TableCell className="league-table-row-type2">{item["all-matches"].against}</TableCell>
            <TableCell className="league-table-row-type1">{item["all-matches"]["goal-difference"]>0?"+":""}{item["all-matches"]["goal-difference"]}</TableCell>
            <TableCell className="league-table-row-type1">{item["total-points"]}</TableCell>
        </>
    )
}

export default LeagueTableRow
