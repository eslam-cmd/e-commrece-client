import { createSlice } from "@reduxjs/toolkit";
import { product } from "@/types/product";

type InitialState = {
  value: product;
};

const initialState = {
  value: {
    id: 0,
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    section: "",
    description: "",
    category: "",
    image_url: "",
    status: "available",
    quantity: 1,
  },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
