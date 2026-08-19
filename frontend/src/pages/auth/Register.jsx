import React, { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import BrandPanel from '../../components/auth/BrandPanel'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/api'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setLoading(true)

        try {
            const data = await registerUser(
                firstName,
                lastName,
                email,
                password
            )

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data))

            navigate('/login')

        } catch (error) {
            console.error('Registration failed:', error),
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <BrandPanel />

            <div className="flex w-full items-center p-8 md:w-1/2 md:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create your account
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Join ShopWise and start shopping smarter.
                    </p>

                    <form onSubmit={handleSubmit} className='mt-8 w-full space-y-5'>

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                first name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                placeholder="Enter your first name"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                last name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                placeholder="Enter your last name"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter your email"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                minLength={8}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Create a password"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                Password must be at least 8 characters.
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-bold !text-blue-600 hover:!text-blue-700"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Register