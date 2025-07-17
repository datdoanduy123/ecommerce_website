import axios from "axios";

const PAYMENT_BASE_URL = "http://localhost:8222/api/v1/payments";

export const createPayment = (paymentRequest) => {
  return axios.post(`${PAYMENT_BASE_URL}`, paymentRequest);
};
