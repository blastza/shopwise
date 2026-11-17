
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopwise-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('shopwise-cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product) {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id
      )

      if (existingItem) {
        return currentItems.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                product.stockQuantity
              )
            }
          }

          return item
        })
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  function removeFromCart(productId) {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== productId)
    )
  }

  function updateQuantity(productId, quantity) {
    setCartItems(currentItems =>
      currentItems.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: Math.max(
              1,
              Math.min(quantity, item.stockQuantity)
            )
          }
        }

        return item
      })
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
