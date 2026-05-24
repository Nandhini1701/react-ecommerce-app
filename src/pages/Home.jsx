import ProductCard from "../components/ProductCard"

function Home({ filteredProducts }) {

  return (
    <div className="products">

      {
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      }

    </div>
  )
}

export default Home