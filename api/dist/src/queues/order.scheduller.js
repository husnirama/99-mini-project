import { orderQueue } from "./order.queue.js";
export async function registerOrderJob(orderId, transactionId, expiresAt) {
    await orderQueue.add("expire-payment-proof", {
        orderId,
        transactionId,
    }, {
        delay: Math.max(0, expiresAt.getTime() - Date.now()),
        jobId: `expire-payment-${transactionId}`,
    });
}
export async function registerTransactionJob(orderId, transactionId) {
    await orderQueue.add("expire-admin-review", {
        orderId,
        transactionId,
    }, {
        delay: 3 * 24 * 60 * 60 * 1000,
        jobId: `expire-admin-review-${transactionId}`,
    });
}
//# sourceMappingURL=order.scheduller.js.map