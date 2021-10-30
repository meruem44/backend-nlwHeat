import express, { Application, json } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import { routes } from "./routes";

class App {
  public server: Application;
  public serverHttp: http.Server;
  public io: Server;

  constructor() {
    this.server = express();
    this.server.use(cors());

    this.serverHttp = http.createServer(this.server);

    this.io = new Server(this.serverHttp, {
      cors: {
        origin: "*",
      },
    });

    this.io.on("connection", (socket) => {
      console.log(`User connect: ${socket}`);
    });

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(json());
  }

  private routes(): void {
    this.server.use(routes);
  }
}
const app = new App();

export const io = app.io;
export const server = app.serverHttp;
