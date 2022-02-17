import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/home';
import Products from './routes/products';
import Alert from '@mui/material/Alert';
import store from './app/store'
import { Provider } from 'react-redux'
import SingleProductPage from './components/SingleProductPage';
import UpdateProductForm from './components/UpdateProductForm';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<SingleProductPage />} />
            <Route path="products/:productId/modify" element={<UpdateProductForm />} />
            <Route
              path="*"
              element={
                <Alert severity="error">This page does not exist !</Alert>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
