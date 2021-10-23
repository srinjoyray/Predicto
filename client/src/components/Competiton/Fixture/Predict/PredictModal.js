import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from 'react-redux';

import {updateGames,deleteGame} from '../../../../actions/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 290,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  margin: 'auto',
};

export default function PredictModal({item,score1,score2,setScore1,setScore2,counter1,counter2,setCounter1,setCounter2}) {
    const dispatch = useDispatch();
    const user =JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile'))));
    // const [counter1,setCounter1] = useState(Math.max(score1,0));
    // const [counter2,setCounter2] = useState(Math.max(score2,0));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const handleIncrement = (count,type) => {
        if(type==1) setCounter1(count+1);
        else setCounter2(count+1);
    };
    const handleDecrement = (count,type) => {
        if(!count)return
        if(type==1) setCounter1(count-1);
        else setCounter2(count-1);
    }
    const handleSubmit = () => {
        dispatch(updateGames({item,counter1,counter2}));
        setScore1(counter1);
        setScore2(counter2);
        setOpen(false);
    }

    const handleDelete = async() => {
        // console.log('delete');
        dispatch(deleteGame({item}));
        setScore1(-1);
        setScore2(-1);
        setCounter1(0);
        setCounter2(0);
        setOpen(false);
    }

    useEffect(() => {
        setCounter1(Math.max(score1,0));
        setCounter2(Math.max(score2,0));
    }, [])

    return (
        <>
        {   user ? 
            <div>
            <Button onClick={handleOpen}>Predict</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{width:350,margin:'auto',borderRadius:10}}
            >
                <Box sx={style}>
                <div style={{display:'flex',flexDirection:'row',margin:'auto'}}>
                    <div style={{width:'40%',textAlign:'left'}}>
                        {item["home-team"].name}
                    </div>
                    <div style={{textAlign:'center'}}>
                        vs
                    </div>
                    <div style={{width:'40%',textAlign:'right'}}>
                        {item["away-team"].name}
                    </div>
                </div>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {item["home-team"].name} vs {item["away-team"].name}
                </Typography> */}
                <div style={{display:'flex',flexDirection:'row',margin:'auto'}}>
                    <div style={{width:'40%',display:'flex',flexDirection:'row'}}>
                        <Button onClick={()=> (handleDecrement(counter1,1))} style={{minWidth:'30px'}}>-</Button>
                        <Button disabled={true} style={{minWidth:'30px'}}>{counter1}</Button>
                        <Button onClick={()=>(handleIncrement(counter1,1))} style={{minWidth:'30px'}}>+</Button>
                    </div>
                    <div style={{width:'40%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <Button onClick={()=> (handleDecrement(counter2,2))} style={{minWidth:'30px'}}>-</Button>
                        <Button disabled={true} style={{minWidth:'30px'}}>{counter2}</Button>
                        <Button onClick={()=>(handleIncrement(counter2,2))} style={{minWidth:'30px'}}>+</Button>
                    </div>
                </div>
                <Button onClick={()=>handleSubmit()}>Submit</Button>
                <Button onClick={()=>handleDelete()}>Delete</Button>
                </Box>
            </Modal>
            </div>
            :
            <>
                Login to predict
            </>
        }
        
        </>
    );
}