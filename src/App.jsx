import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    medicalCondition: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name')?.trim() || '';
    const age = formData.get('age')?.trim() || '';
    const medicalCondition = formData.get('medicalCondition')?.trim() || '';
    const imageUrl = formData.get('image')?.trim() || '';
    
    const newErrors = {};
    if (!name) newErrors.name = 'Patient name is required';
    if (!age) newErrors.age = 'Valid age is required';
    if (!medicalCondition) newErrors.medicalCondition = 'Medical condition is required';
    if (!imageUrl) newErrors.image = 'Image URL is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setPatientInfo({ name, age, medicalCondition, image: imageUrl });
    setShowForm(false);
    e.target.reset();
  };

  return (
    <div className='fullpart'>
      <div className="backgroundpart">
        <div className="contentcard">
          <h2 className="congratshead">Patient Details Card</h2>
          <div className="profile">
            <img
              src={patientInfo.image || "https://randomuser.me/api/portraits/men/75.jpg"}
              alt="Profile"
              className="profile-pic"
              onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/men/75.jpg"; }}
            />
            <h4 className="name">{patientInfo.name || "Patient Name"}</h4>
            <p className="patient-age"><strong>Age:</strong> {patientInfo.age || "—"}</p>
            <p className="patient-condition"><strong>Condition:</strong> {patientInfo.medicalCondition || "—"}</p>
          </div>
        </div>
      </div>

      <div className="buttonpart">
        <button onClick={() => setShowForm(true)} className='profilebutton'>
          ➕ Add Patient
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='cancelbuttonarea'>
              <button type="button" className='profilebutton close-btn' onClick={() => {
                setShowForm(false);
                setErrors({});
              }}>✕</button>
            </div>
            <h3 className='textclr'>Add Patient Information</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Patient Name:</label>
                <input type="text" name="name" placeholder="Enter patient name" />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input type="number" name="age" placeholder="Enter age" />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>
              <div className="form-group">
                <label>Medical Condition:</label>
                <input type="text" name="medicalCondition" placeholder="e.g., Hypertension, Diabetes" />
                {errors.medicalCondition && <span className="error-text">{errors.medicalCondition}</span>}
              </div>
              <div className="form-group">
                <label>Profile Image URL:</label>
                <input type="url" name="image" placeholder="https://example.com/image.jpg" />
                {errors.image && <span className="error-text">{errors.image}</span>}
              </div>
              <button type="submit" className='submitbtn'>Generate Card</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;