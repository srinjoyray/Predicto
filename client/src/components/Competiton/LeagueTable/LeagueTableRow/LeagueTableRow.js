import { TableCell } from "@material-ui/core"
import { useState,useEffect } from "react";
import axios from 'axios';
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
            <TableCell className="position">{item.position}</TableCell>
            <TableCell className="name">{item.name}<img src={logo} width="20vw"></img></TableCell>
            <TableCell className="type1">{item["all-matches"].played}</TableCell>
            <TableCell className="type2">{item["all-matches"].won}</TableCell>
            <TableCell className="type2">{item["all-matches"].drawn}</TableCell>
            <TableCell className="type2">{item["all-matches"].lost}</TableCell>
            <TableCell className="type2">{item["all-matches"].for}</TableCell>
            <TableCell className="type2">{item["all-matches"].against}</TableCell>
            <TableCell className="type1">{item["all-matches"]["goal-difference"]>0?"+":""}{item["all-matches"]["goal-difference"]}</TableCell>
            <TableCell className="type1">{item["total-points"]}</TableCell>
        </>
    )
}

export default LeagueTableRow
