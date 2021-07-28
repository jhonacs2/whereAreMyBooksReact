import React, { useEffect, useState } from "react";

import { AppRouter } from "./AppRouter";
import { LibraryContext } from "./LibraryContext";
import contactPerson from "../services/persons";
import contactCategories from "../services/categories";
// import contactBooks from "../services/books"
import books from "../services/books";

export const MainApp = () => {
  const [persons, setPersons] = useState([]);
  const [noti, setNoti] = useState(null);
  const [categories, setCategories] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    contactPerson
      .getAllPersons()
      .then(({ personas }) => setPersons(personas))
      .catch((error) => {
        setNoti(`There's a problem with conexion server`);
      });

    setTimeout(() => {
      setNoti(null);
    }, 4000);
  }, []);

  useEffect(() => {
    contactCategories
      .getAllCategories()
      .then((allCategories) => setCategories(allCategories))
      .catch((error) => {
        setNoti(`There's a problem with conexion server`);
      });
  }, []);

  useEffect(() => {
    books
    .getAllBooks()
    .then(({libros}) => setLibros(libros));
  },[]);

  return (
    <LibraryContext.Provider
      value={{
        persons,
        setPersons,
        noti,
        setNoti,
        categories,
        setCategories,
        libros,
        setLibros,
      }}
    >
      <AppRouter />
    </LibraryContext.Provider>
  );
};
