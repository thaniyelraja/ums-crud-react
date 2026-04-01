import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAge, setEditAge] = useState("");

  // Show all users
  const getAllUsers = () => {
    fetch("http://localhost:8080/getAllUsers")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  // Get user by ID (ONLY for display, no autofill)
  const getUser = () => {
    fetch(`http://localhost:8080/getUser/${id}`)
      .then(res => res.text())
      .then(data => {
        try {
          const user = JSON.parse(data);
          setUsers([user]);
        } catch {
          alert(data);
          setUsers([]);
        }
      });
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`http://localhost:8080/deleteUser/${id}`, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        getAllUsers();
      });
  };

  // Add user
  const addUser = () => {
    fetch("http://localhost:8080/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, age })
    })
      .then(res => res.text())
      .then(msg => alert(msg));
  };

  // Update user
  const updateUser = () => {
    fetch("http://localhost:8080/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: editId,
        name: editName,
        email: editEmail,
        age: editAge
      })
    })
      .then(res => res.text())
      .then(msg => alert(msg));
  };

  return (
    <div>
      <h1>UMS Home</h1>

      {/* Add User */}
      <h3>Add User</h3>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      {/* Get User */}
      <h3>Get User</h3>
      <input
        type="number"
        placeholder="Enter User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={getUser}>Get User</button>

      {/* Show All Users */}
      <h3>All Users</h3>
      <button onClick={getAllUsers}>Show All Users</button>

      <hr />

      {/* Update User */}
      <h3>Update User</h3>

      {/* 🔥 AUTO-FILL LOGIC HERE */}
<input
  placeholder="ID"
  value={editId}
  onChange={(e) => {
    const value = e.target.value;
    setEditId(value);

    // 🔥 if ID is empty → clear fields
    if (!value) {
      setEditName("");
      setEditEmail("");
      setEditAge("");
      return;
    }

    // 🔥 fetch if ID exists
    fetch(`http://localhost:8080/getUser/${value}`)
      .then(res => res.text())
      .then(data => {
        try {
          const user = JSON.parse(data);
          setEditName(user.name);
          setEditEmail(user.email);
          setEditAge(user.age);
        } catch {
          setEditName("");
          setEditEmail("");
          setEditAge("");
        }
      });
  }}
/>

      <input
        placeholder="Name"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={editAge}
        onChange={(e) => setEditAge(e.target.value)}
      />

      <button onClick={updateUser}>Update</button>

      <hr />

      {/* Users Table */}
      <h3>Users List</h3>

      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Roll No (ID)</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;