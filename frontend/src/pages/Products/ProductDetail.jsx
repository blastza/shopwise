import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { getProductById } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import ProductImage from '../../components/product/ProductImage'

const LOW_STOCK_THRESHOLD = 5

function StockStatus({ quantity }) {
  if (quantity <= 0) {
    return <p className="text-sm font-medium text-red-600">Out of stock</p>
  }
  if (quantity <= LOW_STOCK_THRESHOLD) {
    return <p className="text-sm font-medium text-amber-700">Only {quantity} left</p>
  }
  return <p className="text-sm font-medium text-green-700">In stock</p>
}

function ProductDetail() {
  const { id } = useParams()

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
        console.error('Failed to load product:', err)
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

  const outOfStock = product && product.stockQuantity <= 0

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        ← Back to products
      </Link>

      {loading && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="aspect-4/3 animate-pulse rounded-xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      )}

      {error && (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && product && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <ProductImage src={product.imageUrl} alt={product.name} iconSize={72} />
          </div>

          <div>
            {product.categoryName && (
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                {product.categoryName}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {product.name}
            </h1>

            {product.reviewCount > 0 && (
              <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.averageRating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewCount} reviews)</span>
              </div>
            )}

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>

            <div className="mt-2">
              <StockStatus quantity={product.stockQuantity} />
            </div>

            <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

            <button
              type="button"
              disabled={outOfStock}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              <ShoppingCart size={18} />
              {outOfStock ? 'Out of stock' : 'Add to cart'}
            </button>

            <p className="mt-6 text-xs text-slate-400">SKU: {product.sku}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductDetail