import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Star } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'

const LOW_STOCK_THRESHOLD = 5

function ProductCard({ product, onAddToCart }) {
    const {
    id,
    name,
    description,
    price,
    stockQuantity,
    categoryName,
    imageUrl,
    averageRating,
    reviewCount,
  } = product

  const [imageFailed, setImageFailed] = useState(false)

  const outOfStock = stockQuantity <= 0
  const lowStock = !outOfStock && stockQuantity <= LOW_STOCK_THRESHOLD
  const showImage = imageUrl && !imageFailed
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image, with a fallback if missing or broken */}
      <Link to={`/products/${id}`} className="block">
        <div className="flex aspect-4/3 items-center justify-center overflow-hidden bg-slate-100 text-slate-300">
          {showImage ? (
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package size={48} strokeWidth={1.5} />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {categoryName && (
          <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
            {categoryName}
          </p>
        )}

        <h3 className="mt-1 line-clamp-1 text-base font-semibold text-slate-900">
          <Link to={`/products/${id}`} className="hover:text-blue-600">
            {name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {description}
        </p>

        {reviewCount > 0 && (
          <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-slate-400">({reviewCount})</span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(price)}
          </span>

          {outOfStock && (
            <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
              Out of stock
            </span>
          )}
          {lowStock && (
            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
              Only {stockQuantity} left
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={outOfStock}
          onClick={() => onAddToCart?.(product)}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShoppingCart size={16} />
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard