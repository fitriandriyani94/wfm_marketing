import axios from 'axios';

const HOST_API = 'https://workforceproject.herokuapp.com';
const SERVICE_API = `${HOST_API}/assignments`;

class AssignmentDataService {
    retrieveAllAssignments(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteAssignment(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveAssignment(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateAssignment(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createAssignment(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new AssignmentDataService();