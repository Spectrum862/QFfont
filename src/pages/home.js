import React from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'  

import { connect } from 'react-redux'
import OfficerHome from './officerhome'
import StudentHome from './studenthome'
import TeacherHome from './teacherhome'

function Home({permisslevel}) {
    return (
        
        <ThemeProvider theme={theme}>
            <Nav/>      
            {permisslevel==3&&<OfficerHome/>}
            {permisslevel==2&&<TeacherHome/>}
            {permisslevel==1&&<StudentHome/>}
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