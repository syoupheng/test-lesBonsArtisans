import ProductList from "../components/ProductList";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import AddProductForm from "../components/AddProductForm";

const Products = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" style={{"marginTop":"20px"}} onClick={() => setOpen(true)}>Add a new product</Button>
        <Modal
          style={{"marginTop": "100px", "padding": "50px 400px 50px 400px"}}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={{"backgroundColor":"white", "padding": "50px"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a new product
            </Typography>
            <AddProductForm />
          </Box>
        </Modal>
        <ProductList />
      </>
    );
}

export default Products;