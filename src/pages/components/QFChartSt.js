import {Line, Bar, Polar } from "react-chartjs-2"
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

function QFChartST({year,token}){
    const [data,setData] = useState(null)
    const [anchor,setAnchor] = useState(null)
    const isMenuOpen = Boolean(anchor)
    const classes = useStyle()  
    const handleInfoMenuOpen = (event) => {
        setAnchor(event.currentTarget);
      };
    
    useEffect(()=>{
        setData(null)
        loaddata()

    },[year])


    const handleMenuClose = () => {
        setAnchor(null);
    };


    

    const loaddata = () =>{
    Axios.get(`${Server.url}api/profile`,{headers:{'Authorization': `Token ${token}`}})
    .then((res)=>{
        const str = res.data.studentID
        let url = `${Server.url}api/student/QF/${str}`
        if(year!==0) {url = `${Server.url}api/student/QF/${str}/25${parseInt(str.substr(0,2))+year-1}`}
        Axios.get(url,{headers:{'Authorization': `Token ${token}`}})
        .then(res=>{
            setData({
                labels: [
                    'MN',
                    'TK',
                    'ST',
                    'LE',
                    'CM',
                    'CI',
                    'DI',
                    'KP',
                    'PE',
                    'LE'

                ],
                datasets: [{
                    data: [ 
                        res.data[0]?.gain ?? 0,
                        res.data[1]?.gain ?? 0,
                        res.data[2]?.gain ?? 0,
                        res.data[3]?.gain ?? 0,
                        res.data[4]?.gain ?? 0,
                        res.data[5]?.gain ?? 0,
                        res.data[6]?.gain ?? 0,
                        res.data[7]?.gain ?? 0,
                        res.data[8]?.gain ?? 0,
                        res.data[9]?.gain ?? 0,
                    ],
                    backgroundColor: color10            
                }]
            }) 
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

export default connect(mapStateToProps)(QFChartST)


