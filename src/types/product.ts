export type product = {
  id: number;
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number; // ✅ السعر بعد الخصم
  section: string;
  description: string;
  category: string;
  image_url: string;
  status: string; // ✅ الحالة (مثل "available")
  quantity: number; // ✅ الكمية
};
