import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import AssignmentDataService from '../services/AssignmentDataService.js';

class ListAssignmentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            message:""
        }
        this.refreshAssignments = this.refreshAssignments.bind(this);
        this.deleteAssignmentClicked = this.deleteAssignmentClicked.bind(this);
        this.updateAssignmentClicked = this.updateAssignmentClicked.bind(this);
        this.addAssignmentClicked = this.addAssignmentClicked.bind(this);
    }

    componentDidMount() {
        this.refreshAssignments();
    }

    refreshAssignments() {
        AssignmentDataService.retrieveAllAssignments("name")
            .then(
                response => {
                    this.setState({assignments: response.data})
                }
            )
    }

    deleteAssignmentClicked(id, name) {
        AssignmentDataService.deleteAssignment(id)
            .then(
                response => {
                    this.setState({message: `Delete of assignment ${name} Successful`})
                    this.refreshAssignments()
                }
            )
    }

    updateAssignmentClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/assignment/${id}`)
    }

    addAssignmentClicked() {
        this.props.history.push('/assignment/-1')
    }

    render() {
        return(
            <div>
                <h3>List Assignment</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Job Code</th>
                                <th>Job Name</th>
                                <th>Activity Date</th>
                                <th>Activity Name</th>
                                <th>Instance</th>
                                <th>Class Count</th>
                                <th>Hour</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.assignments.map (
                                    assignment => 
                                    <tr key={assignment.idAssignment}>
                                        <td>{assignment.jobCode}</td>
                                        <td>{assignment.jobName}</td>
                                        <td>{assignment.activityDate}</td>
                                        <td>{assignment.activityName}</td>
                                        <td>{assignment.instance}</td>
                                        <td>{assignment.classCount}</td>
                                        <td>{assignment.hour}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateAssignmentClicked(assignment.idAssignment)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteAssignmentClicked(assignment.idAssignment, assignment.jobCode)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addAssignmentClicked()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListAssignmentComponent