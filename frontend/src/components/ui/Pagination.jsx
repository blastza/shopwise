import { ChevronLeft, ChevronRight } from 'lucide-react'

// Builds [1, '…', 4, 5, 6, '…', 15] style lists
function getPageItems(current, total) {
  const items = []
  for (let i = 1; i <= total; i++) {
    const nearCurrent = Math.abs(i - current) <= 1
    if (i === 1 || i === total || nearCurrent) {
      items.push(i)
    } else if (items[items.length - 1] !== '…') {
      items.push('…')
    }
  }
  return items
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const baseBtn =
    'flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition'

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${baseBtn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft size={16} />
      </button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === '…' ? (
          <span key={`gap-${index}`} className="px-1 text-slate-400">…</span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={`${baseBtn} ${
              item === page
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${baseBtn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}

export default Pagination