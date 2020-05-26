import React from 'react'
import { Route,Switch, BrowserRouter, Redirect  } from 'react-router-dom'
import PrivateRoute from './pages/components/privateroute'
import PublicRoute from './pages/components/publicroute'
import AdminRoute from './pages/components/adminroute'

//pages
import Login from './pages/login'
import Home from './pages/home'
import Adduser from './pages/adduser'



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home}/>
      <AdminRoute exact path="/adduser" component={Adduser}/>
      <PublicRoute restricted={true} exact path="/login" component={Login} />
      <Route render={props=> <Redirect to="/"/>}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
