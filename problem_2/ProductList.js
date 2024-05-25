import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import api from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    fetchProducts();
  }, [company, category, top, minPrice, maxPrice]);

  const fetchProducts = async () => {
    const products = await api.getProducts(company, category, top, minPrice, maxPrice);
    setProducts(products);
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Company</InputLabel>
        <Select value={company} onChange={(e) => setCompany(e.target.value)}>
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          <MenuItem value="SP">SP</MenuItem>
          <MenuItem value="VN">VN</MenuItem>
          <MenuItem value="AZO">AZO</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
          <MenuItem value="Computer">Computer</MenuItem>
          <MenuItem value="TV">TV</MenuItem>
          <MenuItem value="Earphone">Earphone</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Top N" type="number" value={top} onChange={(e) => setTop(e.target.value)} fullWidth />
      <TextField label="Min Price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} fullWidth />
      <TextField label="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={fetchProducts}>Fetch Products</Button>
      
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.productName}</Typography>
                <Typography>Company: {company}</Typography>
                <Typography>Category: {category}</Typography>
                <Typography>Price: {product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}</Typography>
                <Typography>Availability: {product.availability}</Typography>
                <Button variant="contained" color="primary">View Details</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
