import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Cards } from "./Cards";
import { LibraryContext } from "./LibraryContext";
import contactPerson from "../services/persons";
import { Notification } from "./Notification";

export const PersonaPage = () => {
  const { persons, setPersons, setNoti, noti } = useContext(LibraryContext);
  const [{ nombre, apellido, alias, email }, handleInputChange, reset] =
    useForm({
      nombre: "",
      apellido: "",
      alias: "",
      email: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (nombre.trim().length &&
        apellido.trim().length &&
        alias.trim().length &&
        email.trim().length) <= 1
    ) {
      return;
    }
    const newPersona = {
      nombre,
      apellido,
      alias,
      email,
    };
    contactPerson
      .createPerson(newPersona)
      .then((person) => {
        console.log(person);
        setPersons(persons.concat(person.persona));
        setNoti(`Se ha agregado a ${person.persona.nombre} a la base de datos`);
        reset();
      })
      .catch((error) => {
        const { msg } = error.response.data;
        setNoti(msg);
        console.log(msg);
      });

    setTimeout(() => {
      setNoti(null);
    }, 4000);
  };

  const deletePerson = (id) => {
    const result = window.confirm("Do you want to delete person ?");
    if (result) {
      contactPerson
        .deletePerson(id)
        .then((message) => {
          console.log(message);
          setPersons(persons.filter((person) => person.id !== id && person));
          setNoti(`${message.data.msg}`);
        })
        .catch((error) => {
          const { msg } = error.response.data;
          // setPersons(persons.filter((person) => person.id !== id));
          setNoti(`${msg}`);
        });

      setTimeout(() => {
        setNoti(null);
      }, 4000);
    }
  };

  return (
    <div>
      <h1> Persona Page</h1>
      <Notification alert={noti} />

      <div className="parent-container d-flex">
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              autoComplete="off"
              onChange={handleInputChange}
              name="nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              value={apellido}
              autoComplete="off"
              onChange={handleInputChange}
              name="apellido"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alias" className="form-label">
              Alias
            </label>
            <input
              type="text"
              className="form-control"
              id="alias"
              value={alias}
              autoComplete="off"
              onChange={handleInputChange}
              name="alias"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Add Person
            </button>
          </div>
        </form>
        <div className="container-lg">
          {persons.map((person) => (
            <Cards
              person={person}
              key={person.id}
              setPersons={setPersons}
              persons={persons}
              setNoti={setNoti}
              deletePerson={() => deletePerson(person.id)}
            />
          ))}
          <div className="container"></div>
        </div>
        {/* <ModalPerson show={show} nombre={nombre} apellido={apellido} handleInputChange={handleInputChange} /> */}
      </div>
    </div>
  );
};
