import React from 'react'
import { Route,  Redirect  } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({component:Component,isLogin,...rest}) {
  return (
    <Route {...rest} render={props => (isLogin ? <Component {...props} />: <Redirect to="/login" />)} />
  );
}
const mapStateToProps = function(state){
    return{
        isLogin : state.session.isLogin
    }
}

export default connect(mapStateToProps)(PrivateRoute)