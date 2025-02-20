import { CartItem } from "@/lib/store/features/cart/cartSlice";

export interface Tenant {
  id: number;
  name: string;
  address: string;
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface ProductAttribute {
  name: string;
  value: string | boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  tenantId: string;
  categoryId: string;
  category: Category;
  isPublish: boolean;
}

export interface Topping {
  _id: string;
  name: string;
  image: string;
  price: number;
  tenantId: string;
  isPublish: boolean;
}

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
};

export type Address = {
  text: string;
  isDefault: boolean;
};

export type CouponCodeData = {
  code: string;
  tenantId: number;
};

export enum PaymentMode {
  CARD = "card",
  CASH = "cash",
}

export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY_FOR_DELIVERY = "ready_for_delivery",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export type OrderData = {
  cart: CartItem[];
  couponCode: string;
  tenantId: string;
  customerId: string;
  comment: string;
  address: string;
  paymentMode: PaymentMode;
};

export type Order = {
  _id: string;
  customerId: Customer;
  total: number;
  discount: number;
  taxes: number;
  deliveryCharges: number;
  address: string;
  tenantId: string;
  comment: string;
  paymentMode: PaymentMode;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
