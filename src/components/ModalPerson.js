import React from "react";
import { useForm } from "../hooks/useForm";
import "./Modal.css";
export const ModalPerson = ({ show, close }) => {
  const [{ nombre, apellido }, handleInputChange, reset] = useForm({
    nombre: "",
    apellido: "",
  });

  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <p>Welcome To Our Site</p>
          <span onClick={close} className="close-modal-btn">
            x
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
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
            value={apellido}
            autoComplete="off"
            onChange={handleInputChange}
            name="apellido"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Edit Person
          </button>
        </div>
      </div>
    </div>
  );
};
