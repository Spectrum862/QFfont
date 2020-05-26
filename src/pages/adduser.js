import React, { useState, useEffect, useRef } from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  

import { connect } from 'react-redux'
import { Container, Paper, MenuItem, Select, makeStyles, TextField, Grid, Input, Typography, InputLabel, FormControl, Button } from '@material-ui/core'

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
    const [data,setData] = useState(null)
    const [id,setID] = useState(null)
    const [academicR,setAcademicR] = useState('')
    const [fname,setfName] =useState(null)
    const [lname,setlName] =useState(null)
    const [st_year,setSt_year] = useState(null)

    const classes = useStyles()
    const spacing = 3
    const handleChangeType = (event) => {
        setUsetType(event.target.value);

      };
    const handleChangeAC = (event) => {
        setAcademicR(event.target.value);
    };

    const onSubmit=()=>{
        console.log(id.current.value);
    }
    
    const stOption =(
        <div>
        <TextField variant='outlined' className={classes.input} fullWidth label='ชั้นปี'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='ระดับการศึกษา'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='คณะ'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='ภาควิชา'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='สาขา'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='อาจารย์ที่ปรึกษา'/>
        </div>
    )
    const thOption =(
        <div>
        <FormControl variant="outlined" className={classes.input} style={{width:'100%'}}>
            <InputLabel htmlFor="outlined-age-native-simple">ตำแหน่งทางวิชาการ</InputLabel>
                <Select
                name='acarank'
                value={academicR}
                onClick={handleChangeAC}
                color='primary'
                >
                    <MenuItem value={'ศ. ดร.'}>ศ. ดร.</MenuItem>
                    <MenuItem value={'ศ.'}>ศ.</MenuItem>
                    <MenuItem value={'รศ. ดร.'}>รศ. ดร.</MenuItem>
                    <MenuItem value={'รศ.'}>รศ.</MenuItem>
                    <MenuItem value={'ผศ. ดร.'}>ผศ. ดร.</MenuItem>
                    <MenuItem value={'ผศ.'}>ผศ.</MenuItem>
                    <MenuItem value={'ดร.'}>ดร.</MenuItem>
                    <MenuItem value={'อ.'}>อ.</MenuItem>
                </Select>
        </FormControl>
        <TextField variant='outlined' className={classes.input} fullWidth label='คณะ'/>
        <TextField variant='outlined' className={classes.input} fullWidth label='ภาควิชา'/>
        </div>
    )
    const ofOption =(
        <div>
        <TextField variant='outlined' className={classes.input} fullWidth label='หน่วยงานที่สังกัด'/>
        </div>
    )

    const baseisNull=()=>{

    }

    const dataPacker =()=>{

    }

    return (
        
        <ThemeProvider theme={theme}>
            <Nav/>      
            <Container maxWidth='sm' className='padding'>
                <Select
                    value={usertype}
                    onChange={handleChangeType}
                    displayEmpty
                    className={classes.form}
                    >
                    <MenuItem value={0}>เลือกประเภทของ user</MenuItem>
                    <MenuItem value={1}>นักศึกษา</MenuItem>
                    <MenuItem value={2}>เพิ่มอาจารย์</MenuItem>
                    <MenuItem value={3}>เพิ่มพนักงาน</MenuItem>                  
                    <MenuItem value={4}>เพิ่มผู้ดูแลระบบ</MenuItem>
                </Select>
                {usertype!==0 &&
                <Paper square className={classes.paperpad} elevation={3}>
                    <Typography variant='h4'>
                        {usertype===1&&'เพิ่มบัญชีนักศึกษา'}
                        {usertype===2&&'เพิ่มบัญชีอาจารย์'}
                        {usertype===3&&'เพิ่มบัญชีพนักงาน'}
                        {usertype===4&&'เพิ่มผู้ดูแลระบบ'}
                    </Typography>
                    <br></br>
                    <TextField ref={id} variant='standard' className={classes.input} label='ID' />
                    <Grid container spacing={spacing}>
                        <Grid xs item><TextField variant='outlined' className={classes.input} fullWidth label='ชื่อ'/></Grid>
                        <Grid xs item><TextField variant='outlined' className={classes.input} fullWidth label='นามสกุล'/></Grid>
                    </Grid>
                    {usertype===1&&stOption}
                    {usertype===2&&thOption}
                    {usertype>=3&&ofOption}
                    <Button fullWidth onClick={onSubmit} variant='contained' color='primary'>Submit</Button>
                </Paper>}
                
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