import { getOrganizerProfile, updateOrganizerPassword, updateOrganizerProfile, } from "../services/organizerProfile/organizer.profile.service.js";
import { AppError } from "../utils/app-error.js";
function getAuthorizedOrganizerId(req) {
    const organizerId = req.user?.userId ?? req.user?.id;
    if (!organizerId) {
        throw new AppError("Unauthorized", 401);
    }
    return Number(organizerId);
}
export async function handleGetOrganizerProfile(req, res, next) {
    try {
        const organizerId = getAuthorizedOrganizerId(req);
        const profile = await getOrganizerProfile(organizerId);
        return res.status(200).json({
            message: "Organizer profile fetched successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function handleUpdateOrganizerProfile(req, res, next) {
    try {
        const organizerId = getAuthorizedOrganizerId(req);
        const profile = await updateOrganizerProfile(organizerId, req.body);
        return res.status(200).json({
            message: "Organizer profile updated successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function handleUpdateOrganizerPassword(req, res, next) {
    try {
        const organizerId = getAuthorizedOrganizerId(req);
        await updateOrganizerPassword(organizerId, req.body);
        return res.status(200).json({
            message: "Organizer password updated successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=organizer.profile.controller.js.map