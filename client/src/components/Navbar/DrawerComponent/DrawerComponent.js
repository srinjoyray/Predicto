import React, { useState,useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Toolbar,Avatar,Button} from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const DrawerComponent = () => {
  const useStyles = makeStyles(theme => ({
    drawerContainer: {
        width:'50vw!important',
       
    },
    iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white',
    },

    menuIconToggle: {
      fontSize: '3rem',
    },
    list:{
      padding:'0',
    },
    link: {
      color:"white",
      textDecoration:'none !important',
    },
    listItem : {
      dispplay: 'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#3f51b5',
    },
    profile : {
      display:'flex',
      flexDirection:'row',
    },
    logout : {
    marginLeft:'5%',
    },
  }));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('profile')))));
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  //Css
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');
    setUser(null);
    setOpenDrawer(false);
  } 
  // console.log(openDrawer);
  useEffect(() => {
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
      <Drawer
        anchor='top'
        width="50vw!important"
        className={ classes.drawerContainer }
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}>
        <List className={classes.list}>
          <ListItem className={classes.listItem} divider button onClick={() => setOpenDrawer(false)}>
            <Link to="/matches" className={classes.link}>
              <ListItemText >Matches</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem} divider button onClick={() => setOpenDrawer(false)}>
            <Link to="/leaderboard" className={classes.link}>
              <ListItemText>LeaderBoard</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem} divider button onClick={() => setOpenDrawer(false)}>
            <Link to="/rules" className={classes.link}>
              <ListItemText>Rules</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem} divider button onClick={() => setOpenDrawer(false)}>
           <Link to="/profile" className={classes.link}>
              <ListItemText>My Profile</ListItemText>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem} divider button onClick={() => setOpenDrawer(false)}>            
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.login} onClick={() => setOpenDrawer(false)} >Signin</Button>
                )
                }
          </ListItem>
        </List>
        
      </Drawer>
      {/* Since this is inside our toolbar we can push it to the end of the toolbar */}
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;