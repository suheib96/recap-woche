import React from 'react'

export default function UserList({users, handleDelete}) {
  return (
    <>
     <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.vorname} {user.nachname} - {user.alter}
            <button onClick={() => handleDelete(user.id)}>Löschen</button>
          </li>
        ))}
      </ul>
      </>
  )
}
