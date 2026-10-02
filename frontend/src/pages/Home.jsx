import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductGrid from '../components/product/ProductGrid'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      try {
        const data = await getProducts(0, 4)
        if (!cancelled) setProducts(data.content ?? data)
      } catch (err) {
        console.error('Failed to load products:', err)
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
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

            <Link
              to="/products"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
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

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8">
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </section>
    </main>
  )
}

export default Home