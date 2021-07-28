import React from "react";

export const CardCategory = React.memo(({ category, handleDelete}) => {
  
  return (
    <>
      <li className="list-group-item">
        {category.nombre}
        <span className="btn btn-danger float-end" onClick={handleDelete}>Delete</span>
      </li>
    </>
  );
});
