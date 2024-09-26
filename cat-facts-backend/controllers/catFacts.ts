import type { Request, Response } from "express";
import { createFactsObservable } from "./utils";

const facts$ = createFactsObservable();

const catFactsController = async (req: Request, res: Response) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  res.write(": \n\n");

  const subscription = facts$.subscribe((data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  req.on("close", () => {
    subscription.unsubscribe();
    res.end();
  });
};

export default catFactsController;
