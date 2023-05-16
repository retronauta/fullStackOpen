import { useEffect, useState } from "react";
import DisplayNumbers from "./Components/DisplayNumbers";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import personservice from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    personservice.getPersons().then(data => setPersons(data));
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
  //* #########################

  const addNewPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    findDuplicate(persons, newName) >= 0
      ? alert(`${newName} is already added to phonebook`)
      : personservice
          .addPerson(newPerson)
          .then(person => setPersons(persons.concat(person)));

    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      personservice.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
    }
    return "";
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
      <DisplayNumbers
        persons={persons}
        searchQuery={searchQuery}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
}

export default App;
