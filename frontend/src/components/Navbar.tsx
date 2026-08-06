import Reactfrom  from "react"

function Navbar() {
  return (
    <nav className="navbar">
        <div className="logo">
            <h2>ShopWise</h2>
        </div>

        <div className="search">
            <input
                type="text"
                placeholder="Search for product..."
            />
        </div>

        <div className="nav-links">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/profile">Profile</a>
        </div>

    </nav>
  );
}

export default Navbar