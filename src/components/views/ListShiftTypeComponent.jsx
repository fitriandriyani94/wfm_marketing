import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import ShiftTypeDataService from '../services/ShiftTypeDataService.js';

class ListShiftTypeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shiftTypes: [],
            message:""
        }
        this.refreshShiftTypes = this.refreshShiftTypes.bind(this);
        this.deleteShiftTypeClicked = this.deleteShiftTypeClicked.bind(this);
        this.updateShiftTypeClicked = this.updateShiftTypeClicked.bind(this);
        this.addShiftTypeClicked = this.addShiftTypeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshShiftTypes();
    }

    refreshShiftTypes() {
        ShiftTypeDataService.retrieveAllShiftTypes("name")
            .then(
                response => {
                    this.setState({shiftTypes: response.data})
                }
            )
    }

    deleteShiftTypeClicked(id, code) {
        ShiftTypeDataService.deleteShiftType(id)
            .then(
                response => {
                    this.setState({message: `Delete of shift type ${code} Successful`})
                    this.refreshShiftTypes()
                }
            )
    }

    updateShiftTypeClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/shift-type/${id}`)
    }

    addShiftTypeClicked() {
        this.props.history.push('/shift-type/-1')
    }

    render() {
        return(
            <div>
                <h3>List Shift Type</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Shift Type Code</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.shiftTypes.map (
                                    shiftType => 
                                    <tr key={shiftType.idShift}>
                                        <td>{shiftType.shiftTypeCode}</td>
                                        <td>{shiftType.startTime}</td>
                                        <td>{shiftType.endTime}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateShiftTypeClicked(shiftType.idShift)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteShiftTypeClicked(shiftType.idShift, shiftType.shiftTypeCode)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addShiftTypeClicked()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListShiftTypeComponent