import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Paper,Box,Accordion,AccordionDetails,AccordionSummary,Typography,Button,Modal,TextField,Dialog,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { getUser,updateFavouriteTeam,deleteUser } from '../../actions/auth';
import './Profile.css';
import { useHistory } from 'react-router';
import axios from 'axios';

const Profile = () => {
    
    const user =JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile'))));
    // console.log(user);
    const email = (user?.result?.email);
    const dispatch = useDispatch();
    const history = useHistory();

    let data = useSelector((state) => state)?.user?.data;

    // console.log(data);

    
    const [ucl,setUcl] = useState('');
    const [laLiga,setLaLiga] = useState('');
    const [pl,setPl] = useState('');

    const [refresh,setRefresh] = useState(false);


    const pointFunction = (predicted1,predicted2,actual1,actual2) =>{
        // console.log(predicted1,predicted2,actual1,actual2);
        let ans=0;
        let predictedOutcome = predicted1-predicted2;
        let actualOutcome = actual1-actual2;
        if(predictedOutcome===actualOutcome)ans+=3;
        if(predicted1-predicted2===actual1-actual2) ans+=1;
        if(predicted1===actual1) ans+=1;
        if(predicted2===actual2) ans+=1;

        return ans;
    }

    const calculatePoints = (item) => {
        // console.log(item);
        let count=0;
        item?.games?.map((game)=>{
            // console.log(game.id);
            ucl?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
            laLiga?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
            pl?.matches?.map((i)=>{
                if(i.id===game.id && i.status.short==='FT'){
                    // console.log(game,i);
                    count+=pointFunction(game.homeTeamScore,game.awayTeamScore,i['home-team'].score,i['away-team'].score);
                }
            })
        })
        return count;
    }   
    const fetchResult = async() =>{
        const data1 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=24`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setUcl(data1.data['fixtures-results']);
        
        const data2 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=94`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setLaLiga(data2.data['fixtures-results']);
        
        let data3 = await axios.get(`https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=1`,{ headers: { "x-rapidapi-key": process.env.REACT_APP_API_KEY } });
        setPl(data3.data['fixtures-results']);
                
    }

    useEffect(() => {
        // console.log(email);
        dispatch(getUser({email : email}));
        fetchResult();
    }, [refresh])

    if(data)data.p=calculatePoints(data);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    
        history.push('/');
        
    } 
    
    // console.log(refresh);
    const AddModal = () =>{
        const [open, setOpen] = useState(false);
        const [fav,setFav]  = useState(data?.favouriteTeam);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
        const handleAdd = async(favouriteTeam) => {
            // console.log(favouriteTeam);
            
            await dispatch(updateFavouriteTeam({favouriteTeam : favouriteTeam}));
            setRefresh(!refresh);
            handleClose();
        }       
        return (
            <div>
            <Button onClick={handleOpen}><EditIcon/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{width:300,margin:'auto'}}
            >
                <Box sx={style}>
                    <TextField id="outlined-basic" label="Favourite Team" variant="outlined" onChange={(e)=>setFav(e.target.value)} />
                    <Button onClick={()=>handleAdd(fav)}>Submit</Button>
                </Box>
            </Modal>
            </div>
        )
    }

    const DeleteModal = () => {
        const [openDelete, setOpenDelete] = useState(false);

        const handleClickOpen = () => {
            setOpenDelete(true);
        };

        const handleClose = () => {
            setOpenDelete(false);
        };
        const handleDelete = async() => {
            await dispatch(deleteUser());
            logout();
        }
        return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Delete Account
        </Button>
        <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete your account ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        </div>
        )
    }

    return (
        <div className="profile-body">
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: '80vw',
                },
                justifyContent:'center',
            }}
            
        >
            <Paper elevation={12} >
                <p className="profile-heading">Profile
                </p>
                <p className="data">
                    Name : {data?.name}
                </p>
                <p className="data">
                    Email : {data?.email}
                </p>
                <p className="data">
                    Favourite Team : {data?.favouriteTeam?.length>0 ?  data?.favouriteTeam : <></> }{<AddModal/>}
                </p>
                <p className="data">
                    Points : {data?.p}
                </p>
               
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Games: {data?.games?.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    {data?.games && data?.games.map((item)=>(
                        <Typography key={item.id} >
                            <p className="game-details">{item.homeTeamName} ({item.homeTeamScore}) : ({item.awayTeamScore}) {item.awayTeamName}</p>
                        </Typography>  
                    ))}
                    </AccordionDetails>
                </Accordion>
                <div className="profile-btn">
                    {/* <Button onClick={()=>handleEdit()} variant="contained" className="edit">Edit</Button> */}
                    {/* <Button onClick={()=>handleDelete()} variant="contained" className="delete">Delete Account</Button> */}
                    <DeleteModal/>
                </div>
            </Paper>
        </Box>
        </div>
    )
}

export default Profile
