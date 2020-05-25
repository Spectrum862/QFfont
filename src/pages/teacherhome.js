import React,{useEffect, useState} from 'react'
import theme,{color10} from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Container,makeStyles, Paper, List, ListItem, ListItemText, Table, TableCell, TableHead, TableBody, TableRow, Menu, Typography, Divider, CircularProgress} from '@material-ui/core'
import Server from '../serverconfig'
import Axios from 'axios'
import { connect } from 'react-redux'
import QFChartTH from './components/QFChartTH'
import EventTH from './components/EventTH'

const useStyles = makeStyles((theme) => ({
    cardpad:{
        padding: theme.spacing(2),
        height: '100%'
    },
    grow:{
        flexGrow:1,
        display:'flex',
        alignItems:'center',
        alignContent:'center'
    },
    marginGrid:{
        marginBottom:theme.spacing(4)
    }
    
  }));



function TeachHome({token}) { 
    const [qfdata,setQFdata] = useState(null)
    const [eventdata,setEventdata] = useState(null)
    const [stddata,setStdData] =useState(null)
    const [loading,setLoading] = useState(true)
    const [selectedSTD,setSelectedSTD] = useState(null)
    const [selectedName,setSelectedName] = useState(null)
    const qfurl = `${Server.url}api/student/QF`
    const eventurl = `${Server.url}api/student/activity-hours-per-year-2`
    const studeturl = `${Server.url}api/advisor/advised-students`
    const header = {headers:{'Authorization': `Token ${token}`}} 
    const spacing = 3
    const elevation = 3
    const classes = useStyles()
    
    useEffect(()=>{
        selectedSTD ===null ? loadStd() : console.log('Not frist');
        selectedSTD !== null ? loadQF() : console.log(selectedSTD);
        selectedSTD !== null ? loadEvent() : console.log(selectedSTD);        
    },[selectedSTD])

    const handleOnCellClick =(id,fn,ln)=>{
        selectedSTD===id ? setLoading(false) : setLoading(true)        
        setSelectedSTD(id)
        setSelectedName(`${fn} ${ln}`)        
    }
    const loadQF=()=>{
        Axios.get(`${qfurl}/${selectedSTD}`,header)
        .then(res=>{
            setQFdata({
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
            setLoading(false) 
        })
    }

    const loadEvent=()=>{
        Axios.get(`${eventurl}/${selectedSTD}`,header)
        .then(res=>{
            const gethr = 
                res.data?.activity_hours_year_1 +
                res.data?.activity_hours_year_2 +
                res.data?.activity_hours_year_3 +
                res.data?.activity_hours_year_4
            const needht = Math.max(0,100-gethr)
            setEventdata({labels: [
                'ชั่วโมงที่ได้รับ',
                'ชั่นโมงที่ขาด',              
            ],
            datasets: [{
                data: [ 
                    gethr,
                    needht
                ],
                backgroundColor: [color10[9],"#999999"]    
            }]})
        })
    }

    const loadStd=()=>{
        Axios.get(studeturl,header)
        .then(res=>{
            setStdData(res.data)
            setSelectedSTD(res.data[0].studentID)
            setSelectedName(`${res.data[0].user.first_name} ${res.data[0].user.last_name}`)
            setLoading(false)
            
        })
    }

    return(
        
        <ThemeProvider theme={theme}>
            <Container maxWidth='lg' className='padding'>
            <Grid container spacing={spacing}>
                

                {/* column */}
                <Grid item xs={12} md={6}>
                    <Grid container direction='column'>
                        <Typography variant='h4'>{selectedName}</Typography>
                        <Grid item>
                            <QFChartTH data={qfdata ?? {}}/>
                        </Grid>
                        <Grid item>
                            <EventTH data={eventdata ?? {}}/>
                        </Grid>

                    </Grid>
                    <Paper>                  
                    </Paper>
                </Grid>
                {/* student list */}
                <Grid item xs={12} md={6}>
                    <div className={classes.cardpad} elevation={elevation}>
                        <Typography variant='h4' className={classes.grow}>รายชื่อนักศึกษา
                        <div className={classes.grow}></div>
                        {loading===true&& <CircularProgress size={25}/>}
                        
                        </Typography >
                        <Divider ></Divider>
                        <List >
                            {stddata?.map((item,id)=>{return (
                                <ListItem button key={id} onClick={e=>{handleOnCellClick(item.studentID,item.user.first_name,item.user.last_name)}}>
                                {`${item.studentID}\t\t${item.user.first_name}\t\t${item.user.last_name}`}
                                </ListItem>
                            )})}
                        </List>
                    </div>
                </Grid>
            </Grid>


            </Container>

        </ThemeProvider>
    )
}

const mapStateToProps = function(state){
    return{
        token:state.session.token
    }
}

export default connect(mapStateToProps)(TeachHome)

