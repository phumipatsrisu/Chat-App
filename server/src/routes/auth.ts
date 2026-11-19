import { register, login, getProfile } from "../controller/auth";
import { Router } from "express";
import { authCheck } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authCheck, getProfile);
export default router;
