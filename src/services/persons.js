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

export default {
    getAllPersons,
    createPerson
};