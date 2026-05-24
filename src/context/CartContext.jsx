import {
    createContext,
    useEffect,
    useState
} from "react"
import { toast } from "react-toastify"

export const CartContext = createContext()

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart")

    return savedCart
      ? JSON.parse(savedCart)
      : []

  })

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

  }, [cart])

  function addToCart(product) {

  const existingProduct = cart.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {

    const updatedCart = cart.map((item) =>

      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item

    )

    setCart(updatedCart)
    toast.info("Product quantity updated")

    
} else {
    
    setCart([
        ...cart,
        { ...product, quantity: 1 }
    ])
    toast.success("Product added to cart")

  }

}

  function removeFromCart(id) {

  const updatedCart = cart.filter(
    (item) => item.id !== id
  )

  setCart(updatedCart)

}

function increaseQuantity(id) {

  const updatedCart = cart.map((item) =>

    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item

  )

  setCart(updatedCart)

}

function decreaseQuantity(id) {

  const updatedCart = cart
    .map((item) =>

      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item

    )
    .filter((item) => item.quantity > 0)

  setCart(updatedCart)

}

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
      }}
    >

      {children}

    </CartContext.Provider>

  )
}

export default CartProvider