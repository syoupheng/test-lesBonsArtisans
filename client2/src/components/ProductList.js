import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, fetchProducts } from "../features/products/productsSlice";
import ProductEntry from "./ProductEntry";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const productStatus = useSelector(state => state.products.statusAll);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let content;

  if (productStatus === 'loading') {
    content = <CircularProgress />
  } else if (productStatus === 'succeeded') {
    content = products.map(product => (
      <ProductEntry key={product._id} product={product} />
    ))
  } else if (productStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <>
      <h2>List of products</h2>
      {content}
    </>   
  )
}

export default ProductList;