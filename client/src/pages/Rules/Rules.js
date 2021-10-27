import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 
import './Rules.css';

const Rules = () => {
    return (
        <div className="rules-body">
            <div className="rules-heading">
                Rules
            </div>
            
            <div className="rules-intro">
                Predicto is the game where you put your prediction skills to the test. Predict the scoreline of every match in the Premier League, La Liga, UEFA Champions League. Score points by predicting the correct results and climb the leaderboards.
            </div>
            <div className="rules-image-alt" >
                <p className="rules-image-alt-para">
                    <span className="rules-image-alt-left"><CheckCircleIcon color="success"/> Correct result</span>
                    <span className="rules-image-alt-right">3pts</span>
                </p>
                <p className="rules-image-alt-para">
                    <span className="rules-image-alt-left"><CheckCircleIcon color="success"/> Goal difference</span>
                    <span className="rules-image-alt-right">1pt</span>
                </p>
                <p className="rules-image-alt-para">
                    <span className="rules-image-alt-left"><CheckCircleIcon color="success"/> Home goals</span>
                    <span className="rules-image-alt-right">1pt</span>
                </p>
                <p className="rules-image-alt-para">
                    <span className="rules-image-alt-left"><CheckCircleIcon color="success" /> Away goals</span>
                    <span className="rules-image-alt-right">1pt</span>
                </p>
            </div>
            <div className="rules-main">
                <p>For each match, points are awarded for:</p>
                <ul className="rules-list" >
                    <li>Correct result
                        <p>Predict the correct winner or loser, or correctly predict a draw: <span className="points">+3</span> points</p>
                    </li>
                    <li>Correct score
                        <p>Predict the correct number of home goals: <span className="points">+1</span> point</p>
                        <p>Predict the correct number of away goals: <span className="points">+1</span> point</p>
                        <p>Predict the correct goal difference: <span className="points">+1</span> point</p>
                    </li>
                </ul>
            </div>
            <div className="rules-day">
                You can only predict matches scheduled in the next 7 days
            </div>
            
        </div>
    )
}

export default Rules
