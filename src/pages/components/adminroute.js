import React from 'react'
import { Route,  Redirect  } from 'react-router-dom'
import { connect } from 'react-redux'

function AdminRoute({component:Component,admin,isLogin,...rest}) {
  return (
    <Route {...rest} render={props => (admin&&isLogin ? <Component {...props} />: <Redirect to="/" />)} />
  );
}
const mapStateToProps = function(state){
    return{
        admin : state.profile.is_admin,
        isLogin : state.session.isLogin
    }
}

export default connect(mapStateToProps)(AdminRoute)