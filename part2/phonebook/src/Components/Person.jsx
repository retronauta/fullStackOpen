import React from "react";

const Person = ({ name, number, id, handleDeletePerson}) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => handleDeletePerson(id)}>Delete</button>
    </p>
  );
};

export default Person;
