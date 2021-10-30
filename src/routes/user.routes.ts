import { Router } from "express";

import { ProfileUserController } from "../controllers/ProfileUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const UserRouter = Router();
const profileUserController = new ProfileUserController();

UserRouter.get("/", ensureAuthenticated, profileUserController.handle);

export { UserRouter };
