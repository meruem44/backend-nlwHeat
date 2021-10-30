import { Request, Response } from "express";

import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  public async handle(request: Request, response: Response) {
    const { message } = request.body;
    const { id } = request.user;

    const createMessage = new CreateMessageService();

    const result = await createMessage.execute(message, id);

    return response.json(result);
  }
}

export { CreateMessageController };
