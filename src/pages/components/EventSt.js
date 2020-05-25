import {Doughnut } from "react-chartjs-2"
import React, { useState,useEffect } from 'react'
import { color10 } from '../../theme'

import { CircularProgress, Typography, Divider, IconButton, makeStyles, Menu, List, ListItemText, } from '@material-ui/core/'
import InfoIcon from '@material-ui/icons/Info';
import Server from '../../serverconfig'
import Axios from "axios"
import { connect } from "react-redux"

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

function EventST({year,token}){
    const [data,setData] = useState(null)
    const [anchor,setAnchor] = useState(null)
    const [studentyear,setStudentyear] = useState(0)
    const isMenuOpen = Boolean(anchor)
    const classes = useStyle()  
    const handleInfoMenuOpen = (event) => {
        setAnchor(event.currentTarget);
      };
    
    useEffect(()=>{
        setData(null)
        loaddata()
        console.log(data);
    },[year])

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const loaddata = () =>{
        const url = `${Server.url}api/student/activity-hours-per-year`
        Axios.get(url,{headers:{'Authorization': `Token ${token}`}})
        .then(res=>{
            setStudentyear(res.data.length)
            console.log(res.data[year-1]?.activity_hours_gain ?? 0);
            
            if(year===0)setData({labels: [
                'ชั่วโมงที่ได้รับ',
                'ชั่นโมงที่ขาด',              
            ],
            datasets: [{
                data: [ 
                    res.data[0]?.activity_hours_gain ?? 0+
                    res.data[1]?.activity_hours_gain ?? 0+
                    res.data[2]?.activity_hours_gain ?? 0+
                    res.data[3]?.activity_hours_gain ?? 0,

                    res.data[0]?.activity_hours_need ?? 0+
                    res.data[1]?.activity_hours_need ?? 0+
                    res.data[2]?.activity_hours_need ?? 0+
                    res.data[3]?.activity_hours_need ?? 0,
                ],
                backgroundColor: [color10[9],"#999999"]    
            }]})

            else setData({labels: [
                'ชั่วโมงที่ได้รับ',
                'ชั่นโมงที่ขาด',              
            ],
            datasets: [{
                data: [  
                    res.data[year-1]?.activity_hours_gain ?? 0,
                    res.data[year-1]?.activity_hours_need ?? 0,                 
                ],
                backgroundColor: [color10[9],"#999999"]           
            }]})
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
                <ListItemText primary='MN : Management Skill'/>
                <ListItemText primary='TK : Thinking Skill'/>
                <ListItemText primary='ST : STEM Competency'/>
                <ListItemText primary='LE : Leadership'/>
                <ListItemText primary='CM : Communication Skill'/>
                <ListItemText primary="CI : KMUTT's Citizenship"/>
                <ListItemText primary='DI : Digital Literacy'/>
                <ListItemText primary='KP : Knowledge and Professional Skill'/>
                <ListItemText primary='PE : Persistence/ Grit'/>
                <ListItemText primary='LN : Learning Skill'/>     
            </List>           
        </Menu>
    )

    return (
        <div >
            <Typography  variant='h5' className={classes.grow}>
            จำนวนกิจกรรมที่พัฒนาแต่ละ QF
            <div className={classes.grow}></div>
            {data===null&& <CircularProgress size={25}/>}
            <IconButton onClick={handleInfoMenuOpen}>
                <InfoIcon/>
            </IconButton>
            </Typography>
            
            <Divider light/>
            <br/>
            <Doughnut data={data ?? {}} legend={{position:'right'}} />
            {renderInfo}
        </div>
    )
}

const mapStateToProps = function(state){
    return{
        token:state.session.token
    }
}

export default connect(mapStateToProps)(EventST)
