import React, { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import BrandPanel from '../../components/auth/BrandPanel'
import { Link } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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

                    <form className="mt-8 w-full space-y-5">

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter your full name"
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
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Create a password"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
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