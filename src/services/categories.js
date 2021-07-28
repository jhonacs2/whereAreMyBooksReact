import axios from "axios"

const baseUrl = "http://localhost:8082/categoria"

const getAllCategories = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const addCategory = (newCat) => {
    const request = axios.post(baseUrl,newCat);
    return request.then((response => response.data))
}

const deleteCategory = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response)
}

export default{
    getAllCategories,
    addCategory,
    deleteCategory
}