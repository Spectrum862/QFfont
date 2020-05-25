import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import FaceSharpIcon from '@material-ui/icons/FaceSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Icon, Button,CircularProgress, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import Server from '../../serverconfig'
import Axios from 'axios'
import { logout } from '../../reducers/action';
import iconwhite from './iconwhite.png'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
 }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  newnav:{
    background: 'linear-gradient(45deg, #ff4612 10%, #fea822 50%)'
  },
  navitem:{
      color:' #fff'
  },
  navmar:{
    margin:theme.spacing(0,1,0,1)
  }
}));
function Navbar({firstname,lastname,dispatch,token,permisslevel}) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [loading,setLoading] = React.useState(false)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    console.log(token);
    
  })

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const onLogout = () =>{
    setLoading(true)
    const url = `${Server.url}api/auth/logout`
    const body = {
      headers: {
        'Authorization': `Token ${token}`
      }
    }

    Axios.post(url,null,body)
    .then(res=>{
      setLoading(false)
      dispatch(logout())
      
    })
    .catch(err=>{
      console.log(err);
      setLoading(false)
    })
    }
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {permisslevel===3&&<MenuItem>
        <IconButton color="inherit">
            <CalendarTodayTwoToneIcon />
        </IconButton>
        <p>กิจกรรม</p>
      </MenuItem>}
      {permisslevel===3&&<MenuItem>
        <IconButton color="inherit">
            <FaceSharpIcon />
        </IconButton>
        <p>นักศึกษา</p>
      </MenuItem>}
      <MenuItem >
        <IconButton color="inherit" >
          <AccountCircle />
        </IconButton>
        <p>{`${firstname} ${lastname}`}</p>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <IconButton color="inherit" >
          <ExitToAppSharpIcon />
        </IconButton>
        {loading && <CircularProgress color='inherit' size={20}/>}
        {!loading && 'Logout'}
      </MenuItem>

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.newnav} >
        
        <Toolbar>
          <Icon className={classes.navmar}>
          <img src={iconwhite} width={24} height={24}></img>
          </Icon>
          <Typography className={classes.title} variant="h6" noWrap>
            QFSci
          </Typography>
          {permisslevel!==1 && <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="ค้นหานักศึกษาหรือกิจกรรม"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}         
            />
          </div>}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}> 
            {permisslevel===3&&<Tooltip title="กิจกรรม" placement="bottom">
              <IconButton color="inherit">
                  <CalendarTodayTwoToneIcon/>   
              </IconButton>
            </Tooltip>}
            {permisslevel===3&&<Tooltip title="นักศึกษา" placement="bottom">
              <IconButton color="inherit">
                  <FaceSharpIcon/>   
              </IconButton>
            </Tooltip>}
            <Button className={classes.navitem} >
               {`${firstname} ${lastname}`}
            </Button>
            <Button className={classes.navitem} onClick={onLogout}>
              {loading && <CircularProgress color='inherit' size={20}/>}
              {!loading && 'Logout'}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
const mapStateToProps = function(state){
    return{
        firstname:state.session.user.first_name,
        lastname:state.session.user.last_name,
        token:state.session.token,
        permisslevel:state.session.user.user_type
    }
  }
  
  export default connect(mapStateToProps)(Navbar)