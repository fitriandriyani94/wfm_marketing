import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeDataService from '../services/EmployeeDataService.js';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message:""
        }
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeDataService.retrieveAllEmployees("name")
            .then(
                response => {
                    this.setState({employees: response.data})
                }
            )
    }

    deleteEmployeeClicked(id, name) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({message: `Delete of employee ${name} Successful`})
                    this.refreshEmployees()
                }
            )
    }

    updateEmployeeClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/employee/${id}`)
    }

    addEmployeeClicked() {
        this.props.history.push('/employee/-1')
    }

    render() {
        return(
            <div>
                <h3>List Employee</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NIP</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Skill</th>
                                <th>Role</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map (
                                    employee => 
                                    <tr key={employee.idEmployee}>
                                        <td>{employee.name}</td>
                                        <td>{employee.nip}</td>
                                        <td>{employee.position}</td>
                                        <td>{employee.status}</td>
                                        <td>{employee.employeeSkill}</td>
                                        <td>{employee.employeeRole}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateEmployeeClicked(employee.idEmployee)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteEmployeeClicked(employee.idEmployee, employee.name)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addEmployeeClicked()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent