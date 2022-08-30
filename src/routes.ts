import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router()

router.get("/")

//User
router.get("/user/add", new UserController().add)
router.post("/user/get", new UserController().get)
router.post("/user/delete", new UserController().delete)


export { router }