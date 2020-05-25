import React,{useEffect, useState} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Container , Tabs,Tab, Paper, CircularProgress, Card, makeStyles, Typography, TextField, InputBase} from '@material-ui/core'

import QFChartSt from './components/QFChartSt'
import Axios from 'axios'
import EventSt from './components/EventSt'


const useStyles = makeStyles((theme) => ({
    cardpad:{
        padding: theme.spacing(2),
        height: '100%',
        marginBottom: theme.spacing(2)
    },
    grow:{
        flexGrow:1
    },
    
  }));

export default function StudentHome() {
    const [yvalue, setyValue] = useState(0)
    
    const spacing = 3
    const elevation = 3
    const classes = useStyles()
    
    const handleChangeY = (event, newValue) => {
        setyValue(newValue);
    };

    return(
        
        <ThemeProvider theme={theme}>
            <Paper square>             
                <Tabs
                    value={yvalue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeY}
                    variant="scrollable"
                    scrollButtons='auto'
                >   
                    
                    <Tab label="ชั้นปีทั้งหมด" />
                    <Tab label="1" />
                    <Tab label="2" />
                    <Tab label="3" />
                    <Tab label="4" />

                </Tabs>
            </Paper>  
            <Container maxWidth='xl' className='padding'>            
            <Grid container spacing={spacing}>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <QFChartSt year={yvalue}/>
                    </Paper>               
                </Grid>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <EventSt year={yvalue}/>
                    </Paper>
                    
                </Grid>       
            </Grid>
            </Container>

        </ThemeProvider>
    )
}

