import React from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './pages/login'
import { Route,Switch, BrowserRouter  } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/login" component={Login} />
      <Route/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
