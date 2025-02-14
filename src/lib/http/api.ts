import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const ORDER_SERVICE = "/api/order";

export const getCustomer = () => api.get(`${ORDER_SERVICE}/customers`);

export const addAddress = (customerId: string, address: string) =>
  api.patch(`${ORDER_SERVICE}/customers/addresses/${customerId}`, {
    address,
  });
