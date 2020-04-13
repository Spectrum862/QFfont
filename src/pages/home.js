import React from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  
import { Grid } from '@material-ui/core'

export default function Home() {
    return(
        <ThemeProvider theme={theme}>
            <Nav/>
            <Grid container>
                
            </Grid>
        </ThemeProvider>
    )
}
