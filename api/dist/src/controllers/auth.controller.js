import { createUser, loginUser, authorizeMe, userLogout, refreshToken as refreshTokenService, } from "../services/auth.service.js";
export async function handleUserRegister(req, res, next) {
    const userInput = req.body;
    try {
        const createdUser = await createUser(userInput);
        res.status(201).json({ message: "User Created", data: createdUser });
    }
    catch (error) {
        next(error);
    }
}
export async function handleUserLogin(req, res, next) {
    const { email, password } = req.body;
    try {
        const logedUser = await loginUser(email, password);
        res.status(201).json({
            message: "User Successfully login",
            userInfo: logedUser.user,
            token: logedUser.token,
            refreshToken: logedUser.refreshToken,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function handleAuthentication(req, res) {
    const userId = req.user.userId;
    const user = await authorizeMe(userId);
    return res.json({ user });
}
export async function handleUserLogout(req, res, next) {
    try {
        const { refreshToken } = req.body;
        await userLogout(refreshToken);
        return res.status(200).json({
            message: "Logged out Successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
export async function handleRefreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const result = await refreshTokenService(refreshToken);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=auth.controller.js.map