import { CommandHandler, UserCommandHandler } from "./command";

type Config = {
  dbUrl: string;
  currentUserName: string;
}

type MiddlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export type { Config, MiddlewareLoggedIn };
