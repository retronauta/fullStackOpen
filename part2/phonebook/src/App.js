import { useEffect, useState } from "react";
import DisplayNumbers from "./Components/DisplayNumbers";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data));
  }, []);

  //* ##### HANDLERS ######

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

      <Filter searchQuery={searchQuery} handleQuery={handleQuery} />

      <h2>add new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
