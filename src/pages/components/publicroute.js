import React from 'react'
import { Route,  Redirect  } from 'react-router-dom'
import { connect } from 'react-redux'

function PublicRoute({component:Component,restricted=false,isLogin,...rest}) {
  return (
    <Route {...rest} render={
        props => (isLogin&&restricted ?  <Redirect to="/" />:<Component {...props} />)
    } />
  );
}
const mapStateToProps = function(state){
    return{
        isLogin : state.session.isLogin
    }
}

export default connect(mapStateToProps)(PublicRoute)