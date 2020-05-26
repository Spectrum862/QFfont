import React,{useState} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Container , Tabs,Tab, Paper, makeStyles, Typography, InputBase,Snackbar} from '@material-ui/core'
import QFChart from './components/QFChart'
import BudgetChart from './components/ฺBudgetChart'
import EventChart from './components/EventChart'
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    cardpad:{
        padding: theme.spacing(2),
        height: '100%',
    },
    grow:{
        flexGrow:1
    },
    marginGrid:{
        marginBottom:theme.spacing(4)
    }
    
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function OfficerHome({dispatch,isLogin}) {
    const [dvalue, setdValue] = useState(0)
    const [yvalue, setyValue] = useState(0)
    const [year,setYear] = useState(2562)
    const [snackbar,setSnack] = useState(null)
    const [message,setMessage] =useState('')
    
    const spacing = 3
    const elevation = 3
    const classes = useStyles() 

    const handleChangeD = (event, newValue) => {
        setdValue(newValue);
    };

    const handleChangeY = (event, newValue) => {
        setyValue(newValue);
    };

    const handleYear=e =>{
        if(e.key === 'Enter') {
            if(e.target.value!==''){
                setSnack(false)
                setYear(e.target.value)
            }
            else {
                setSnack(true)
                setMessage('Please input year')
            }
        }
    }

    const handleClose = (event, reason) => {
        setSnack(false)
    }

    return(
        
        <ThemeProvider theme={theme}>
            <Paper square>
                <Tabs             
                    value={dvalue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeD}
                    variant="scrollable"
                    scrollButtons='auto'
                >
                    <Tab label="สาขาทั้งหมด" />
                    <Tab label="Mathematics" />
                    <Tab label="Chemistry" />
                    <Tab label="Physics" />
                    <Tab label="Microbiology" />
                </Tabs>
            </Paper>
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
            <Typography>
                {"ปีการศึกษา : "}
                <InputBase type='number' placeholder={String(year)} onKeyDown={handleYear} style={{marginBottom:10 ,marginTop:-15}}/>
            </Typography>
            
            
            <Grid container spacing={spacing}>
                <Grid item xs={12} md={6} xl={4} className={classes.marginGrid}>
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <QFChart study_year={yvalue} year={year} department={dvalue}/>
                    </Paper>               
                </Grid>
                <Grid item xs={12} md={6} xl={4} className={classes.marginGrid}>
                    <Paper className={classes.cardpad} elevation={elevation}>
                        <BudgetChart/>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} md={6} xl={4} className={classes.marginGrid}>
                    <Paper className={classes.cardpad}elevation={elevation}>
                        <EventChart year={year}/>
                    </Paper>
                </Grid>        
            </Grid>
            </Container>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

        </ThemeProvider>
    )
}

