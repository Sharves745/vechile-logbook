import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function VehicleForm() {
  const navigate = useNavigate();
  const ownerName = localStorage.getItem("username") || "Unknown";

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    model: "",
    type: "",
    driverName: "",
    ownerName: ownerName
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/vehicles", formData);
      alert("✅ Vehicle Added Successfully");
      
      setFormData({
        vehicleNumber: "",
        model: "",
        type: "",
        driverName: "",
        ownerName: ownerName
      });
      
      navigate("/");
    } catch (error) {
      alert(
        "Failed to add vehicle: " +
        (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="vehicle-form-container">
      <div className="vehicle-form-card">
        <h3>Add New Vehicle</h3>

        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-group">
            <label>Owner Name</label>
            <input 
              value={formData.ownerName} 
              readOnly 
              className="readonly-field"
            />
          </div>

          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. ABC-123"
              required
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g. Toyota Camry"
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>

          <div className="form-group">
            <label>Driver Name</label>
            <input
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              placeholder="Enter driver name"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleForm;
