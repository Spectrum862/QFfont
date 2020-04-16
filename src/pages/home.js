import React,{useEffect, useState} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  
import { Grid, Container , Tabs,Tab, Paper} from '@material-ui/core'
import Chart from './components/chart'

export default function Home() {
    const [data,setData] = useState(null)
    const [value, setValue] = useState(2)
      
    useEffect(()=>{
        loaddata()
    })

    const loaddata = () =>{

    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
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
                    <Tab label="Active" />
                    <Tab label="Disabled" disabled />
                    <Tab label="Active" />
                </Tabs>
                </Paper>         
            <Container maxWidth='xl' className='padding'>
            <Grid container>
                <Grid item xs={12} md={6} xl={4}>
                    <Chart />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <Chart />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <Chart />
                </Grid>        
            </Grid>
            </Container>
        </ThemeProvider>
    )
}
