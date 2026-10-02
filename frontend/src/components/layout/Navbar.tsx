import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ShopWise
        </Link>

        <input
          type="search"
          placeholder="Search for product..."
          className="hidden w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 md:block"
        />

        <ul className="flex items-center gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-blue-600 ${
                    isActive ? 'text-blue-600' : 'text-slate-700'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar