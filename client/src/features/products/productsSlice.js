import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: [],
  statusAll: 'idle',
  statusSingle: 'idle',
  error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products');
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async product => {
  const response = await axios.get(`/products/${product.id}`);
  return response.data;
});

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async initialProduct => {
    const response = await axios.post('/products', initialProduct);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async initialProduct => {
    const response = await axios.put(`/products/${initialProduct._id}`, initialProduct.data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async initialProduct => {
    const response = await axios.delete(`/products/${initialProduct._id}`);
    return response.data;
  }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      addProduct: (state, action) => {
        state.products.push(action.payload)
      },
      updatestatusAll: (state, action) => {
        state.statusAll = action.payload.statusAll;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchProducts.pending, (state, action) => {
          state.statusAll = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.statusAll = 'succeeded';
          // Add any fetched posts to the array
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.statusAll = 'failed';
          state.error = action.error.message;
        })
        .addCase(addNewProduct.fulfilled, (state, action) => {
          state.products.push(action.payload);
          state.statusAll = 'idle';
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          const { id } = action.payload;
          let existingProduct = state.products.find(product => product._id === id);
          if (existingProduct) existingProduct = action.payload;
          state.statusSingle = 'idle';
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
          state.statusSingle = 'succeeded';
          const { id } = action.payload;
          let existingProduct = state.products.find(product => product._id === id);
          if (existingProduct) {
            existingProduct = action.payload;
          } else {
            state.products.push(action.payload);
          }
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.statusAll = 'idle';
          state.products = state.products.filter(product => product._id !== action.payload._id)
        })
    }
  })
  
  export const { addProduct, updatestatusAll } = productsSlice.actions
  
  export default productsSlice.reducer

  export const selectAllProducts = state => state.products.products;

  export const selectProductById = (state, productId) => state.products.products.find(product => product._id === productId);