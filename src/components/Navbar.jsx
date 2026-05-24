import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"

import { CartContext } from "../context/CartContext"

function Navbar({
  search,
  setSearch,
  category,
  setCategory,
  categories
}) {

  const { cart } = useContext(CartContext)

  const location = useLocation()

  return (

    <div className="navbar">

      <Link to="/">
        <h2>ShopSphere</h2>
      </Link>

      {
        location.pathname === "/" && (

          <>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              {
                categories.map((item, index) => (

                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>

                ))
              }

            </select>

          </>

        )
      }

      <Link to="/cart">
        Cart: {cart.length}
      </Link>

    </div>
  )
}

export default Navbar