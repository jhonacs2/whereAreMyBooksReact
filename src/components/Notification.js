import React from "react";

export const Notification = ({alert}) => {
 
  if (alert === null) {
    return null;
  }
  return (
    <div className="alert alert-success" role="alert">
      {alert}
    </div>
  );
};
