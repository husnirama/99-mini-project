import orderCreation from "../services/order/order.service.js";
import { orderSchema } from "../validations/order.validation.js";
import { AppError } from "../utils/app-error.js";
export async function createOrderController(req, res, next) {
    try {
        const payload = orderSchema.parse(req.body);
        const customerId = typeof req.user?.userId === "number"
            ? req.user.userId
            : typeof req.user?.id === "number"
                ? req.user.id
                : undefined;
        if (typeof customerId !== "number") {
            throw new AppError("Unauthorized", 401);
        }
        const order = await orderCreation(payload, customerId);
        return res.status(201).json({
            message: "Order Created Successfully",
            data: order,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=order.controller.js.map