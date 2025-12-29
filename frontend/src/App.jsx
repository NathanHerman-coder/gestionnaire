import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './pages/Login'
import PrivateRoute from './routes/PrivateRoute'
import Dashbord from './pages/Dashbord'
import Clients from './pages/Clients'
import Invoices from './pages/Invoices'
import InvoiceDetail from './pages/InvoiceDetail'
import CreateInvoice from './components/CreateInvoice'
import { Home } from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashbord />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          }
        />

        <Route
          path="/invoices/create"
          element={
            <PrivateRoute>
              <CreateInvoice />
            </PrivateRoute>
          }
        />

        <Route
          path="/invoices/:id"
          element={
            <PrivateRoute>
              <InvoiceDetail />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  )
}

export default App
