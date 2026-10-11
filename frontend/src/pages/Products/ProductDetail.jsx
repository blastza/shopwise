import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

function ProductDetail() {
    const {id} = useParams()
    
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        const loadProduct = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await getProductById(id)
                if (!cancelled) setProduct(data)
            } catch (err) {
                console.error('Failed to load product:', error)
                if (!cancelled) setError("We couldn't load this product.")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadProduct()
        return () => {
            cancelled = true
        }
    }, [id])

    return (
        <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                ← Back to products
            </Link>

            {loading && <p className="mt-8 text-slate-500">Loading...</p>}

            {error && (
                <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
                </p>
            )}

            {!loading && !error && product && (
                <div className="mt-8">
                <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
                <p className="mt-2 text-xl font-semibold text-slate-700">
                    {formatPrice(product.price)}
                </p>
                </div>
            )}
        </main>
    )
}

export default ProductDetail
