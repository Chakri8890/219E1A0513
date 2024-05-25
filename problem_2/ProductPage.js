
import React from 'react';
import ProductDetails from './components/ProductDetails';

const ProductPage = ({ match }) => {
  const productId = match.params.id
  const product = {
    productName: "Sample Product",
    company: "AMZ",
    category: "Laptop",
    price: 1234,
    rating: 4.5,
    discount: 10,
    availability: "yes",
  };

  return (
    <div>
      <h1>Product Details</h1>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
