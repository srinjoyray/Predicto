import React, { useEffect, useState } from 'react';
import { AppBar,makeStyles,Tabs,Toolbar,Tab,Typography,Button,Menu,MenuItem,useMediaQuery,useTheme,Avatar} from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SportsIcon from '@mui/icons-material/Sports';
import decode from 'jwt-decode';

import DrawerComponent from './DrawerComponent/DrawerComponent';


const useStyles = makeStyles(theme => ({
  appBar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    position:'sticky'
  },
  name:{
    
    marginRight:'5vw !important',
    display:'flex',
    alignItems:'center',
    fontFamily: "'Roboto Slab', serif ",
    fontSize:'30px',
    fontWeight:'900',
  },
  logo: {
    fontSize: '1.9rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
  },
  acount: {
    marginLeft: 'auto !important',
    '&:hover': {
      background: 'purple',
    },

  },
  tabsContainer: {
    marginLeft: 'auto',
    textDecoration:'none !important',
    color : "white",
  },
  iconLogo: {
    color: 'yellow',
    fontSize: '3rem',
  },
  icons: {
    fontSize: '1.4rem',
  },
  
  link: {
    color:"white",
    textDecoration:'none!important',

  },
  profile : {
    display:'flex',
    flexDirection:'row',
    marginRight: '0.1vw!important',
  },
  purple : {
    // width : '3vw',
  },
  logout : {
    marginLeft:'5%',
    // width:'30%',
  },
}));

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  //Hooks
  const [value, setValue] = useState(3);
  const [anchorEl, setAnchorEl] = useState(null);
  //Boolean(anchorEl) This is use to convert a null value in to a boolean
  //anchorEl Is us to set the position of the menu

  const classes = useStyles();

  const theme = useTheme(); //Get a copy of our default theme in our component so that we can access the breakpoints and pass the useMediaQuery

  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  //Functions

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');
    setUser(null);
  } 

  useEffect(() => {
      if(location.pathname==='/matches') setValue(0);
      if(location.pathname==='/leaderboard') setValue(1);
      if(location.pathname==='/rules') setValue(2);
      if(location.pathname==='/profile') setValue(3);
      if(location.pathname==='/auth' || location.pathname==='/') setValue(4);

      const token = user?.token;
      if (token) {
          const decodedToken = decode(token);

          if (decodedToken.exp * 1000 < new Date().getTime()) {
              logout();
          }
      }
      setUser(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));

  }, [location])

  return (
    <>
      <AppBar elevation={0} color='primary' className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Typography className={classes.name}>
              <SportsIcon className={classes.iconLogo} />PREDICTO
            </Typography>
          </Link>
          {isMatch ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>  
              <Tabs
                className={classes.tabsContainer}
                // indicatorColor='secondary'
                TabIndicatorProps={{
                  style: { background: "cyan", height: "4px", top: "35px", borderRadius:'50px' }
                }}
                value={value}>
                <Link to="/matches" className={classes.link}>
                  <Tab label='Matches'/>
                </Link>
                <Link to="/leaderboard" className={classes.link}>
                  <Tab label='LeaderBoard' />
                </Link>
                <Link to="/rules" className={classes.link}>
                  <Tab label='Rules' />
                </Link>
                <Link to="/profile" className={classes.link}>
                  <Tab label='My Profile' />
                </Link>
              </Tabs>
              <Toolbar className={classes.acount}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.login} >Signin</Button>
                )
                }
              </Toolbar>
            </>

          )}

          {/* <Button
            aria-controls='menu'
            onMouseOver={handleOpenMenu}
            className={classes.acount}
            disableElevation
            disableRipple
            variant='contained'
            color='secondary'>
            Profile
          </Button> */}
          
        </Toolbar>
      </AppBar>
      {/* Menu */}
      {/* <Menu
        style={{ marginTop: '50px' }}
        id='menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Examination Results</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Promotions</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Pending Fees</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Final Project</MenuItem>
      </Menu> */}
    </>
  );
};

export default Navbar;