import React, { useState } from "react";
import { createClient } from "../services/clients";

const AddClient = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use the shared API service which handles auth headers
      await createClient(formData)

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Erreur lors de l'ajout du client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">Ajouter un client</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        name="first_name"
        placeholder="Prénom"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="last_name"
        placeholder="Nom"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="phone_number"
        placeholder="Téléphone"
        value={formData.phone_number}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        {loading ? "Enregistrement..." : "Ajouter"}
      </button>
    </form>
  );
};

export default AddClient;
