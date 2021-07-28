import React, { useContext } from "react";

import { useForm } from "../hooks/useForm";
import contactBooks from "../services/books";
import { LibraryContext } from "./LibraryContext";

export const CardBooks = React.memo(
  ({ book, findCategory, deleteBook, lendBook,returnBook }) => {
    const [{ descripcion, personaId }, handleInputChange] = useForm({
      descripcion: "",
      personaId: "",
    });
    const { libros, setLibros, setNoti, persons } = useContext(LibraryContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      const confi = window.confirm("Esta seguro de editar la descipcion?");
      if (confi) {
        const newDescription = {
          descripcion,
        };

        contactBooks
          .updateBook(book.id, newDescription)
          .then((returnDescription) => {
            console.log();
            setLibros(
              libros.map((libro) =>
                libro.id === book.id ? returnDescription.data.libro : libro
              )
            );
            setNoti(`${returnDescription.data.msg}`);
          })
          .catch((error) => {
            const errora = error.response;
            setNoti(`${errora.data.msg}`);
          });

        setTimeout(() => {
          setNoti(null);
        }, 4000);
      }
    };

    return (
      <>
        <div className="card">
          <h5 className="card-header">{book.nombre}</h5>
          <div className="card-body">
            <h5 className="card-title">
              {findCategory && findCategory.nombre}
            </h5>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Descripcion
              </label>
              <textarea
                className="form-control"
                id="textAreaDescription"
                rows="3"
                value={descripcion ? descripcion : book.descripcion}
                onChange={handleInputChange}
                name="descripcion"
              ></textarea>
              <div className="mb-10 m-10">Prestar a:</div>
              <select
                className="form-select form-select-sm"
                aria-label="Default select example"
                onChange={handleInputChange}
                defa={
                  book.personaId === "0" ? "El Libro No Fue Prestado" : "efe"
                }
                name="personaId"
                disabled={book.personaId !== "0" ? "disabled" : null}
              >
                <option defaultValue>
                  {book.personaId !== "0"
                    ? "El Libro ya fue Prestado"
                    : "El libro no fue prestado"}
                </option>
                {persons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.email}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-success">
              Editar
            </button>
            <button onClick={deleteBook} className="btn btn-danger">
              Borrar
            </button>
            <button
              onClick={() => lendBook(book.id, { personaId })}
              className="btn btn-warning"
              disabled={book.personaId !== "0" ? "disabled" : null}
            >
              Prestar
            </button>
            <button
              onClick={() => returnBook(book.id)}
              className="btn btn-info"
              disabled={book.personaId !== "0" ? null : "disabled"}
            >
              Devolver Libro
            </button>
          </div>
        </div>
      </>
    );
  }
);
