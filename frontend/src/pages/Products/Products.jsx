import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../services/api'
import ProductGrid from '../../components/product/ProductGrid'
import Pagination from '../../components/ui/Pagination'

const PAGE_SIZE = 12

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(parseInt(searchParams.get('page'), 10) || 1, 1)

  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      setLoading(true)
      setError('')
      try {
        // UI is 1-based, API is 0-based
        const data = await getProducts(page - 1, PAGE_SIZE)
        if (cancelled) return
        setProducts(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      } catch (err) {
        if (cancelled) return
        console.error('Failed to load products:', err)
        setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [page])

  const goToPage = (nextPage) => {
    setSearchParams({ page: nextPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
      <p className="mt-2 text-sm text-slate-500">
        {totalElements > 0
          ? `${totalElements} products · page ${page} of ${totalPages}`
          : 'Browse everything in our catalogue.'}
      </p>

      <div className="mt-8">
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
    </main>
  )
}

export default Products