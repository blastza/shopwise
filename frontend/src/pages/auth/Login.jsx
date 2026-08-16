import React, { useState } from 'react'
import { loginUser } from '../../services/api'
import AuthLayout from '../../components/auth/AuthLayout'
import BrandPanel from '../../components/auth/BrandPanel'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setLoading(true)

        try {
        const data = await loginUser(email, password)

        console.log('Login successful:', data)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        } catch (error) {
        console.error('Login failed:', error)
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
                        Welcome back
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Sign in to continue shopping with ShopWise.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 w-full max-w-md space-y-5"
                >

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
                            placeholder="Enter your password"
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="font-semibold !text-blue-600 hover:!text-blue-700"
                        >
                            Create an account
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default Login;
