import { useParams } from "react-router-dom"

import { useContext } from "react"

import { CartContext } from "../context/CartContext"

function ProductDetails({ products }) {

  const { id } = useParams()

  const { addToCart } = useContext(CartContext)

  const singleProduct = products.find(
    (product) => product.id == id
  )

  if (!singleProduct) {
    return <h2>Loading...</h2>
  }

  return (

    <div className="details-container">

      <img
        src={singleProduct.image}
        alt={singleProduct.title}
      />

      <div className="details-content">

        <h2>{singleProduct.title}</h2>

        <p>{singleProduct.description}</p>

        <h3>${singleProduct.price}</h3>

        <p>⭐ {singleProduct.rating.rate}</p>

        <button
          onClick={() => addToCart(singleProduct)}
        >
          Add To Cart
        </button>

      </div>

    </div>

  )
}

export default ProductDetails

