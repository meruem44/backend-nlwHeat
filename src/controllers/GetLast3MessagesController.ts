import { Request, Response } from "express";

import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const getLast3Messages = new GetLast3MessagesService();

    const messages = await getLast3Messages.execute();

    return response.json(messages);
  }
}

export { GetLast3MessagesController };
