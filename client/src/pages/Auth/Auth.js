import { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

import useStyles from './styles';
import Input from "./Input";
import Icon from "./icon";
import {signin,signup,googleLogin} from '../../actions/auth';

const initialState = { firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        } else {
            dispatch(signin(formData,history));
        }
    };
    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value});
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        setShowPassword(false);
    };
    const googleSuccess = async(res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        // console.log(result,token);
        dispatch(googleLogin(result,token,history));
    };
    const googleFailure = () => {
        console.log('Google Sign In was unsucessful. Try again later');
    };

    return (
        <Container component="container" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        render={(renderProps)=>(
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained"
                            >
                                Google Login
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            
                            {isSignup ? <div>Already have an account ? <Button onClick={switchMode} style={{color:"blue"}}>Sign In</Button></div> : <div>Don't have an account ? <Button onClick={switchMode} style={{color:"blue"}}>Sign Up</Button></div>}
                            
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth