import React, { useEffect, useState } from "react";
import "./ProductDetail.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
}

const ProductDetail: React.FC<{ productId: number }> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fake API call to fetch product details
    setTimeout(() => {
      const fakeProduct: Product = {
        id: productId,
        name: "Product Name",
        description: "Product Description",
        price: 19.99,
        imageUrl: "https://picsum.photos/150", // Random image
        rating: 4,
      };
      setProduct(fakeProduct);
    }, 1000);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}€</p>
      <p>Rating: {product.rating}</p>
      <button onClick={() => alert("Added to cart!")}>Add to cart</button>
    </div>
  );
};

export default ProductDetail;
