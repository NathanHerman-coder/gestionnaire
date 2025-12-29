import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [tab, setTab] = useState('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const { login, register } = useAuth()
    const navigate = useNavigate()

    


    const handleLogin = async () => {
        try {
            await login(username, password)
            navigate('/dashboard')
        } catch (err) {
            setError('Identifiants invalides')
        }
    }

    const handleRegister = async () => {
        setError('')
        if (!username || !email || !password) { setError('Remplir tous les champs'); return }
        if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }

        try {
            await register(username, email, password)
            navigate('/dashboard')
        } catch (err) {
            setError('Erreur lors de l\'inscription')
        }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

            {/* Logo / Title */}
            <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-2 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    NH
                </div>
                <h1 className="text-2xl font-semibold">Login</h1>
                <p className="text-gray-500 text-sm">
                    Make your managements easier
                </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl mb-5">
                <button onClick={()=>setTab('login')} className={`flex-1 py-2 ${tab==='login' ? 'bg-teal-500 text-white rounded-xl' : 'text-gray-500'}`}>
                    Login
                </button>
                <button onClick={()=>setTab('register')} className={`flex-1 py-2 ${tab==='register' ? 'bg-teal-500 text-white rounded-xl' : 'text-gray-500'}`}>
                    Register
                </button>
            </div>

            {/* Email / Username */}
            <div className="mb-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-3">
                    <Mail className="text-teal-500" size={18} />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-transparent p-3 outline-none"
                    />
                </div>
            </div>

            {tab === 'register' && (
              <div className="mb-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-3">
                    <Mail className="text-teal-500" size={18} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent p-3 outline-none"
                    />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="mb-3">
                <div className="flex items-center bg-gray-100 rounded-xl px-3">
                    <Lock className="text-teal-500" size={18} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent p-3 outline-none"
                    />
                    <Eye className="text-gray-400" size={18} />
                </div>
            </div>

            {tab === 'register' && (
              <div className="mb-3">
                <div className="flex items-center bg-gray-100 rounded-xl px-3">
                    <Lock className="text-teal-500" size={18} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full bg-transparent p-3 outline-none"
                    />
                </div>
              </div>
            )}

            {/* Options */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Remember me
                </label>
                <span className="text-teal-500 cursor-pointer">
                    Forgot password?
                </span>
            </div>

            {/* Error */}
            {error && (
                <p className="text-red-500 text-sm mb-3 text-center">
                    {error}
                </p>
            )}

            {/* Login Button */}
                        {tab === 'login' ? (
                            <button
                                onClick={handleLogin}
                                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={handleRegister}
                                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold"
                            >
                                Register
                            </button>
                        )}
        </div>
    </div>
)
}

export default Login
