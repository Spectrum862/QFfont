import React,{useEffect, useState} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  
import { Grid, Container , Tabs,Tab, Paper, CircularProgress, Card, makeStyles} from '@material-ui/core'
import Chart from './components/chart'
import pattern from 'patternomaly'
import { connect } from 'react-redux'

const testdata =  {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data:[10,20,30,20,50,60],
        backgroundColor: [             
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#36a2eb'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('triangle', '#ffce56'),
            pattern.draw('weave', '#cc85fe'),
            pattern.draw('zigzag', '#77ce56')
        ]
    }]
}

const useStyles = makeStyles((theme) => ({
    cardpad:{
        padding: theme.spacing(2)
    },
  }));

function Home({dispatch,isLogin}) {
    const [data,setData] = useState(null)
    const [value, setValue] = useState(0)
    const spacing = 3
    const elevation = 3
    const classes = useStyles()
    useEffect(()=>{
        loaddata()       
    })

    const loaddata = () =>{
        setData(testdata)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return data !== null ?(
        
        <ThemeProvider theme={theme}>
            <Nav/>
            <Paper square>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="All" />
                    <Tab label="Mathematics" />
                    <Tab label="Chemistry" />
                    <Tab label="Physics" />
                    <Tab label="Microbiology" />
                </Tabs>
            </Paper>         

            <Container maxWidth='xl' className='padding'>
            <Grid container spacing={spacing}>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <Chart data={testdata} />
                    </Paper>               
                </Grid>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <Chart data={testdata} /> 
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className={classes.cardpad}elevation={elevation}>
                        <Chart data={testdata} /> 
                    </Paper>
                </Grid>        
            </Grid>
            </Container>

        </ThemeProvider>
    ):<ThemeProvider  theme={theme}><div id='loader'><CircularProgress color='primary'/></div></ThemeProvider>
}

const mapStateToProps = function(state) {
    return {
      session : state.session,
      isLogin : state.session.isLogin
    }
}
export default connect(mapStateToProps)(Home)