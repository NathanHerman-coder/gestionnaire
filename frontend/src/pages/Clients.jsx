import React, { useEffect, useState } from 'react'
import { getClients, deleteClient, createClient } from '../services/clients'
import AddClient from '../components/AddClients'
import { ArrowLeftIcon } from 'lucide-react'
import {useNavigate } from 'react-router-dom'
const Clients = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
    })
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)


    const fetchClients = async () => {
        try {
            const res = await getClients()
            setClients(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        try {
                // use createClient from services
                await createClient(form)
            setForm({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                address: '',
            })
            fetchClients()
        } catch (err) {
            setError('Erreur lors de la création du client')
        } finally {
            setSubmitting(false)
        }
    }

   const navigate = useNavigate()

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce client ?')) return
        await deleteClient(id)
        fetchClients()
    }

    useEffect(() => {
        fetchClients()
    }, [])

    if (loading) return <p>Chargement...</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <button className='bg-blue-900 text-white  p-2 rounded-lg flex items-center' onClick={async () =>navigate("/dashboard")}><ArrowLeftIcon size={20}/></button>
            <div className='flex items-center justify-center mb-5'>
                 <AddClient/>
            </div>
            
            <table className="w-full bg-white rounded-lg shadow">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="p-3">Nom</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Téléphone</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id} className="border-t">
                            <td className="p-3">
                                {client.first_name} {client.last_name}
                            </td>
                            <td className="p-3">{client.email}</td>
                            <td className="p-3">{client.phone_number}</td>
                            <td className="p-3 text-right">
                                <button
                                    onClick={() => handleDelete(client.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    )
}

export default Clients
