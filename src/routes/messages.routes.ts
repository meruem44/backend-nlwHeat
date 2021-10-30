import { Router } from "express";

import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetLast3MessagesController } from "../controllers/GetLast3MessagesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const messagesRouter = Router();
const createMessageController = new CreateMessageController();
const getLast3MessagesController = new GetLast3MessagesController();

messagesRouter.post("/", ensureAuthenticated, createMessageController.handle);
messagesRouter.get(
  "/last3",
  ensureAuthenticated,
  getLast3MessagesController.handle
);

export { messagesRouter };
