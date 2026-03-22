import { createDraftEvent } from "../services/event.service.js";
export async function handleCreateEvent(req, res, next) {
    try {
        const organizerId = req.user.userId;
        const payload = req.body;
        const files = req.files ?? [];
        // console.log("body:", req.body);
        // console.log("files:", req.files);
        const result = await createDraftEvent(organizerId, payload, files);
        return res.status(201).json({
            message: "Event created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=event.controller.js.map