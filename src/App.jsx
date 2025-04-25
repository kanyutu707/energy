import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    Month: 2,
    Hour: 4,
    DayOfWeek: "Monday",
    Holiday: "No",
    Temperature: 24.32,
    Humidity: 42.51,
    SquareFootage: 1413.22,
    Occupancy: 3,
    HVACUsage: "Off",
    LightingUsage: "On",
    RenewableEnergy: 5.32
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    
    if (["Month", "Hour", "Occupancy"].includes(name)) {
      parsedValue = parseInt(value, 10);
    } else if (["Temperature", "Humidity", "SquareFootage", "RenewableEnergy"].includes(name)) {
      parsedValue = parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
     
      const response = await fetch('https://energy-prediction-backend.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setPrediction(data.predicted_energy_usage);
    } catch (err) {
      setError(err.message || 'An error occurred while making the prediction');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const holidayOptions = ["Yes", "No"];
  const hvacOptions = ["Off", "Low", "Medium", "High"];
  const lightingOptions = ["Off", "On", "Dim"];
  
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lightning-charge-fill text-success me-2" viewBox="0 0 16 16">
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
            </svg>
            <h1 className="mb-0">Energy Consumption Predictor</h1>
          </div>
          <p className="lead">Enter building parameters to predict energy consumption</p>
          <hr/>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
            
              <div className="col-12">
                <h5 className="mb-3">Time Parameters</h5>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Month" className="form-label">Month (1-12)</label>
                <input
                  type="number"
                  className="form-control"
                  id="Month"
                  name="Month"
                  min="1"
                  max="12"
                  value={formData.Month}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Hour" className="form-label">Hour (0-23)</label>
                <input
                  type="number"
                  className="form-control"
                  id="Hour"
                  name="Hour"
                  min="0"
                  max="23"
                  value={formData.Hour}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="DayOfWeek" className="form-label">Day of Week</label>
                <select
                  className="form-select"
                  id="DayOfWeek"
                  name="DayOfWeek"
                  value={formData.DayOfWeek}
                  onChange={handleInputChange}
                  required
                >
                  {dayOptions.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Holiday" className="form-label">Holiday</label>
                <select
                  className="form-select"
                  id="Holiday"
                  name="Holiday"
                  value={formData.Holiday}
                  onChange={handleInputChange}
                  required
                >
                  {holidayOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-12 mt-4">
                <h5 className="mb-3">Environmental Parameters</h5>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Temperature" className="form-label">Temperature (°C)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="Temperature"
                  name="Temperature"
                  value={formData.Temperature}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Humidity" className="form-label">Humidity (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="Humidity"
                  name="Humidity"
                  min="0"
                  max="100"
                  value={formData.Humidity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Building Parameters */}
              <div className="col-12 mt-4">
                <h5 className="mb-3">Building Parameters</h5>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="SquareFootage" className="form-label">Square Footage</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="SquareFootage"
                  name="SquareFootage"
                  min="0"
                  value={formData.SquareFootage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="Occupancy" className="form-label">Occupancy</label>
                <input
                  type="number"
                  className="form-control"
                  id="Occupancy"
                  name="Occupancy"
                  min="0"
                  value={formData.Occupancy}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-12 mt-4">
                <h5 className="mb-3">Usage Parameters</h5>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="HVACUsage" className="form-label">HVAC Usage</label>
                <select
                  className="form-select"
                  id="HVACUsage"
                  name="HVACUsage"
                  value={formData.HVACUsage}
                  onChange={handleInputChange}
                  required
                >
                  {hvacOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="LightingUsage" className="form-label">Lighting Usage</label>
                <select
                  className="form-select"
                  id="LightingUsage"
                  name="LightingUsage"
                  value={formData.LightingUsage}
                  onChange={handleInputChange}
                  required
                >
                  {lightingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="RenewableEnergy" className="form-label">Renewable Energy (kWh)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="RenewableEnergy"
                  name="RenewableEnergy"
                  min="0"
                  value={formData.RenewableEnergy}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Predicting...
                    </>
                  ) : "Predict Energy Consumption"}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="col-lg-4">
          <div className="card mt-4 mt-lg-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Prediction Result</h5>
            </div>
            <div className="card-body">
              {error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : prediction !== null ? (
                <div className="text-center">
                  <h2 className="display-4 text-primary mb-0">{prediction.toFixed(2)}</h2>
                  <p className="lead">kWh</p>
                  <div className="alert alert-success mb-0">
                    <strong>Success!</strong> Energy consumption prediction generated.
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted">
                  <p className="mb-0">Fill out the form and click "Predict" to get energy consumption estimate</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Usage Tips</h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li>Enter all required parameters</li>
                <li>Temperature should be in Celsius</li>
                <li>Humidity should be a percentage (0-100)</li>
                <li>Renewable Energy should be in kWh</li>
                <li>Use realistic values for best results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-5 pt-3 border-top text-center text-muted">
        <p>Energy Consumption Prediction Tool | Created with React & Bootstrap</p>
      </footer>
    </div>
  );
};

export default App;
