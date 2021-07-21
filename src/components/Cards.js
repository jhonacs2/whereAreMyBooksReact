import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import contactPerson from "../services/persons";

export const Cards = React.memo(({ person, setPersons, persons, setNoti , deletePerson }) => {
  const [{ nombre, apellido }, handleInputChange] = useForm({
    nombre: person.nombre || "",
    apellido: person.apellido || "",
  });
  const [show, setShow] = useState(false);

  const handleInputEdit = (e) => {
    e.preventDefault();
    const editName = {
      nombre,
      apellido,
    };
    contactPerson
      .updatePerson(person.id, editName)
      .then(({ data }) => {
        console.log(data);
        const { persona, msg } = data;
        setPersons(
          persons.map((perso) =>
            perso.id === person.id ? { ...persona, nombre, apellido } : perso
          )
        );
        setNoti(`${msg}`);
        setShow(false);
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

  

  return (
    <>
      <div className="p-2">
        <div className="card text-center ">
          <div className="card-header" style={{ background: "#FF5733" }}>
            Alias: <strong>{person.alias}</strong>
          </div>
          <div className="card-body">
            <form
              className="form-group column p-1 m-2"
              onSubmit={handleInputEdit}
            >
              {show ? (
                <>
                  <div className="col-auto">
                    <input
                      className="form-control"
                      value={show ? nombre : person.nombre}
                      onChange={handleInputChange}
                      name="nombre"
                    />{" "}
                  </div>
                  <div className="col-auto">
                    <input
                      className="form-control"
                      value={show ? apellido : person.apellido}
                      onChange={handleInputChange}
                      name="apellido"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-auto">
                    <input
                      className="form-control"
                      value={show ? nombre : person.nombre}
                      onChange={handleInputChange}
                      name="nombre"
                      disabled
                    />{" "}
                  </div>
                  <div className="col-auto">
                    <input
                      className="form-control"
                      value={show ? apellido : person.apellido}
                      onChange={handleInputChange}
                      name="apellido"
                      disabled
                    />
                  </div>
                </>
              )}

              {show ? (
                <>
                  <button type="submit" className="btn btn-success ">
                    Send
                  </button>
                </>
              ) : (
                <button type="submit" className="btn btn-success " disabled>
                  Send
                </button>
              )}
            </form>
          </div>
          <div className="card-footer text-muted">
            Correo: <strong>{person.email}</strong>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={deletePerson}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
