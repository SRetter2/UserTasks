import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthContextComponent } from './AuthContext';
import Logout from './pages/Logout';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                </Layout>
            </AuthContextComponent>
        );
    }
}