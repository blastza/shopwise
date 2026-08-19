import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api'

function Home() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data.content ?? data)
            } catch (error) {
                console.error('Failed to load products:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

  return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-blue-600">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                            Welcome to ShopWise
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Shop smarter.
                            <br />
                            Find what you need.
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Discover great products and enjoy a simple,
                            fast shopping experience.
                        </p>

                        <button className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
                            Start shopping
                        </button>
                    </div>
                </div>
            </section>

            {/* Products section */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Featured products
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Explore some of our latest products.
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {loading && (
                        <p className="text-slate-500">
                            Loading products...
                        </p>
                    )}

                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                    {!loading && !error && (
                        <p className="text-slate-600">
                            Products loaded: {products.length}
                        </p>
                    )}
                </div>
            </section>

        </main>
    )
}

export default Home