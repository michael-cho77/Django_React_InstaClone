import React from 'react';
import { Route } from "react-router-dom";
import AppLayout from 'components/AppLayout';
import Home from './Home';
import About from './About';
import AccountsRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from './PostNew';
import sidebar from '../components/AppLayout'



function Root() {
    return (
        <>
            <AppLayout >
                <LoginRequiredRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
                <Route path="/accounts" component={AccountsRoutes} />
            </AppLayout>
        </>
    );
}

export default Root;