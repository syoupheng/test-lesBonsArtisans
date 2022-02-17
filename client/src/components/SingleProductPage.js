import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProductById, fetchProductById } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(state => selectProductById(state, params.productId));
  const navigate = useNavigate();

  const productStatus = useSelector(state => state.products.statusSingle);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProductById({id: params.productId}));
    }
  }, [productStatus, dispatch, params.productId]);

  let content;

  if (productStatus === 'loading') {
    content = <CircularProgress />
  } else if (productStatus === 'succeeded') {
    content = (
      <div>
        <h3>Name : {product.name}</h3>
        <p>Type : {product.type}</p>
        <p>Price : {product.price} euros</p>
        <p>Rating : {product.rating}</p>
        <p>Number of warrant years : {product.warranty_years}</p>
        {product.available ? <p>In stock</p> : <p>Out of stock</p>}
        <Button
          variant="contained"
          onClick={() => navigate(`/products/${params.productId}/modify`)}
        >
          Update this product
        </Button>
      </div>
    );
  }

  return (
    <div>{content}</div>
  )
}

export default SingleProductPage;