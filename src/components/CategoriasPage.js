import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { CardCategory } from "./CardCategory";
import { LibraryContext } from "./LibraryContext";
import contactCategories from "../services/categories";
import { Notification } from "./Notification";

export const CategoriasPage = () => {
  const { categories, setCategories, setNoti, noti } =
    useContext(LibraryContext);
  const [{ nombre }, handleInputChange, reset] = useForm({
    nombre: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim().length <= 1) {
      return;
    }
    const newCategory = {
      nombre,
    };

    contactCategories
      .addCategory(newCategory)
      .then((category) => {
        console.log(category);
        setCategories(categories.concat(category.categoria));
        setNoti(`${category.categoria.nombre} category has been added`);
      })
      .catch((error) => {
        const { msg } = error.response.data;
        setNoti(`${msg}`);
      });
    reset();
    setTimeout(() => {
      setNoti(null);
    }, 4000);
  };

  const handleDelete = (id) => {
    const result = window.confirm("Do you want to delete person ?");
    if (result) {
      contactCategories
        .deleteCategory(id)
        .then((message) => {
          setCategories(
            categories.filter((category) => category.id !== id && category)
          );
          setNoti(`${message.data.msg}`);
        })
        .catch((error) => {
          const { msg } = error.response.data;
          setNoti(`${msg}`);
        });

      setTimeout(() => {
        setNoti(null);
      }, 4000);
    }
  };

  return (
    <div>
      <h1>Categorias Page</h1>

      <Notification alert={noti} />
      <div className="parent-container d-flex">
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="categoria"
              value={nombre}
              autoComplete="off"
              onChange={handleInputChange}
              name="nombre"
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
        <div className="container card">
          <ul className="list-group list-group-flush">
            {categories.map((category) => (
              <CardCategory
                key={category.id}
                category={category}
                handleDelete={() => handleDelete(category.id)}
              />
            ))}
          </ul>
          <div className="container"></div>
        </div>
        {/* <ModalPerson show={show} nombre={nombre} apellido={apellido} handleInputChange={handleInputChange} /> */}
      </div>
    </div>
  );
};
