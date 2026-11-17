
import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16 text-center">
        <ShoppingBag size={56} className="mx-auto text-slate-300" />

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-500">
          Browse our catalogue and find something you like.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Shopping Cart
      </h1>

      <p className="mt-2 text-slate-500">
        {cartCount} item(s) in your cart
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-28 w-full rounded-lg object-cover sm:w-32"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {item.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="rounded border p-2 disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      disabled={item.quantity >= item.stockQuantity}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded border p-2 disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="font-semibold text-slate-900 sm:text-right">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-slate-900">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg bg-slate-300 px-6 py-3 text-sm font-semibold text-slate-600"
          >
            Checkout coming soon
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Cart
