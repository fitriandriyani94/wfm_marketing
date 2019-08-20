import React, {Component} from 'react';
import AuthenticationService from '../services/AuthenticationService.js';
import './LoginComponent.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'fitri.andriyani',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    loginClicked() {
        if(this.state.username === 'fitri.andriyani' && this.state.password === 'keepsecret') {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`welcome/${this.state.username}`)
        } else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    {this.state.hasLoginFailed && <div className="alert alert-primary">Invalid Credentials</div>}
                    <div className="container-gray">
                        <div className="col login-sec">
                            <h2 className="text-center">Sign In</h2>
                                <div className="form-group">
                                    <label htmlFor="usr">Username:</label>
                                    <input type="text" id="usr" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" id="pwd" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                    <br/>
                                    <button className="btn btn-primary" onClick={this.loginClicked}>
                                        Submit
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
            </div>
        )
    }
}

export default LoginComponent