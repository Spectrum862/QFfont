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
function EventST({outdata=null,year,token}){
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
        if(outdata==null)loaddata()
        console.log(data);
    },[year])

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const loaddata = () =>{
        const url = `${Server.url}api/student/activity-hours-per-year-2`
        Axios.get(url,{headers:{'Authorization': `Token ${token}`}})
        .then(res=>{
            const hr = [res.data.activity_hours_year_1,res.data.activity_hours_year_2,res.data.activity_hours_year_3,res.data.activity_hours_year_4]
            const selethr  = hr[0]+hr[1]+hr[2]+hr[3]
            setStudentyear(res.data.length)           
            if(year===0)setData({labels: [
                'ชั่วโมงที่ได้รับ',
                'ชั่วโมงที่ขาด',              
            ],
            datasets: [{
                data: [ 
                    selethr,
                    Math.max(0,100-selethr)
                ],
                backgroundColor: [color10[9],"#999999"]    
            }]})

            else setData({labels: [
                'ชั่วโมงที่ได้รับ',
                'ชั่วโมงที่ขาด',              
            ],
            datasets: [{
                data: [  
                    hr[year-1] ,
                    Math.max(0,25-hr[year-1])               
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
                <ListItemText primary='จำนวนชั่วโมงของนักศึกษาที่ต้องทำปีการศึกษาละ 25 ชม '/>  
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

const mapStateToProps = function(state){
    return{
        token:state.session.token
    }
}

export default connect(mapStateToProps)(EventST)
