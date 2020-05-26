import React, { useState } from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  

import { connect } from 'react-redux'
import { Container, Paper, MenuItem, Select, makeStyles, TextField, Grid, Input } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    form: {
      width: '20ch',
      marginBottom: theme.spacing(3)
    },
    paperpad:{
        padding: theme.spacing(3)
    },
    input:{
        marginBottom: theme.spacing(2)
    }
  }));

function AddUser({permisslevel}) {
    const [usertype,setUsetType] = useState(0)
    const classes = useStyles()
    const spacing = 3
    const handleChange = (event) => {
        setUsetType(event.target.value);
      };

    return (
        
        <ThemeProvider theme={theme}>
            <Nav/>      
            <Container maxWidth='sm' className='padding'>
                <Select
                    value={usertype}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.form}
                    >
                    <MenuItem value={0}>เลือกประเภทของ user</MenuItem>
                    <MenuItem value={1}>นักศึกษา</MenuItem>
                    <MenuItem value={2}>เพิ่มอาจารย์</MenuItem>
                    <MenuItem value={3}>เพิ่มพนักงาน</MenuItem>                  
                    <MenuItem value={4}>เพิ่มผู้ดูแลระบบ</MenuItem>
                </Select>
                <Paper square className={classes.paperpad} elevation={3}>
                    <TextField className={classes.input} label='ID' />
                    <Grid container spacing={spacing}>
                        <Grid xs item><TextField className={classes.input} fullWidth label='ชื่อ'/></Grid>
                        <Grid xs item><TextField className={classes.input} fullWidth label='นามสกุล'/></Grid>
                    </Grid>
                    <TextField className={classes.input} fullWidth label='username'/>
                    <TextField className={classes.input} fullWidth type='password' label='password'/>
                
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = function(state) {
    return {
      session : state.session,
      isLogin : state.session.isLogin,
      permisslevel : state.session.user.user_type
    }
}
export default connect(mapStateToProps)(AddUser)