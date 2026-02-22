import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
// import cors from "cors";
import authRoutes from "./routes/auth.route.js";

const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.listen(PORT, () => console.info(`server is listening on port ${PORT}`));
