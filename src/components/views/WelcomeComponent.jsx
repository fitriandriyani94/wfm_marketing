import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

class WelcomeComponent extends Component {
    render() {
        return(
            <>
                <Jumbotron>
                    {<h1>Welcome {this.props.match.params.name}</h1>}
                    <p>
                        This is a workforce management application, You can manage your employees <Link to="/employees">here</Link>.
                    </p>
                    <p>
                        You can manage assignment for your employees <Link to="/assignments">here</Link>.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            </>
        )
    }
}

export default WelcomeComponent