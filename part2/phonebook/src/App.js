import { useState } from "react";
import DisplayNumbers from "./Components/DisplayNumbers";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleName = event => {
    setNewName(event.target.value);
  };

  const handleNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleQuery = event => {
    setSearchQuery(event.target.value);
  };

  const addNewPerson = event => {
    event.preventDefault();
    findDuplicate(persons, newName) >= 0
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const findDuplicate = (arr, item) =>
    arr.findIndex(person => person.name === item);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input type="text" value={searchQuery} onChange={handleQuery} />
      </div>
      <h2>add new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
