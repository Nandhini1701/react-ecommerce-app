import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

function Cart() {

  const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} = useContext(CartContext)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (

    <div className="cart-container">

      <h1>Your Shopping Cart</h1>

      {
        cart.length === 0 ? (

          <Link
            to="/"
            className="continue-shopping"
            >
            Continue Shopping
          </Link>

        ) : (

          cart.map((item, index) => (

            <div className="cart-item" key={item.id}>

                <img
                    src={item.image}
                    width="100"
                />

                <div>

                    <h3>{item.title}</h3>

                    <p>${item.price}</p>

                    <p>Quantity: {item.quantity}</p>

                    <div className="cart-buttons">

                    <button onClick={() => increaseQuantity(item.id)}>
                        +
                    </button>

                    <button onClick={() => decreaseQuantity(item.id)}>
                        -
                    </button>

                    <button onClick={() => removeFromCart(item.id)}>
                        Remove
                    </button>

                    </div>

                </div>

                </div>

          ))

        )
      }

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

    </div>
  )
}

export default Cart