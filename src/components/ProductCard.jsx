import { Link } from "react-router-dom"

import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext)

  return (

    <div className="card">

      <Link to={`/product/${product.id}`}>

        <img src={product.image} />

        <h3>{product.title}</h3>

     </Link>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>

      <br />
      <br />



    </div>
  )
}

export default ProductCard