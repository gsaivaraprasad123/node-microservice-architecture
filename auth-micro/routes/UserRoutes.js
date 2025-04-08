import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = Router();

router.get("/getuser/:id", UserController.getUser);

export default router;
