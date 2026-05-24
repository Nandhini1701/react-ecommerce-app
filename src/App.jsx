import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Cart from "./pages/Cart"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"
import Footer from "./components/Footer"

function App() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  

  useEffect(() => {

  fetch("https://fakestoreapi.com/products")

    .then((response) => {

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      return response.json()

    })

    .then((data) => {

      setProducts(data)

      setLoading(false)

    })

    .catch((error) => {

      setError(error.message)

      setLoading(false)

    })

}, [])

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      category === "all"
        ? true
        : product.category === category

    return matchesSearch && matchesCategory

  })

  const categories = [
    "all",
    ...new Set(
      products.map((product) => product.category)
    )
  ]

  if (loading) {

    return <h1>Loading...</h1>

  }
  if (error) {

  return <h1>{error}</h1>

}

  return (

    <BrowserRouter>

      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      <Routes>

        <Route
          path="/"
          element={

            filteredProducts.length === 0 ? (

              <h2>No products found</h2>

            ) : (

              <Home
                filteredProducts={filteredProducts}
              />

            )

          }
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails products={products} />
          }
        />

      </Routes>

      <ToastContainer />
      <Footer/>

    </BrowserRouter>

  )
}

export default App