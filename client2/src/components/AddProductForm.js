import { TextField, Rating, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addNewProduct, updateStatus } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";

const AddProductForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const { register, handleSubmit, formState, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      type: "",
      price: 0,
      warranty_years: 0,
      rating: 0,
      available: false
    }
  });

  const dispatch = useDispatch();

  const canSave = addRequestStatus === 'idle'

  const onSubmit = async formData => {
    console.log(formData);
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewProduct(formData)).unwrap();
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        type="number"
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
        type="number"
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
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default AddProductForm;