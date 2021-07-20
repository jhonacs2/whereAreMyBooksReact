import React from "react";

export const Cards = React.memo(({ person }) => {
  console.log(person);
  return (
    <>
      <div className="card text-center">
        <div className="card-header">{person.alias}</div>
        <div className="card-body">
          <h5 className="card-title">
            {person.nombre} {person.apellido}
          </h5>
        </div>
        <div className="card-footer text-muted">{person.email}</div>
      </div>
    </>
  );
});
