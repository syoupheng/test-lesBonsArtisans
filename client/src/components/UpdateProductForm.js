import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { selectProductById, updateProduct, updateStatus } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => selectProductById(state, params.productId));
  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')
  const { register, handleSubmit, formState, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: product.name,
      type: product.type,
      price: product.price,
      warranty_years: product.warranty_years,
      rating: product.rating,
      available: product.available
    }
  });

  const dispatch = useDispatch();

  const canSave = updateRequestStatus === 'idle'

  const onSubmit = async formData => {
    console.log({...formData, _id: product._id});
    if (canSave) {
      try {
        setUpdateRequestStatus('pending');
        await dispatch(updateProduct({data: formData, _id: product._id})).unwrap();
      } catch (err) {
        console.error('Failed to update the product: ', err);
      } finally {
        setUpdateRequestStatus('idle');
      }
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      navigate(`/products/${params.productId}`);
    }
  }, [formState, params.productId, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{"marginLeft": "500px", "marginRight": "500px"}}>
      <FormControl fullWidth>
      <TextField
      margin="normal"
        id="standard-name"
        label="Name"
        variant="standard"
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        {...register("name", {
          required: "The name is required !",
        })}
      />
      </FormControl>
      <FormControl fullWidth>
      <TextField
        margin="normal"
        id="standard-type"
        label="Type"
        variant="standard"
        error={errors.type ? true : false}
        helperText={errors.type?.message}
        {...register("type", {
          required: "The type is required !",
        })}
      />
      </FormControl>
      <FormControl fullWidth>
      <TextField
        margin="normal"
        id="standard-price"
        label="Price"
        InputLabelProps={{
          shrink: true,
          step: "0.01"
        }}
        variant="standard"
        error={errors.price ? true : false}
        helperText={errors.price?.message}
        {...register("price", {
          required: "The price is required !",
          setValueAs: (v) => parseFloat(v),
          min: {
            value: 0,
            message: "The price cannot be negative !",
          },
          validate: {
            isNumber: (v) => !isNaN(v) || "The quantity should be an integer !",
          },
        })}
      />
      </FormControl>
      <FormControl fullWidth>
      <TextField
        margin="normal"
        id="standard-warrant-years"
        label="Number of warrant years"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        error={errors.warranty_years ? true : false}
        helperText={errors.warranty_years?.message}
        {...register("warranty_years", {
          setValueAs: (v) => parseInt(v),
          min: {
            value: 0,
            message: "The number of warrant years cannot be negative !",
          },
          validate: {
            integer: (v) =>
              Number.isInteger(v) ||
              "The number of years should be an integer !",
          },
        })}
      />
      </FormControl>
      <FormControl fullWidth>
      <TextField
        margin="normal"
        id="rating"
        label="Rating"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        error={errors.rating ? true : false}
        helperText={errors.rating?.message}
        {...register("rating", {
          setValueAs: (v) => parseFloat(v),
          min: {
            value: 0,
            message: "The rating cannot be negative !",
          },
          max: {
            value: 5,
            message: "The rating cannot be higher than 5 !",
          },
          validate: {
            isNumber: (v) =>
              !isNaN(v) ||
              "The rating should be a number !",
          },
        })}
      />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-available">Available</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          {...register("available")}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" style={{"marginTop": "20px"}}>
        Submit
      </Button>
    </form>
  );
}

export default UpdateProductForm;