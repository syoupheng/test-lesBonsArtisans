// import { ListItem } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/products/productsSlice";
import { Link } from "react-router-dom";

const ProductEntry = ({ product }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(product));
  }

  return (
    <div>
      <Link to={`/products/${product._id}`}>
        <h4>{product.name}</h4>
        <p>{product.type}</p>
        <p>{`${product.price} euros`}</p>
      </Link>
      <Button onClick={handleDelete} variant="contained">
        Delete
      </Button>
    </div>
  );
}

// const ProductEntry = ({ product }) => {
//   return (
//     <ListItem
//       secondaryAction={
//         <IconButton edge="end" aria-label="delete">
//           <DeleteIcon />
//         </IconButton>
//       }
//     >
//       <ListItemText
//         primary="Single-line item"
//       />
//     </ListItem>
//   );
// }

export default ProductEntry;