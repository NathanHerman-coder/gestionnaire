import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Users, FileText, DollarSign, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
    <div className="text-teal-500">{icon}</div>
  </div>
);

const Dashbord = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [invoicesCount, setInvoicesCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [clientsRes, invoicesRes] = await Promise.all([
          api.get("clients/"),
          api.get("invoices/"),
        ]);

        if (!mounted) return;

        const clients = clientsRes.data || [];
        const invoices = invoicesRes.data || [];

        setClientsCount(clients.length);
        setInvoicesCount(invoices.length);

        const revenue = invoices.reduce((s, inv) => s + parseFloat(inv.amount || 0), 0);
        setTotalRevenue(revenue.toFixed(2));

        const unpaid = invoices.filter((i) => !i.is_paid).length;
        setUnpaidCount(unpaid);

        const sorted = invoices
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setRecent(sorted);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les données du tableau de bord.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-6">Chargement du tableau de bord...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Clients" value={clientsCount} icon={<Users size={28} />} />
        <StatCard title="Factures" value={invoicesCount} icon={<FileText size={28} />} />
        <StatCard title="Revenu total" value={`€ ${totalRevenue}`} icon={<DollarSign size={28} />} />
        <StatCard title="Non payées" value={unpaidCount} icon={<CheckCircle size={28} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Factures récentes</h2>
            <Link to="/clients" className="text-sm text-teal-600 hover:underline">Voir tous</Link>
          </div>

          {recent.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune facture disponible.</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2">#</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Montant</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((inv) => (
                    <tr key={inv.id} className="border-b">
                      <td className="py-2">{inv.invoice_number}</td>
                      <td className="py-2">{inv.client?.first_name ? `${inv.client.first_name} ${inv.client.last_name}` : inv.client || '—'}</td>
                      <td className="py-2">€ {parseFloat(inv.amount).toFixed(2)}</td>
                      <td className="py-2">{new Date(inv.date_issued).toLocaleDateString()}</td>
                      <td className="py-2">{inv.is_paid ? <span className="text-green-600">Payée</span> : <span className="text-yellow-600">En attente</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Actions rapides</h3>
          <div className="flex flex-col gap-2">
            <Link to="/clients" className="px-3 py-2 bg-teal-500 text-white rounded">Gérer les clients</Link>
            <Link to="/clients" className="px-3 py-2 border rounded">Créer une facture</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashbord;
