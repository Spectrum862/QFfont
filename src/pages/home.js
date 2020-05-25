import React from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  

import { connect } from 'react-redux'
import OfficerHome from './officerhome'

function Home({permisslevel}) {
    return (
        
        <ThemeProvider theme={theme}>
            <Nav/>      
            {permisslevel==3&&<OfficerHome/>}

        </ThemeProvider>
    )
}

const mapStateToProps = function(state) {
    return {
      session : state.session,
      isLogin : state.session.isLogin,
      permisslevel : state.session.user.user_type
    }
}
export default connect(mapStateToProps)(Home)