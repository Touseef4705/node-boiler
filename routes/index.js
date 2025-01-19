import { Router } from "express";
import testRouter from "../src/test/router.js";

const router = Router();

router.use("/test", testRouter);

export default router;