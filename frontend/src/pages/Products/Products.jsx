import { useEffect, useState } from 'react'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
  fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setProducts(data.content)
    })
  }, [])

  return (
    <div>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: R{product.price}</p>
          <p>Stock: {product.stockQuantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Products