import { Request, response, Response } from "express";

import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const profileUser = new ProfileUserService();

    const user = await profileUser.execute(id);

    return response.json(user);
  }
}

export { ProfileUserController };
