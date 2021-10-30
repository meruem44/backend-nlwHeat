import { Router } from "express";

import { oauthRoutes } from "./oauth.routes";
import { authenticateRouter } from "./authenticate.routes";
import { messagesRouter } from "./messages.routes";
import { UserRouter } from "./user.routes";

const routes = Router();

routes.use("/", oauthRoutes);
routes.use("/user", UserRouter);
routes.use("/authenticate", authenticateRouter);
routes.use("/messages", messagesRouter);

export { routes };
