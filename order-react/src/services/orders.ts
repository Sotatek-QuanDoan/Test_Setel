import axios from "axios";
import { config } from "../config";

const userId = "1";

export const getOrderDetail = async (id: string) =>
  axios.get(`${config.orderBaseUrl}/orders/${id}`);

export const getOrders = async (page: number) =>
  axios.get(`${config.orderBaseUrl}/orders`, { params: { page, uid: userId } });

export const cancelOrder = async (id: string) =>
  axios.post(`${config.orderBaseUrl}/orders/${id}/cancel`, {});

export const createOrder = async (orderItems) =>
  axios.post(`${config.orderBaseUrl}/orders`, {
    userId,
    order: orderItems,
  });
