import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { LibraryContext } from "./LibraryContext";
import { Notification } from "./Notification";
import contactBooks from "../services/books";
import { CardBooks } from "./CardBooks";
import ReactModal from "react-modal";

ReactModal.setAppElement(document.getElementById("root"));
export const LibrosPage = () => {
  const { libros, setLibros, setNoti, noti, categories } =
    useContext(LibraryContext);
  const [{ nombre, descripcion, categoriaId }, handleInputChange, reset] =
    useForm({
      nombre: "",
      descripcion: "",
      categoriaId: "",
    });

  const [bookFilter, setbookFilter] = useState("");

  const handleFilter = (id) => {
    setbookFilter(id);
  };

  const returnFilterBooks =
    bookFilter === ""
      ? libros
      : libros.filter((book) => book.categoriaId === bookFilter);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      nombre,
      descripcion,
      categoriaId,
    };

    contactBooks
      .addBook(newBook)
      .then((book) => {
        console.log(book);
        setLibros(libros.concat(book.libro));
        setNoti(`Se agrego el Libro a la base de datos`);
      })
      .catch((error) => {
        const errora = error.response;
        setNoti(`${errora.data.msg}`);
      });

    reset();
    setTimeout(() => {
      setNoti(null);
    }, 4000);
  };

  const delBook = (id) => {
    const result = window.confirm("quieres eliminar el libro seleccionado?");

    if (result) {
      contactBooks
        .deleteBook(id)
        .then((book) => {
          setLibros(libros.filter((libro) => libro.id !== id && libro));

          setNoti(`${book.data.msg}`);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          const { msg } = error.response.data;
          console.log(error.response.data);
          setNoti(`${msg}`);
        });
      setTimeout(() => {
        setNoti(null);
      }, 4000);
    }
  };

  const lendBook = (id, lendPerson) => {
    console.log(lendPerson.personaId);

    contactBooks
      .lendBooks(id, lendPerson)
      .then(
        (returnBook) => {
          setLibros(
            libros.map((libro) =>
              libro.id === id ? returnBook.data.presentBook : libro
            )
          );
          window.scrollTo(0, 0);
          setNoti(`${returnBook.data.msg}`);
        }
        // console.log(returnBook.data.msg)
      )
      .catch((error) => setNoti(error.response.data.msg));
    setTimeout(() => {
      setNoti(null);
    }, 4000);
  };

  const returnBook = (id) => {
    console.log(id);

    contactBooks
      .returnBook(id)
      .then(({ data }) => {
        const { libro, msg } = data;
        console.log(libro);
        setLibros(
          libros.map((newlibro) =>
            newlibro.id === id ? { ...libro, personaId: "0" } : newlibro
          )
        );
        setNoti(`${msg}`);
      })
      .catch((error) => console.log(error));
    setTimeout(() => {
      setNoti(null);
    }, 4000);
  };

  return (
    <div>
      <h1>Libros Page</h1>
      <Notification alert={noti} />
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filtrar Categoria
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            style={{ color: "white", background: "red" }}
            onClick={() => setbookFilter("")}
          >
            Quitar Filtros
          </Dropdown.Item>
          {categories.map((category) => (
            <Dropdown.Item
              key={category.id}
              value={category.id}
              onClick={() => handleFilter(category.id)}
            >
              {category.nombre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="parent-container d-flex">
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreBook" className="form-label">
              Autor
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreBook"
              value={nombre}
              autoComplete="off"
              onChange={handleInputChange}
              name="nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              value={descripcion}
              autoComplete="off"
              onChange={handleInputChange}
              name="descripcion"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">
              Categoria
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleInputChange}
              value={categoriaId}
              name="categoriaId"
            >
              <option defaultValue>Seleccione la Categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          </div>
        </form>
        <div className="container ">
          {
            returnFilterBooks.map((book) => {
              const findCategory = categories.find(
                (category) => category.id === book.categoriaId
              );

              return (
                <CardBooks
                  key={book.id}
                  book={book}
                  findCategory={findCategory}
                  deleteBook={() => delBook(book.id)}
                  lendBook={lendBook}
                  returnBook={returnBook}
                />
              );
            })

            // :return (<p>No hay libros Con esa Categoria{console.log('efe')}</p>)
          }
        </div>
        {/* <ModalPerson show={show} nombre={nombre} apellido={apellido} handleInputChange={handleInputChange} /> */}
      </div>
    </div>
  );
};
