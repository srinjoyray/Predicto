import rules from '../../images/rules.jpg' 
import './Rules.css';

const Rules = () => {
    return (
        <div className="rules-body">
            <div className="rules-heading">
                Rules
            </div>
            
            <div className="rules-intro">
                Predictor is the game where you put your prediction skills to the test. Predict the scoreline of every match in the Premier League, La Liga, UEFA Champions League. Score points by predicting the correct results and climb the leaderboards.
            </div>
            <img className="rules-image" src={rules} width="100px" />
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
            
        </div>
    )
}

export default Rules
