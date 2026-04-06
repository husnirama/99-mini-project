import { createDraftEvent, getEventList, getOrganizerOwnedEvent, getUniqueEvent, updateEventByOrganizer, } from "../services/event.service.js";
export async function handleCreateEvent(req, res, next) {
    try {
        const organizerId = req.user?.userId ?? req.user?.id;
        if (!organizerId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
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
export async function handleGetOwnedEvent(req, res, next) {
    try {
        const organizerId = req.user?.userId ?? req.user?.id;
        const eventId = Number(req.params.id);
        if (!organizerId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        if (Number.isNaN(eventId)) {
            return res.status(400).json({
                message: "Invalid event id",
            });
        }
        const event = await getOrganizerOwnedEvent(organizerId, eventId);
        return res.status(200).json({
            message: "Organizer event fetch success",
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getEvents(req, res, next) {
    try {
        const events = await getEventList();
        return res.status(200).json({
            message: "Event fetch success",
            data: events,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function handleUpdateEvent(req, res, next) {
    try {
        const organizerId = req.user?.userId ?? req.user?.id;
        const eventId = Number(req.params.id);
        const payload = req.body;
        const files = req.files ?? [];
        if (!organizerId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        if (Number.isNaN(eventId)) {
            return res.status(400).json({
                message: "Invalid event id",
            });
        }
        const result = await updateEventByOrganizer(organizerId, eventId, payload, files);
        return res.status(200).json({
            message: "Event updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getEvent(req, res, next) {
    try {
        const EventId = Number(req.params.id);
        if (Number.isNaN(EventId)) {
            return res.status(400).json({
                message: "Invalid event id",
            });
        }
        const event = await getUniqueEvent(EventId);
        return res.status(200).json({
            message: "Unique Event Fetch Success",
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=event.controller.js.map