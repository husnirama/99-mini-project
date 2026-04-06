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
    MANAGE_FIND: (id: string | number | undefined) => `/event/manage/${id}`,
    UPDATE: (id: string | number) => `/event/${id}`,
  },
  ORDERS: {
    PREVIEW: "/order/preview",
    CREATE: "/order/creation",
  },
  TRANSACTIONS: {
    LIST: "/transaction",
    DETAIL: (transactionId: string | number) => `/transaction/${transactionId}`,
    UPLOAD_PAYMENT_PROOF: (transactionId: string | number) =>
      `/transaction/${transactionId}/paymentProof`,
    APPROVE: (transactionId: string | number) =>
      `/transaction/${transactionId}/approve`,
    REJECT: (transactionId: string | number) =>
      `/transaction/${transactionId}/reject`,
    CANCEL: (transactionId: string | number) =>
      `/transaction/${transactionId}/cancel`,
  },
  POINTS: {
    REGISTER: "/points/register",
  },
  CUSTOMERS: {
    PROFILE: "/customer/profile",
    PROFILE_IMAGE: "/customer/profile/image",
    PASSWORD: "/customer/profile/password",
    COUPONS: "/user/customer/coupons",
    POINTS: "/customer/points",
    REVIEWS: "/customer/reviews",
    TICKETS: "/customer/tickets",
  },
  ORGANIZER: {
    DASHBOARD: "/organizer/dashboard",
    PROFILE: "/organizer/profile",
    PROFILE_IMAGE: "/organizer/profile/image",
    PASSWORD: "/organizer/profile/password",
  },
};
