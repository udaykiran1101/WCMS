import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [species, setSpecies] = useState([]);
  const [newSpecies, setNewSpecies] = useState({
    common_name: '',
    scientific_name: '',
    population_status: '',
    classification: ''
  });

  // Fetch species data from the backend
  const fetchSpecies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/species');
      const data = await response.json();
      console.log('Fetched data:', data); // Log fetched data
      if (Array.isArray(data)) {
        setSpecies(data); // Only set species if data is an array
      } else {
        console.error('Expected an array of species, but got:', data);
      }
    } catch (error) {
      console.error('Error fetching species:', error);
    }
  };

  // Add new species
  const addSpecies = async (e) => {
    e.preventDefault();
    if (!newSpecies.common_name) return; // Ensure common name is provided
    try {
      await fetch('http://localhost:8080/api/species', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpecies),
      });
      setNewSpecies({
        common_name: '',
        scientific_name: '',
        population_status: '',
        classification: ''
      }); // Reset input fields
      fetchSpecies(); // Refresh the species list
    } catch (error) {
      console.error('Error adding species:', error);
    }
  };

  useEffect(() => {
    fetchSpecies(); // Initial fetch
  }, []);

  return (
    <div className="App">
      <h1>Wildlife Management and Conservation System</h1>
      <h2>Species List</h2>
      <ul>
        {species.map((s) => (
          <li key={s.species_id}>
            <strong>Common Name:</strong> {s.common_name || 'N/A'}, 
            <strong>Scientific Name:</strong> {s.scientific_name || 'N/A'}, 
            <strong>Population Status:</strong> {s.population_status || 'N/A'}, 
            <strong>Classification:</strong> {s.classification || 'N/A'}
          </li>
        ))}
      </ul>
      <h2>Add New Species</h2>
      <form onSubmit={addSpecies}>
        <input
          type="text"
          value={newSpecies.common_name}
          onChange={(e) => setNewSpecies({ ...newSpecies, common_name: e.target.value })}
          placeholder="Common Name"
          required
        />
        <input
          type="text"
          value={newSpecies.scientific_name}
          onChange={(e) => setNewSpecies({ ...newSpecies, scientific_name: e.target.value })}
          placeholder="Scientific Name"
          required
        />
        <input
          type="text"
          value={newSpecies.population_status}
          onChange={(e) => setNewSpecies({ ...newSpecies, population_status: e.target.value })}
          placeholder="Population Status"
          required
        />
        <input
          type="text"
          value={newSpecies.classification}
          onChange={(e) => setNewSpecies({ ...newSpecies, classification: e.target.value })}
          placeholder="Classification"
          required
        />
        <button type="submit">Add Species</button>
      </form>
    </div>
  );
}

export default App;

