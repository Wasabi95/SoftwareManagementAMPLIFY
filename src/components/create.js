//components/create.js
//components/create.js
//components/create.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar.js';

export default function Create() {  
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const [message, setMessage] = useState(""); 

  const navigate = useNavigate(); // Initialize useNavigate hook

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.level) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Retrieve existing records from local storage
      const records = JSON.parse(localStorage.getItem('records')) || [];
      const newRecord = { id: Date.now(), ...form }; // Generate a unique ID

      // Save the new record to local storage
      localStorage.setItem('records', JSON.stringify([...records, newRecord]));

      setMessage("Usuario creado exitosamente");
      setForm({ name: "", position: "", level: "" });
      navigate("/recordList"); // Redirect to RecordList page
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <Navbar />
      <h3>Crear Nuevo Registro</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>          
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Cargo</label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"
            value={form.position}
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label>Departamento:</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Tecnologia"
              checked={form.level === "Tecnologia"}
              onChange={updateForm}
            />
            <label className="form-check-label">Tecnologia</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Logistica"
              checked={form.level === "Logistica"}
              onChange={updateForm}
            />
            <label className="form-check-label">Logistica</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Finanzas"
              checked={form.level === "Finanzas"}
              onChange={updateForm}
            />
            <label className="form-check-label">Finanzas</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Administrativo"
              checked={form.level === "Administrativo"}
              onChange={updateForm}
            />   
            <label className="form-check-label">Administrativo</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="level"
              value="Recursos Humanos"
              checked={form.level === "Recursos Humanos"}
              onChange={updateForm}
            />       
            <label className="form-check-label">Recursos Humanos</label>  
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Crear Usuario"
            className="btn btn-primary"
          />
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
