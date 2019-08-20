import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import EmployeeDataService from '../services/EmployeeDataService.js';

class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            nip: '',
            position: '',
            status: '',
            employeeSkill: '',
            employeeRole: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        EmployeeDataService.retrieveEmployee(this.state.id)
        .then(response => this.setState({
            name:response.data.name,
            nip:response.data.nip,
            position:response.data.position,
            status:response.data.status,
            employeeSkill:response.data.employeeSkill,
            employeeRole:response.data.employeeRole
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.name) {
            errors.name = 'Enter an employee name'           
        } else if(values.name.length < 5) {
            errors.name = 'Enter at least 5 characters for employee name'
        }

        if(!values.nip) {
            errors.nip = 'Enter a NIP'           
        } else if(values.nip.length < 5) {
            errors.nip = 'Enter at least 5 characters for NIP'
        }

        return errors;
    }

    onSubmit(values) {

        if(this.state.id === '-1') {
            console.log("Create")
            EmployeeDataService.createEmployee({
                name:values.name,
                nip:values.nip,
                position:values.position,
                status:values.status,
                employeeSkill:values.employeeSkill,
                employeeRole:values.employeeRole
            }).then(() => this.props.history.push('/employees'))
        } else {
            console.log("Update")
            EmployeeDataService.updateEmployee(this.state.id, {
                name:values.name,
                nip:values.nip,
                position:values.position,
                status:values.status,
                employeeSkill:values.employeeSkill,
                employeeRole:values.employeeRole
            }).then(() => this.props.history.push('/employees'))
        }
    }

    render() {
        let {name, nip, position, status, employeeSkill, employeeRole} = this.state

        return (
            <div>
                <h1>Employee</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{name,nip,position,status,employeeSkill, employeeRole}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="name" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="nip" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Name</label>
                                                <Field className="form-control" type="text" name="name"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>NIP</label>
                                                <Field className="form-control" type="text" name="nip"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Position</label>
                                                <Field className="form-control" type="text" name="position"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Status</label>
                                                <Field className="form-control" type="text" name="status"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Skill</label>
                                                <Field className="form-control" type="text" name="employeeSkill"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Role</label>
                                                <Field className="form-control" type="text" name="employeeRole"/>
                                            </fieldset>
                                            <button className="btn btn-success" type="submit">Save</button>
                                        </Form>
                                    )                        
                                }
                            </Formik>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default EmployeeComponent