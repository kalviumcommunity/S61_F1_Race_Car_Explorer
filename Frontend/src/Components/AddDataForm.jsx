import React, { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const AddDataForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    carModel: "",
    engine: "",
    winsIn2023Season: "",
    polePositionsIn2023Season: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send POST request to backend API to save new entity
        const response = await axios.post("http://localhost:3000/api/racecars", formData);
        console.log(response.data); // Log the response from the server
        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        console.error('Error adding new entity:', error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters";
      valid = false;
    }


    // Validate numeric fields
    if (!/^\d+$/.test(formData.winsIn2023Season)) {
      newErrors.winsIn2023Season = "Wins must be a number";
      valid = false;
    }

    if (!/^\d+$/.test(formData.polePositionsIn2023Season)) {
      newErrors.polePositionsIn2023Season = "Pole positions must be a number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      team: "",
      carModel: "",
      engine: "",
      winsIn2023Season: "",
      polePositionsIn2023Season: ""
    });
    setErrors({});
  };

  // Expose a function to reset the form using ref
  useImperativeHandle(ref, () => ({
    resetForm
  }));

  return (
    <div className="container">
      <h2 className="text-center">Add Race Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Team:</label>
          <input
            type="text"
            className="form-control"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Car Model:</label>
          <input
            type="text"
            className="form-control"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Engine:</label>
          <input
            type="text"
            className="form-control"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Wins in 2023 Season:</label>
          <input
            type="text"
            className="form-control"
            name="winsIn2023Season"
            value={formData.winsIn2023Season}
            onChange={handleChange}
            required
          />
          {errors.winsIn2023Season && <div className="text-danger">{errors.winsIn2023Season}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Pole Positions in 2023 Season:</label>
          <input
            type="text"
            className="form-control"
            name="polePositionsIn2023Season"
            value={formData.polePositionsIn2023Season}
            onChange={handleChange}
            required
          />
          {errors.polePositionsIn2023Season && <div className="text-danger">{errors.polePositionsIn2023Season}</div>}
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
});

export default AddDataForm;