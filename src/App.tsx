import React from "react";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <div>
      <h1>Product App</h1>
      <ProductDetail productId={1} />
    </div>
  );
}

export default App;