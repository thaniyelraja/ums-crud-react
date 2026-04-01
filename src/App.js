import { useState } from "react";

function App() {

  const styles = {
    container: {
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(to right, #eef2f7, #f8fbff)",
      minHeight: "100vh",
      padding: "10px",
      maxWidth: "900px",
      margin: "auto"
    },
    title: {
      textAlign: "center",
      marginBottom: "15px",
      fontSize: "24px"
    },
    card: {
      background: "#ffffff",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "10px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.06)"
    },
    input: {
      display: "block",
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px"
    },
    button: {
      padding: "10px",
      width: "100%",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      background: "#4f8cff",
      color: "#fff",
      fontSize: "14px"
    },
    deleteBtn: {
      background: "#ff5c5c",
      color: "#fff",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer"
    },
    tableWrapper: {
      overflowX: "auto"
    },
    table: {
      width: "100%",
      minWidth: "600px",
      borderCollapse: "collapse"
    },
    th: {
      background: "#f1f5f9",
      padding: "8px",
      fontSize: "14px"
    },
    td: {
      padding: "8px",
      textAlign: "center",
      fontSize: "13px"
    }
  };

  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAge, setEditAge] = useState("");

  const getAllUsers = () => {
    fetch("https://ums-crud-springboot-jdbc-production.up.railway.app/getAllUsers")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  const getUser = () => {
    fetch(`https://ums-crud-springboot-jdbc-production.up.railway.app/getUser/${id}`)
      .then(res => res.text())
      .then(data => {
        try {
          const user = JSON.parse(data);
          setUsers([user]);
        } catch {
          alert(data);
          setUsers([]);
        }
        setId("");
      });
  };

  const deleteUser = (id) => {
    fetch(`https://ums-crud-springboot-jdbc-production.up.railway.app/deleteUser/${id}`, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        getAllUsers();
      });
  };

  const addUser = () => {
    fetch("https://ums-crud-springboot-jdbc-production.up.railway.app/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, age })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        setName("");
        setEmail("");
        setAge("");
      });
  };

  const updateUser = () => {
    fetch("https://ums-crud-springboot-jdbc-production.up.railway.app/updateUser", {
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
    <div style={styles.container}>
      <h1 style={styles.title}>UMS Dashboard</h1>

      <div style={styles.card}>
        <h3>Add User</h3>
        <input style={styles.input} value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} value={age} type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
        <button style={styles.button} onClick={addUser}>Add User</button>
      </div>

      <div style={styles.card}>
        <h3>Get User</h3>
        <input style={styles.input} type="number" placeholder="Enter User ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button style={styles.button} onClick={getUser}>Get User</button>
      </div>

      <div style={styles.card}>
        <h3>All Users</h3>
        <button style={styles.button} onClick={getAllUsers}>Show All Users</button>
      </div>

      <div style={styles.card}>
        <h3>Update User</h3>
        <input style={styles.input} placeholder="ID" value={editId} onChange={(e) => setEditId(e.target.value)} />
        <input style={styles.input} placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
        <input style={styles.input} placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        <input style={styles.input} type="number" placeholder="Age" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
        <button style={styles.button} onClick={updateUser}>Update</button>
      </div>

      <div style={styles.card}>
        <h3>Users List</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <button style={styles.deleteBtn} onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default App;