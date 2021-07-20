import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Cards } from "./Cards";
import { LibraryContext } from "./LibraryContext";
import contactPerson from "../services/persons";
import { Notification } from "./Notification";

export const PersonaPage = () => {
  const { persons, setPersons ,setNoti,noti } = useContext(LibraryContext);
  const [{ nombre, apellido, alias, email }, handleInputChange, reset] =
    useForm({
      nombre: "",
      apellido: "",
      alias: "",
      email: "",
    });
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   (nombre.trim().length &&
    //     apellido.trim().length &&
    //     alias.trim().length &&
    //     email.trim().length) <= 1
    // ) {
    //   return;
    // }
    const newPersona = {
      nombre,
      apellido,
      alias,
      email,
    };
    contactPerson
      .createPerson(newPersona)
      .then((person) => {
          console.log(person)
          setPersons(persons.concat(person.persona));
          setNoti(`Se ha agregado ${person.persona.nombre} a la base de datos`)
          reset();
      })
      .catch((error) => {
        const {msg} = error.response.data;
        setNoti(msg)
        console.log(msg)
        
        // setNotification(`${alert.error}`);
      });

      setTimeout(() => {
        setNoti(null);
      }, 4000);
  };

  return (
    <div>
      <h1> Persona page</h1>
      <Notification alert = {noti} />
      <form className="container" onSubmit={handleSubmit}>
        <div>
          Nombre:{" "}
          <input
            value={nombre}
            autoComplete="off"
            onChange={handleInputChange}
            type="text"
            name="nombre"
          />
          <br />
          Apellido:{" "}
          <input
            type="text"
            autoComplete="off"
            value={apellido}
            onChange={handleInputChange}
            name="apellido"
          />
          <br />
          Alias:
          <input
            type="text"
            autoComplete="off"
            value={alias}
            onChange={handleInputChange}
            name="alias"
          />
          <br />
          Email:
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <div className="container-lg">
        {persons.map((person) => (
          <Cards person={person} key={person.id} />
        ))}
        <div className="container"></div>
      </div>
    </div>
  );
};
