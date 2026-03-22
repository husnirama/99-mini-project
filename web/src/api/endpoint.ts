export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  EVENTS: {
    CREATE: "/event/draft",
    SHOW: "/event/event-list",
    FIND: (id: string | number) => `/event/${id}`,
  },
  ORDERS: {
    CREATE: "/order/creation",
  },
  TRANSACTIONS: {
    UPLOAD_PAYMENT_PROOF: (transactionId: string | number) =>
      `/transaction/${transactionId}/paymentProof`,
    APPROVE: (transactionId: string | number) =>
      `/transaction/${transactionId}/approve`,
    REJECT: (transactionId: string | number) =>
      `/transaction/${transactionId}/reject`,
    CANCEL: (transactionId: string | number) =>
      `/transaction/${transactionId}/cancel`,
  },
  USERS: {},
};
