import { useEffect, useState } from "react";
import "./App.css";
import UserList from "./UserList";
import Button from '@mui/material/Button';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    vorname: "",
    nachname: "",
    alter: 0,
  });

  function fetchAllUsers() {
    fetch("http://localhost:8005/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8005/user/${id}`, {
      method: "DELETE",
    }).then(() => fetchAllUsers());
  }

  function handleSubmit(){
    fetch("http://localhost:8005/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(() => fetchAllUsers());
  }

  function handleInputChange(event){
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    })
  }
  return (
    <>
      <UserList users={users} handleDelete={handleDelete}></UserList>
      <form onSubmit={handleSubmit}>
        <label>Vorname:</label>
        <input type="text" name="vorname" value={newUser.vorname} onChange={handleInputChange}/> <br />
        <label>Nachname:</label>
        <input type="text"  name="nachname" value={newUser.nachname} onChange={handleInputChange}/> <br />
        <label>Alter:</label>
        <input type="number" name="alter" value={newUser.alter} onChange={handleInputChange}/> <br />

      <Button type="submit" variant="outlined">Add User</Button>
      </form>

    </>
  );
}

export default App;
