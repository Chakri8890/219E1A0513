import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductPage from './pages/ProductPage';
import {Container} from '@mui/material';

import React from 'react-router-dom';

import ProductPage from './pages/ProductPage.js';

import AllProductsPage from './pages/AllProductsPage';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={AllProductsPage} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>
      </Container>
    </Router>
  );
}
export default App;