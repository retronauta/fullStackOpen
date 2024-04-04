import React from "react";
import Person from "./Person";

const DisplayNumbers = ({ persons, searchQuery, handleDeletePerson }) => {
  const personsToShow =
    searchQuery === ""
      ? persons
      : persons.filter(
          person =>
            person.name.toLowerCase().search(searchQuery) >= 0 ||
            person.name.search(searchQuery) >= 0
        );

  return (
    <>
      {personsToShow.map(person => (
        <Person
          name={person.name}
          number={person.number}
          key={person.name}
          id={person.id}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </>
  );
};

export default DisplayNumbers;
