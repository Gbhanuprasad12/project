import { useEffect, useState } from "react";
import axios from 'axios';

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const query = `
      query {
        patients {
          id
          name
          age
          gender
          contact
        }
      }
    `;
    try {
      const res = await axios.post('http://localhost:4000/graphql', { query });
      console.log(res.data.data)
      setPatients(res.data.data.patients);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const mutation = `
      mutation {
        deletePatient(id: "${id}") {
          id
        }
      }
    `;

    try {
      await axios.post('http://localhost:4000/graphql', { query: mutation });
      setPatients(prev => prev.filter(p => p.id !== id)); // remove from state
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div>
      <h2>participants List</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            {p.name} - {p.age} - {p.gender} - {p.contact}
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
