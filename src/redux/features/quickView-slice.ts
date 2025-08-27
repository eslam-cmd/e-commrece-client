import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ تعريف النوع الموحد للمنتج
export type product = {
  id: number;
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  section: string;
  description: string;
  category: string;
  image_url: string;
  status: string;
  quantity: number;
};

// ✅ الحالة الابتدائية
type InitialState = {
  value: product;
};

const initialState: InitialState = {
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
};

// ✅ إنشاء Slice الخاص بـ Quick View
export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action: PayloadAction<product>) => {
      return {
        value: { ...action.payload },
      };
    },
    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

// ✅ تصدير الأكشنات والريدويسر
export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
