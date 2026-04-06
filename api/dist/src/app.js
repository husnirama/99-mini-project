import express, {} from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import orderRoutes from "./routes/order.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import organizerDashboardRoutes from "./routes/organizer.profile.route.js";
import pointsRoutes from "./routes/points.route.js";
import customerPointsRoutes from "./routes/customer.profile/customer.profile.route.js";
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
app.use("/api/order", orderRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/organizer", organizerDashboardRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/customer", customerPointsRoutes);
app.use(notFoundHandler);
app.use(error);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map