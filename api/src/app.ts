import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import orderRoutes from "./routes/order.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import organizerDashboardRoutes from "./routes/organizer.profile.route.js";
<<<<<<< HEAD
import pointsRoutes from "./routes/points.route.js";
import customerPointsRoutes from "./routes/customer.profile/customer.profile.route.js";
=======
import userRoutes from "./routes/user.route.js";
import { cacheTags, createGetCacheMiddleware } from "./lib/cache.js";
>>>>>>> d814dc9e2277622fef8c5d70512b4f2fa988d592
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { error } from "./middlewares/error.middleware.js";

const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/organizer", organizerDashboardRoutes);
<<<<<<< HEAD
app.use("/api/points", pointsRoutes);
app.use("/api/customer", customerPointsRoutes);
=======
app.use("/api/user", userRoutes);
>>>>>>> d814dc9e2277622fef8c5d70512b4f2fa988d592

app.use(notFoundHandler);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
