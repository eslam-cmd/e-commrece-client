import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
};

type InitialState = {
  items: CartItem[];
};

// قراءة userId من localStorage (إذا موجود)
const userId =
  typeof window !== "undefined" ? localStorage.getItem("userId") : null;

// اسم المفتاح في التخزين المحلي يكون خاص بالمستخدم
const storageKey = userId ? `cart_${userId}` : "cart_guest";

// قراءة السلة من التخزين المحلي
const savedCart =
  typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

const initialState: InitialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem(storageKey, JSON.stringify(state.items)); // حفظ بعد الإضافة
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem(storageKey, JSON.stringify(state.items)); // حفظ بعد الحذف
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      localStorage.setItem(storageKey, JSON.stringify(state.items)); // حفظ بعد التعديل
    },
    removeAllItemsFromCart: (state) => {
      state.items = [];
      localStorage.setItem(storageKey, JSON.stringify(state.items)); // حفظ بعد الإفراغ
    },
    clearCartOnLogout: (state) => {
      state.items = [];
      localStorage.removeItem(storageKey); // حذف السلة عند تسجيل الخروج
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  clearCartOnLogout,
} = cart.actions;

export default cart.reducer;
