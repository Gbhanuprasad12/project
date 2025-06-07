import { useState } from "react";
import axios from "axios";

export default function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation {
        addPatient(
          name: "${form.name}",
          age: ${parseInt(form.age)},
          gender: "${form.gender}",
          contact: "${form.contact}"
          date:"
        ) {
          id
          name
        }
      }
    `;

    try {
      const res = await axios.post("http://localhost:4000/graphql", { query: mutation });
      console.log("Added:", res.data.data.addPatient);
      alert("registartion added!");
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      
      <input placeholder="place" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
      
      <button type="submit">Add new events</button>
    </form>
  );
}
