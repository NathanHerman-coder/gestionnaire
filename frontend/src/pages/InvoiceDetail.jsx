import React, { useEffect, useState } from 'react'
import { getInvoice, deleteInvoice, markPaid } from '../services/invoices'
import { useParams, useNavigate } from 'react-router-dom'

const InvoiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetch = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getInvoice(id)
      setInvoice(res.data)
    } catch (err) {
      console.error(err)
      setError('Impossible de charger la facture')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetch() }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Supprimer cette facture ?')) return
    await deleteInvoice(id)
    navigate('/invoices')
  }

  const handleMarkPaid = async () => {
    await markPaid(id)
    fetch()
  }

  if (loading) return <div className="p-6">Chargement...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!invoice) return <div className="p-6">Facture introuvable</div>

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Facture {invoice.invoice_number}</h2>
            <div className="text-sm text-gray-500">Émise le {new Date(invoice.date_issued).toLocaleDateString()}</div>
          </div>
          <div className="flex gap-2">
            {!invoice.is_paid && <button onClick={handleMarkPaid} className="px-3 py-2 bg-green-500 text-white rounded">Marquer payée</button>}
            <button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white rounded">Supprimer</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Client</h4>
            <div>{invoice.client?.first_name} {invoice.client?.last_name}</div>
            <div className="text-sm text-gray-500">{invoice.client?.email}</div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Détails</h4>
            <div>Montant : € {parseFloat(invoice.amount).toFixed(2)}</div>
            <div>Date d'échéance : {new Date(invoice.due_date).toLocaleDateString()}</div>
            <div>Statut : {invoice.is_paid ? 'Payée' : 'En attente'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail
