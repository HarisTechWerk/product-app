import React, { useEffect, useState } from "react";

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
    // Fake API call
    setTimeout(() => {
      const fakeProduct: Product = {
        id: productId,
        name: "Cool Book",
        description: "A great read!",
        price: 19.99,
        imageUrl: "https://picsum.photos/150",
        rating: 4,
      };
      setProduct(fakeProduct);
    }, 1000);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}/5</p>
      <button onClick={() => alert("Added to cart!")}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;