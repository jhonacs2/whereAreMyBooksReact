import axios from "axios";

const baseUrl = "http://localhost:8082/libro";

const getAllBooks = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBook = (newBook) => {
  const request = axios.post(baseUrl, newBook);
  return request.then((response) => response.data);
};

const updateBook = (id, newDescription) => {
  const request = axios.put(`${baseUrl}/${id}`, newDescription);
  return request.then((response) => response);
};
const deleteBook = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

const lendBooks = (id,person) => {
  const request = axios.put(`http://localhost:8082/libro/prestar/${id}`,person)
  return request.then((response) => response )
}

const returnBook = (id) => {
  const request = axios.put(`http://localhost:8082/libro/devolver/${id}`,{personId:"0"})
  return request.then((response) => response )
}

export default {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  lendBooks,
  returnBook
};
