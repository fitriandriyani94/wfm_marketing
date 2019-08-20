import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AssignmentDataService from '../services/AssignmentDataService.js';

class AssignmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            jobCode: '',
            jobName: '',
            activityDate: '',
            activityName: '',
            instance: '',
            classCount: '',
            hour: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        AssignmentDataService.retrieveAssignment(this.state.id)
        .then(response => this.setState({
            jobCode:response.data.jobCode,
            jobName:response.data.jobName,
            activityDate:moment(response.data.activityDate).format('YYYY-MM-DD'),
            activityName:response.data.activityName,
            instance:response.data.instance,
            classCount:response.data.classCount,
            hour:response.data.hour
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.jobCode) {
            errors.jobCode = 'Enter a job code'           
        } else if(values.jobCode.length < 5) {
            errors.jobCode = 'Enter at least 5 characters for job code'
        }

        if(!values.jobName) {
            errors.jobName = 'Enter a job name'           
        } else if(values.jobName.length < 5) {
            errors.jobName = 'Enter at least 5 characters for job name'
        }

        return errors;
    }

    onSubmit(values) {

        if(this.state.id === '-1') {
            console.log("Create")
            AssignmentDataService.createAssignment({
                jobCode:values.jobCode,
                jobName:values.jobName,
                activityDate:values.activityDate,
                activityName:values.activityName,
                instance:values.instance,
                classCount:values.classCount,
                hour:values.hour
            }).then(() => this.props.history.push('/assignments'))
        } else {
            console.log("Update")
            AssignmentDataService.updateAssignment(this.state.id, {
                jobCode:values.jobCode,
                jobName:values.jobName,
                activityDate:values.activityDate,
                activityName:values.activityName,
                instance:values.instance,
                classCount:values.classCount,
                hour:values.hour
            }).then(() => this.props.history.push('/assignments'))
        }
    }

    render() {
        let {jobCode, jobName, activityDate, activityName, instance, classCount, hour} = this.state

        return (
            <div>
                <h1>Assignment</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{jobCode,jobName,activityDate,activityName,instance,classCount,hour}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="jobCode" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="jobName" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Job Code</label>
                                                <Field className="form-control" type="text" name="jobCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Job Name</label>
                                                <Field className="form-control" type="text" name="jobName"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Activity Date</label>
                                                <Field className="form-control" type="date" name="activityDate"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Activity Name</label>
                                                <Field className="form-control" type="text" name="activityName"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Instance</label>
                                                <Field className="form-control" type="text" name="instance"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Class Count</label>
                                                <Field className="form-control" type="text" name="classCount"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Hour</label>
                                                <Field className="form-control" type="text" name="hour"/>
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

export default AssignmentComponent