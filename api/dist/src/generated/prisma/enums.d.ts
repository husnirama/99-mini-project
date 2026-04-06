export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly EVENT_ORGANIZER: "EVENT_ORGANIZER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const eventStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly CANCELLED: "CANCELLED";
};
export type eventStatus = (typeof eventStatus)[keyof typeof eventStatus];
export declare const ticketStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SOLD_OUT: "SOLD_OUT";
    readonly HIDDEN: "HIDDEN";
};
export type ticketStatus = (typeof ticketStatus)[keyof typeof ticketStatus];
export declare const promotionDiscountType: {
    readonly PERCENTAGE: "PERCENTAGE";
    readonly FIXED: "FIXED";
};
export type promotionDiscountType = (typeof promotionDiscountType)[keyof typeof promotionDiscountType];
export declare const transactionStatus: {
    readonly WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT";
    readonly WAITING_FOR_ADMIN_CONFIRMATION: "WAITING_FOR_ADMIN_CONFIRMATION";
    readonly DONE: "DONE";
    readonly REJECTED: "REJECTED";
    readonly EXPIRED: "EXPIRED";
    readonly CANCELED: "CANCELED";
};
export type transactionStatus = (typeof transactionStatus)[keyof typeof transactionStatus];
export declare const orderStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly EXPIRED: "EXPIRED";
    readonly CANCELED: "CANCELED";
    readonly REJECTED: "REJECTED";
};
export type orderStatus = (typeof orderStatus)[keyof typeof orderStatus];
export declare const paymentMethod: {
    readonly CARD: "CARD";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
};
export type paymentMethod = (typeof paymentMethod)[keyof typeof paymentMethod];
export declare const cancelActor: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type cancelActor = (typeof cancelActor)[keyof typeof cancelActor];
export declare const pointsSource: {
    readonly REFERRAL: "REFERRAL";
    readonly PURCHASE: "PURCHASE";
};
export type pointsSource = (typeof pointsSource)[keyof typeof pointsSource];
//# sourceMappingURL=enums.d.ts.map