import { useEffect, useState } from "react";
import DisplayNumbers from "./Components/DisplayNumbers";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import personservice from "./services/persons";
import Notification from "./Components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageNotification, setMessageNotification] = useState(null);
  const [fail, setFail] = useState(false);

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

  const resetMessage = setTimeout(() => {
    setMessageNotification(null);
  }, 3000);
  //* #########################

  const addNewPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    //* Verifico que la nueva persona no este duplicada
    if (findDuplicate(persons, newName) >= 0) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const editedPerson = persons.find(person => person.name === newName);
        personservice
          .editNumber(editedPerson.id, { ...editedPerson, number: newNumber })
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== editedPerson.id ? person : returnedPerson
              )
            );
            setMessageNotification(`${editedPerson.name}'s number was changed`);
            setTimeout(() => {
              setMessageNotification(null);
            }, 3000);
          })
          .catch(error => {
            setFail(true);
            setMessageNotification(
              `Information of ${editedPerson.name} has already removed from server`
            );

            setTimeout(() => {
              setMessageNotification(null);
            }, 3000);
            // resetMessage();
            setPersons(
              persons.filter(person => {
                return person.name !== editedPerson.name;
              })
            );
          });
      }
    } else {
      personservice
        .addPerson(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setMessageNotification(`${person.name} was added`);
          setTimeout(() => {
            setMessageNotification(null);
          }, 5000);
          // resetMessage();
        })
        .catch(error => {
          // console.log(error.response.data.error);
          setMessageNotification(error.response.data.error);
          setTimeout(() => {
            setMessageNotification(null);
          }, 5000);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      personservice
        .deletePerson(id)
        .then(message => {
          setMessageNotification(`${name} was deleted`);
          setTimeout(() => {
            setMessageNotification(null);
          }, 3000);
          // resetMessage();
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          setFail(true);
          setMessageNotification(`${name} has already removed from server`);
          setTimeout(() => {
            setMessageNotification(null);
          }, 3000);
          // resetMessage();
          setPersons(persons.filter(person => person.id !== id));
        });
    }
    return "";
  };

  const findDuplicate = (arr, item) =>
    arr.findIndex(person => person.name === item);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageNotification} fail={fail} />
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
