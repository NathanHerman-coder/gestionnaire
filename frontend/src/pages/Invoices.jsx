import React, { useEffect, useState } from 'react'
import { getInvoices, deleteInvoice } from '../services/invoices'
import CreateInvoice from '../components/CreateInvoice'
import { useNavigate, Link } from 'react-router-dom'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getInvoices()
      setInvoices(res.data || [])
    } catch (err) {
      console.error(err)
      setError('Impossible de charger les factures')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetch() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette facture ?')) return
    await deleteInvoice(id)
    fetch()
  }

  if (loading) return <div className="p-6">Chargement...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Factures</h1>
        <Link to="/invoices/create" className="bg-teal-500 text-white px-3 py-2 rounded">Nouvelle facture</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          {invoices.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune facture trouvée.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">#</th>
                  <th className="py-2">Client</th>
                  <th className="py-2">Montant</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Statut</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} className="border-b">
                    <td className="py-2">{inv.invoice_number}</td>
                    <td className="py-2">{inv.client?.first_name ? `${inv.client.first_name} ${inv.client.last_name}` : '—'}</td>
                    <td className="py-2">€ {parseFloat(inv.amount).toFixed(2)}</td>
                    <td className="py-2">{new Date(inv.date_issued).toLocaleDateString()}</td>
                    <td className="py-2">{inv.is_paid ? 'Payée' : 'En attente'}</td>
                    <td className="py-2 text-right">
                      <button onClick={()=>navigate(`/invoices/${inv.id}`)} className="text-teal-600 mr-3">Voir</button>
                      <button onClick={()=>handleDelete(inv.id)} className="text-red-500">Suppr</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Créer rapidement</h3>
          <CreateInvoice onSuccess={fetch} />
        </aside>
      </div>
    </div>
  )
}

export default Invoices
