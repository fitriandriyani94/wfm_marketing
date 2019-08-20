import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService.js';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://raharja.ac.id/" className="navbar-brand">Workforce Management</a></div>
                    <ul className="navbar-nav"> 
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/fitri.andriani">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/employees">Employee</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/shift-types">Shift Type</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/assignments">Assignment</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/optimizer">Optimizer</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent