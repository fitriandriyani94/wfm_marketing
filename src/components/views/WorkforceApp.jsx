import React, {Component} from 'react';
import {HashRouter, Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from '../services/AuthenticatedRoute.jsx';
import LoginComponent from '../views/LoginComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import FooterComponent from '../views/FooterComponent.jsx';
import WelcomeComponent from '../views/WelcomeComponent.jsx';
import ErrorComponent from '../views/ErrorComponent.jsx';
import LogoutComponent from '../views/LogoutComponent.jsx';
import ListEmployeeComponent from '../views/ListEmployeeComponent.jsx';
import EmployeeComponent from '../views/EmployeeComponent.jsx';
import ListShiftTypeComponent from '../views/ListShiftTypeComponent.jsx';
import ShiftTypeComponent from '../views/ShiftTypeComponent.jsx';
import ListAssignmentComponent from '../views/ListAssignmentComponent.jsx';
import AssignmentComponent from '../views/AssignmentComponent.jsx';
import OptimizerComponent from '../views/OptimizerComponent.jsx';

class WorkforceApp extends Component {
    render() {
        return(
            <div className="TodoApp">
                <HashRouter basename="/">
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/employees" component={ListEmployeeComponent}/>
                            <AuthenticatedRoute path="/employee/:id" component={EmployeeComponent}/>
                            <AuthenticatedRoute path="/shift-types" component={ListShiftTypeComponent}/>
                            <AuthenticatedRoute path="/shift-type/:id" component={ShiftTypeComponent}/>
                            <AuthenticatedRoute path="/assignments" component={ListAssignmentComponent}/>
                            <AuthenticatedRoute path="/assignment/:id" component={AssignmentComponent}/>
                            <AuthenticatedRoute path="/optimizer" component={OptimizerComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route path="" component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </HashRouter>
            </div>
        );
    }
}

export default WorkforceApp;