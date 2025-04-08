import { Router } from "express";
import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";

const router = Router();

router.use("/api", AuthRoutes);
router.use("/api", UserRoutes);

export default router;
