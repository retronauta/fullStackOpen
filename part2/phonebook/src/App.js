import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const DisplayNumbers = ({ persons }) => {
    return (
      <>
        {persons.map(person => (
          <Person name={person.name} key={person.name} />
        ))}
      </>
    );
  };

  const Person = ({ name }) => {
    return <p>{name}</p>;
  };

  const handleName = event => {
    setNewName(event.target.value);
  };

  const addNewPerson = event => {
    event.preventDefault();
    findDuplicate(persons, newName) >= 0
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const findDuplicate = (arr, item) =>
    arr.findIndex(person => person.name === item);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        {/* <div>debug: {newName}</div> */}
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} />
    </div>
  );
}

export default App;
