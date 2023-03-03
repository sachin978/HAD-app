// import React from 'react'
// import { useLocation } from 'react-router-dom'

// //const location=useLocation();
// export default function DoctorPrescription(props) {
//   const location=useLocation();
//   return (
//     <div>
//        <h2>{location.state.patient_name}</h2>
//        <h2>{location.state.patient_age}</h2>
//        <h2>{location.state.patient_gender}</h2>
//         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         <h1>this is </h1>
//         <textarea id="mybox" rows="2"></textarea>
//     </div>
//   )
// }
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css_files/DoctorPrescription.css'
import { useLocation } from 'react-router-dom'
import { duration } from '@mui/material';

export default function DoctorPrescription(props) {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [medicalFinding, setMedicalFinding] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const location=useLocation();
  // const doc = {
  //   "doctorId" : location.state.doctor_id
  // }
  // const patient = {
  //   "patientId" : location.state.patient_id
  // }

  //console.log(location.state.doctor_id);
  useEffect(() => {
    // Fetch patient and doctor names from backend via API
    axios.get(`http://localhost:8081/patient/get-name/${location.state.patient_id}`)
      .then((response) => {
        setPatientName(response.data);
        // setDoctorName(response.data.doctorName);
      })
      .catch((error) => {
        console.error('Error fetching patient and doctor names:', error);
      });
  }, []);
  useEffect(() => {
    // Fetch patient and doctor names from backend via API
    axios.get(`http://localhost:8081/doctor/get-name/${location.state.doctor_id}`)
      .then((response) => {
        // setPatientName(response.data.patientName);
        setDoctorName(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient and doctor names:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const prescription = {
      patientName: patientName,
      doctorName: doctorName,
      medicalFinding: medicalFinding,
      medicineName: medicineName,
      dosage: dosage
    };

    // Send prescription data to backend via API
    axios.post(`http://localhost:8081/patient/add/prescription/${location.state.patient_id}/${location.state.doctor_id}`, prescription)
      .then((response) => {
        setSubmitting(false);
        setSuccess(true);
        setError(false);
      })
      .catch((error) => {
        setSubmitting(false);
        setSuccess(false);
        setError(true);
        console.error('Error adding prescription:', error);
      });
  };

  return (
    <div className='myBox'>
    <div className="prescription-form">
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input type="text" value={patientName} readOnly />
        </label>

        <label>
          Doctor Name:
          <input type="text" value={doctorName} readOnly />
        </label>

        <label>
          Medical Finding:
          <textarea value={medicalFinding} onChange={(e) => setMedicalFinding(e.target.value)} />
        </label>

        <label>
          Medicine Name:
          <input type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
        </label>

        <label>
          Dosage:
          <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </label>
        <label>
          Duration:
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>

        <button className='btn btn-outline-success' type="submit" onClick={handleSubmit}>
                      Submit
          </button>

        {success && (
          <div className="success-message">
            Prescription added successfully!
          </div>
        )}

        {error && (
          <div className="error-message">
            Error adding prescription.
          </div>
        )}
      </form>
    </div>
    </div>
//   <div className='container' style={{padding: '30px'}}>
//   <div className="prescription-form">
//   <h2>Add Prescription</h2>
//   <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
//     <label >
//       <span style={{ marginRight: '10px' }}>Patient Name:</span>
//       <input type="text" value={patientName} readOnly style={{ flexGrow: '1', padding: '5px' }} />
//     </label>

//     <label >
//       <span style={{ marginRight: '10px' }}>Doctor Name:</span>
//       <input type="text" value={doctorName} readOnly style={{ flexGrow: '1', padding: '5px' }} />
//     </label>

//     <label style={{ marginBottom: '10px' }}>
//       Medical Finding:
//       <textarea value={medicalFinding} onChange={(e) => setMedicalFinding(e.target.value)} style={{ width: '100%', padding: '5px' }} />
//     </label>

//     <label >
//       <span style={{ marginRight: '10px' }}>Medicine Name:</span>
//       <input type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} style={{ flexGrow: '1', padding: '5px' }} />
//     </label>

//     <label >
//       <span style={{ marginRight: '10px' }}>Dosage:</span>
//       <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} style={{ flexGrow: '1', padding: '5px' }} />
//     </label>

//     <button type="submit" disabled={submitting}>Submit</button>

//     {success && (
//       <div className="success-message">
//         Prescription added successfully!
//       </div>
//     )}

//     {error && (
//       <div className="error-message">
//         Error adding prescription.
//       </div>
//     )}
//   </form>
// </div>
// </div>
  );
}

