import { useState } from "react";
import CompetitionSelect from "../../components/CompetitionSelect/CompetitionSelect";
import Competition from "../../components/Competiton/Competition"
import './Matches.css';
const Home = () => {
    const [competitionId, setCompetitionId] = useState(1);
    // console.log(competitionId);
    return (
        <div className="body">
            <div className="competition-select">
                <CompetitionSelect competitionId={competitionId} setCompetitionId={setCompetitionId}/>
            </div>
           
            {competitionId && <Competition competitionId={competitionId}/>}
            
        </div>
    )
}

export default Home
