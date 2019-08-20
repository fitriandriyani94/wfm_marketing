import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ShiftTypeDataService from '../services/ShiftTypeDataService.js';

class ShiftTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            shiftTypeCode: '',
            startTime: '',
            endTime: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        ShiftTypeDataService.retrieveShiftType(this.state.id)
        .then(response => this.setState({
            shiftTypeCode:response.data.shiftTypeCode,
            startTime:response.data.startTime,
            endTime:response.data.endTime
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.shiftTypeCode) {
            errors.shiftTypeCode = 'Enter a shift type code'           
        } else if(values.shiftTypeCode.length < 1) {
            errors.shiftTypeCode = 'Enter at least 1 characters for shift type code'
        }

        return errors;
    }

    onSubmit(values) {

        if(this.state.id === '-1') {
            console.log("Create")
            ShiftTypeDataService.createShiftType({
                shiftTypeCode:values.shiftTypeCode,
                startTime:values.startTime,
                endTime:values.endTime
            }).then(() => this.props.history.push('/shift-types'))
        } else {
            console.log("Update")
            ShiftTypeDataService.updateShiftType(this.state.id, {
                shiftTypeCode:values.shiftTypeCode,
                startTime:values.startTime,
                endTime:values.endTime
            }).then(() => this.props.history.push('/shift-types'))
        }
    }

    render() {
        let {shiftTypeCode, startTime, endTime} = this.state

        return (
            <div>
                <h1>Shift Type</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{shiftTypeCode,startTime,endTime}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="shiftTypeCode" component="div" className="alert alert-warning"/>                                            
                                            <fieldset className="form-group">
                                                <label>Shift Type Code</label>
                                                <Field className="form-control" type="text" name="shiftTypeCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Start Time</label>
                                                <Field className="form-control" type="text" name="startTime"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>End Time</label>
                                                <Field className="form-control" type="text" name="endTime"/>
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

export default ShiftTypeComponent