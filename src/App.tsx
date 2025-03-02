import React from "react";
import ProductDetail from "./components/ProductDetail";
import UserProfileForm from "./components/UserProfileForm";

function App() {
  return (
    <div>
      <h1>Product App</h1>
      <ProductDetail productId={1} />
      <UserProfileForm />
    </div>
  );
}

export default App;