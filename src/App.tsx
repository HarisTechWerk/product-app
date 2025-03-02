import React from "react";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <div>
      <h1>Product Details</h1>
      <ProductDetail productId={1} />
    </div>
 )
}

export default App;