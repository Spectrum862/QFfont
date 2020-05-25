import {Doughnut } from "react-chartjs-2"
import React, { useState } from 'react'

import { CircularProgress, Typography, Divider, IconButton, makeStyles, Menu, List, ListItemText, } from '@material-ui/core/'
import InfoIcon from '@material-ui/icons/Info';

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

export default function EventTH({data=null}){
    const [anchor,setAnchor] = useState(null)
    const isMenuOpen = Boolean(anchor)
    const classes = useStyle()  
    const handleInfoMenuOpen = (event) => {
        setAnchor(event.currentTarget);
      };
    
    const handleMenuClose = () => {
        setAnchor(null);
    };
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
                <ListItemText primary='จำนวนชั่วโมงที่ต้องได้รับทั้งหมดคือ 100 ชม.'/>
            </List>           
        </Menu>
    )

    return (
        <div >
            <Typography  variant='h5' className={classes.grow}>
            จำนวนชั่วโมงที่ได้รับและที่ขาดเหลือ
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

