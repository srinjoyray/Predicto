import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography,Card,CardActions,CardContent,Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import home1 from '../../images/home1.jpg'
import './Home.css';
const useStyles = makeStyles((theme)=>({
    root : {
        // minHeight:'100vh',
        width:'100vw',
        minHeight:'100vh',
        backgroundImage: `url(${home1})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:'cover',
        opacity:'0.2',
        position:'fixed',
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.root}>
            <CssBaseline/>
        </div>
        <div className="home">
            <Typography className="tagline">Football Predictions - Made Easy</Typography>
            <div className="home-body">
                <div className="home-intro">
                    PREDICTO is a free to play football prediction website where you can compete globally 
                </div>
                <div className="features">
                    <p className="list">Live Match Results</p>
                    <p className="list">Challenge Friends</p>
                    <p className="list">Global Leaderboard</p>
                </div>
            </div>
            <Link to="/matches">
                <Button size="small" className="button"><span className="btn-span">Start Predicting</span></Button>
            </Link>
        </div>
        {/* <div className="home">
        <Typography className="tagline">Winning Starts here</Typography>
            <Card sx={{ minWidth: 275 }} className="card">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Get all latest match updates with fixtures,results and standings
                    </Typography>
                    <Link to="/matches">
                        <Button size="small" className="button">Go to Macthes</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }} className="card">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        The global leaderboard is here. See where you stand against all other competititors
                    </Typography>
                    <Link to="/leaderboard">
                        <Button size="small" className="button">See Leaderboard</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }} className="card">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Understand the fantasy scoring system and all the rules of this game
                    </Typography>
                    <Link to="/instructions">
                        <Button size="small" className="button">Go to Instructions</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }} className="card">
                <CardContent className="content">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        See your profile details, add favourite club and see past game results
                    </Typography>
                    <Link to="/profile">
                        <Button size="small" className="button">Go to My Profile</Button>
                    </Link>
                </CardContent>
            </Card>
        </div> */}
        </>
    )
}

export default Home
