import { useState } from 'react'
import { Package } from 'lucide-react'

function ProductImage({src, alt, iconSize = 48}) {
  // Remember which URL failed, not just "failed".
  const [failedSrc, setFailedSrc] = useState(null)
  const showImage = src && failedSrc !== src

  return (
    <div className="flex aspect-4/3 items-center justify-center overflow-hidden bg-slate-100 text-slate-300">
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover"
        />
      ) : (
        <Package size={iconSize} strokeWidth={1.5} />
      )}
    </div>
  )
}

export default ProductImage