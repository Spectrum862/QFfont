import {Line, Bar, Polar } from "react-chartjs-2"
import React, { useState,useEffect } from 'react'
import theme, { color10 } from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CircularProgress, Typography, Divider, Grid, IconButton, makeStyles, Grow, Menu, ListItem, List, ListItemText, } from '@material-ui/core/'
import InfoIcon from '@material-ui/icons/Info';
import Server from '../../serverconfig'
import Axios from "axios"
import { connect } from "react-redux"

// api set
// api/staff/student-qf-stat/faculty/<str:faculty>/<int:year></str>
// api/staff/student-qf-stat/all/<int:year>
// api/staff/student-qf-stat/department/<str:department>/<int:year></str>
// api/staff/student-qf-stat/year-of-study/<int:year_of_study>/<int:year></int>
// api/staff/student-qf-stat/year-of-study+department/<int:year_of_study>/<str:department>/<int:year></int>
// api/staff/student-qf-stat/year-of-study+faculty/<int:year_of_study>/<str:faculty>/<int:year></int>

// instructions
// <int:year> ใส่ปีการศึกษา
// <int:year_of_study> ใส่ชั้นปี
// <str:faculty> ใส่คณะ ซึ่งมีเพียง science
{/* <str:department> ใส่ภาควิชา ใส่ MTH PHY CHM MIC */}

const useStyle = makeStyles((theme)=>({
    grow:{
        flexGrow:1,
        display:'flex',
        alignItems:'center',
        alignContent:'center'
    },
    pading:{
        padding: theme.spacing(0,2,0,2)
    }
}))

const testdata = {
    labels: [
        'KP', 
        'LN', 
        'TK', 
        'MN', 
        'CM', 
        'DI',
        'LE',
        'PE',
        'CI',
        'ST'
    ],
    datasets: [{
        data: [ 
            10,20,30,25,25,36,14,20,30,40
        ],
        backgroundColor: color10            
    }]
}

function QFChart({department,study_year,year,token}){
    const [data,setData] = useState(null)
    const [anchor,setAnchor] = useState(null)
    const isMenuOpen = Boolean(anchor)
    const departmap = ['','MTH','CHM', 'PHY', 'MIC']
    const classes = useStyle()  
    const handleInfoMenuOpen = (event) => {
        setAnchor(event.currentTarget);
      };
    
    useEffect(()=>{
        setData(null)
        console.log('eiei');
        loaddata()
        // loadfake()
    },[department,study_year,year])


    const handleMenuClose = () => {
        setAnchor(null);
    };

    const loadfake=()=>{
        setData(testdata)
    }
    const loaddata = () =>{
        let url = `${Server.url}`
        if(department===0&&study_year===0) url = url+`api/staff/student-qf-stat/all/${year}`
        else if(department===0) url = url+`api/staff/student-qf-stat/year-of-study/${study_year}/${year}`
            else if(study_year===0) url = url+`api/staff/student-qf-stat/department/${departmap[department]}/${year}`
                else   url = url+`api/staff/student-qf-stat/year-of-study+department/${study_year}/${departmap[department]}/${year}`
        console.log(url);
        Axios.get(url,{headers:{'Authorization': `Token ${token}`}})
        .then(res=>{
            setData({
                labels: [
                    'KP', 
                    'LN', 
                    'TK', 
                    'MN', 
                    'CM', 
                    'DI',
                    'LE',
                    'PE',
                    'CI',
                    'ST'
                ],
                datasets: [{
                    data: [ 
                        res.data[0].student_count,
                        res.data[1].student_count,
                        res.data[2].student_count,
                        res.data[3].student_count,
                        res.data[4].student_count,
                        res.data[5].student_count,
                        res.data[6].student_count,
                        res.data[7].student_count,
                        res.data[8].student_count,
                        res.data[9].student_count,
                    ],
                    backgroundColor: color10            
                }]
            })     
        })
        
        

    }

    const renderInfo = (
        <Menu
            anchorEl={anchor}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >   
            <List className={classes.pading}>
                <ListItemText primary='KP : Knowledge and Professional Skill'/>
                <ListItemText primary='LN : Learning Skill'/>
                <ListItemText primary='TK : Thinking Skill'/>
                <ListItemText primary='MN : Management Skill'/>
                <ListItemText primary='CM : Communication Skill'/>

                <ListItemText primary='DI : Digital Literacy'/>
                <ListItemText primary='LE : Leadership'/>
                <ListItemText primary='PE : Persistence/ Grit'/>
                <ListItemText primary="CI : KMUTT's Citizenship"/>
                <ListItemText primary='ST : STEM Competency'/>
            </List>           
        </Menu>
    )

    return (
        <div >
            <Typography  variant='h5' className={classes.grow}>
            จำนวนกิจกรรมในแต่ละ QF
            <div className={classes.grow}></div>
            {data===null&& <CircularProgress size={25}/>}
            <IconButton onClick={handleInfoMenuOpen}>
                <InfoIcon/>
            </IconButton>
            </Typography>
            
            <Divider light/>
            <br/>
            <Polar data={data ?? {}} legend={{position:'right'}} />
            {renderInfo}
        </div>
    )
}

const mapStateToProps = function(state){
    return{
        token:state.session.token
    }
}

export default connect(mapStateToProps)(QFChart)


