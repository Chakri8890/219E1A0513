import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ProductDetails = ({ product }) => {
  if (!product) return <Typography>No product selected</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.productName}</Typography>
        <Typography>Company: {product.company}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Price: {product.price}</Typography>
        <Typography>Rating: {product.rating}</Typography>
        <Typography>Discount: {product.discount}</Typography>
        <Typography>Availability: {product.availability}</Typography>
        <Button variant="contained" color="primary">Buy Now</Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
