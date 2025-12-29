import React, { useEffect, useState } from 'react'
import { getClients } from '../services/clients'
import { createInvoice } from '../services/invoices'

const CreateInvoice = ({ onSuccess }) => {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({
    client: '',
    invoice_number: '',
    date_issued: '',
    due_date: '',
    amount: '',
    is_paid: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getClients().then(res => setClients(res.data || [])).catch(()=>{})
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // API expects client id (pk)
  const payload = { ...form }
  // API expects `client_id` for create (server returns nested `client` in responses)
  payload.client_id = parseInt(payload.client || 0)
  delete payload.client
  await createInvoice(payload)
      setForm({ client: '', invoice_number: '', date_issued: '', due_date: '', amount: '', is_paid: false })
      if (onSuccess) onSuccess()
    } catch (err) {
      setError('Erreur lors de la création de la facture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Nouvelle facture</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <label className="block text-sm mb-2">Client</label>
      <select name="client" value={form.client} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
        <option value="">Sélectionner un client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.first_name} {c.last_name} — {c.email}</option>
        ))}
      </select>

      <input name="invoice_number" placeholder="Numéro de facture" value={form.invoice_number} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
      <div className="grid grid-cols-2 gap-2">
        <input name="date_issued" type="date" value={form.date_issued} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
        <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
      </div>
      <input name="amount" type="number" step="0.01" placeholder="Montant" value={form.amount} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

      <label className="flex items-center gap-2 mb-3">
        <input type="checkbox" name="is_paid" checked={form.is_paid} onChange={handleChange} /> <span className="text-sm">Marquée comme payée</span>
      </label>

      <button type="submit" disabled={loading} className="w-full bg-teal-500 text-white py-2 rounded">{loading ? 'Enregistrement...' : 'Créer la facture'}</button>
    </form>
  )
}

export default CreateInvoice
