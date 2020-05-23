import React from 'react'
import { Route,Switch, BrowserRouter, Redirect  } from 'react-router-dom'
import PrivateRoute from './pages/components/privateroute'
import PublicRoute from './pages/components/publicroute'

//pages
import Login from './pages/login'
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home}/>
      <PublicRoute restricted={true} exact path="/login" component={Login} />
      <Route render={props=> <Redirect to="/"/>}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
