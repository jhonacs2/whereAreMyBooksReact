import axios from "axios"

const baseUrl = "http://localhost:8082/persona"

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl,newPerson);
    return request.then((response => response.data))
    
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`,newPerson);
    return request.then((response) => response)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response)
}


export default {
    getAllPersons,
    createPerson,
    updatePerson,
    deletePerson
};