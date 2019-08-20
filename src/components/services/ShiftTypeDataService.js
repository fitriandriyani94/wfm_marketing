import axios from 'axios';

const HOST_API = 'https://workforceproject.herokuapp.com';
const SERVICE_API = `${HOST_API}/shiftTypes`;

class ShiftTypeDataService {
    retrieveAllShiftTypes(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteShiftType(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveShiftType(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateShiftType(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createShiftType(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new ShiftTypeDataService();