//components/edit.js
//components/edit.js
//components/edit.js
//components/edit.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './navbar.js';

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the record based on the ID from URL parameters
    const id = params.id;
    const savedRecords = JSON.parse(localStorage.getItem('records')) || [];
    const record = savedRecords.find(record => record.id === parseInt(id));

    if (record) {
      setForm(record);
    } else {
      window.alert(`Record with id ${id} not found`);
      navigate("/recordList");
    }
  }, [params.id, navigate]);

  // Update form state on input change
  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.name || !form.position || !form.level) {
      window.alert("Por favor, complete todos los campos.");
      return;
    }

    const id = params.id;
    const savedRecords = JSON.parse(localStorage.getItem('records')) || [];
    const updatedRecords = savedRecords.map(record =>
      record.id === parseInt(id) ? { ...record, ...form } : record
    );

    localStorage.setItem('records', JSON.stringify(updatedRecords));
    navigate("/recordList");
  };

  return (
    <div style={{ margin: '20px' }}>
      <Navbar />
      <h3>Actualizar Usuario</h3>
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
            value="Actualizar Usuario"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
