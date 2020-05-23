import React, { useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { ThemeProvider,fade, makeStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { logout } from '../../reducers/action'
import Axios from 'axios'
import Server from '../../serverconfig'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



function Nav({firstname,lastname,dispatch,token}){
    const classes = useStyles();

    const onLogout = () =>{
      const url = `${Server.url}api/auth/logout`
      const body = {
        headers: {
          'Authorization': `Token ${token}`
        }
      }

      Axios.post(url,null,body)
      .then(res=>{
        console.log(res);
        dispatch(logout())
        
      })
      .catch(err=>{
        console.log(err);
        
      })
      

      
    }
    return(
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    QFSci
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    />
                </div>
                <Typography>
                  {firstname}  {lastname}
                </Typography>
                <Button variant="outlined" onClick={onLogout}>
                    Logout
                </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = function(state){
  return{
      firstname:state.session.user.first_name,
      lastname:state.session.user.last_name,
      token:state.session.token
  }
}

export default connect(mapStateToProps)(Nav)