//components/recordList.js
//components/recordList.js
//components/recordList.js

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from './navbar.js';

const Record = ({ record, deleteRecord }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleEdit = () => {
    navigate(`/edit/${record.id}`); // Navigate to the edit page with the record ID
  };

  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.position}</td>
      <td>{record.level}</td>
      <td>
        <button className="btn btn-link" onClick={() => deleteRecord(record.id)}>
          Borrar
        </button>
        <button className="btn btn-link" onClick={handleEdit}>
          Editar
        </button>
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    // Fetch records from local storage
    const savedRecords = JSON.parse(localStorage.getItem('records')) || [];
    setRecords(savedRecords);
  }, []);

  function deleteRecord(id) {
    // Remove record from local storage
    const updatedRecords = records.filter(record => record.id !== id);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
  }

  function recordList() {
    return records
      .filter((record) => {
        const nameMatch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
        const positionMatch = record.position.toLowerCase().includes(searchQuery.toLowerCase());
        const levelMatch = record.level.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || positionMatch || levelMatch;
      })
      .map((record) => (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record.id)}
          key={record.id}
        />
      ));
  }

  // Define logout function
  const logout = () => {
    localStorage.clear();
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="tablex" style={{ margin: "20px" }}>
      <Navbar />
      <div className="d-flex justify-content-evenly align-items-center mb-3">
        <h3>Employee List</h3>
        <NavLink className="nav-link btn btn-primary" to="/create">
          <button className="btn btn-success">Create Registry</button>
        </NavLink>
        <button className="btn btn-primary" onClick={logout}>Logout</button>
      </div>
      <div className="mb-3" style={{ maxWidth: '300px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error ? (
        <div>Error: {error}</div>
      ) : (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      )}
    </div>
  );
}
