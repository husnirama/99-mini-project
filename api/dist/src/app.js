import express, {} from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { error } from "./middlewares/error.middleware.js";
const app = express();
const PORT = Number(process.env.PORT);
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.get("/api/status", (req, res) => {
    res
        .status(200)
        .json({ message: "API is running!", uptime: process.uptime() });
});
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use(notFoundHandler);
app.use(error);
app.listen(PORT, () => console.info(`server is listening on port ${PORT}`));
//# sourceMappingURL=app.js.map