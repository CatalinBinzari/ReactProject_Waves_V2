import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './hoc/layout'
import Auth from './hoc/auth'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import UserDashboard from './components/User'
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        {/* wee will render auth instead of UserDashboard component 
          complete public routes will be true, not public completly will be false, and completly public will be null
        */}
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}


export default Routes;
