import api from '../api/api'

// List all clients
export const getClients = () => api.get("clients/")

// Create a new client
export const createClient = (data) => api.post("clients/", data)

// Delete a client by id
export const deleteClient = (id) => api.delete(`clients/${id}/`)

// Backwards-compatible alias
export const addClients = createClient