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
//# sourceMappingURL=enums.d.ts.map