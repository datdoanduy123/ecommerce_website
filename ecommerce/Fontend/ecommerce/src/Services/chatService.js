import axios from "axios";

const BASE_URL = "http://localhost:8222/api/v1/chats";

// Gửi tin nhắn
export const sendChatMessage = (chatData, token) => {
  return axios.post(`${BASE_URL}/send`, chatData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getChatHistory = (userId, token) => {
  return axios.get(`${BASE_URL}/histories/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getAllUserSendAdmin  = (token) => {
    return axios.get(`${BASE_URL}/conservation`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};
export const getDetailConservationAdminSendsUser  = (userId, token) => {
    return axios.get(`${BASE_URL}/conservation/admin/${userId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};