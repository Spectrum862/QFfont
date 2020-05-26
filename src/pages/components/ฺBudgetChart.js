import {Scatter, Line} from "react-chartjs-2"
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

function BudgetChart({token}){
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
     
    },[])

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const loaddata = () =>{
        let url = `${Server.url}api/staff/activity-budget-in-last-6-year`
        Axios.get(url,{headers:{'Authorization': `Token ${token}`}})
        .then(res=>{
            console.log(res);
            
            setData({
              
                labels: [
                    res.data[5]?.year ?? 'N/A',
                    res.data[4]?.year ?? 'N/A',
                    res.data[3]?.year ?? 'N/A',
                    res.data[2]?.year ?? 'N/A',
                    res.data[1]?.year ?? 'N/A',
                    res.data[0]?.year ?? 'N/A',
                ],
                datasets: [{
                    data: [ 
                        res.data[5]?.budget_sum ?? 0,
                        res.data[4]?.budget_sum ?? 0,
                        res.data[3]?.budget_sum ?? 0,
                        res.data[2]?.budget_sum ?? 0,
                        res.data[1]?.budget_sum ?? 0,
                        res.data[0]?.budget_sum ?? 0, 
                    ],
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: color10[7],
                          
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
                <ListItemText primary='กราฟแสดงข้อมูลงบประมาณที่ใช้จัดกิจกรรมทั้งหมดย้อนหลัง 6 ปี'/>
            </List>           
        </Menu>
    )

    return (
        <div >
            <Typography  variant='h5' className={classes.grow}>
            งบประมาณกิจกรรมย้อนหลัง 6 ปี
            <div className={classes.grow}></div>
            {data===null&& <CircularProgress size={25}/>}
            <IconButton onClick={handleInfoMenuOpen}>
                <InfoIcon/>
            </IconButton>
            </Typography>
            <Divider light/>
            <br/>
            <Line data={data ?? {}} options={{legend:{position:'bottom',display:false}}} />
            {renderInfo}
        </div>
    )
}

const mapStateToProps = function(state){
    return{
        token:state.session.token
    }
}

export default connect(mapStateToProps)(BudgetChart)


