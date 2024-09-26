import type { Request, Response } from "express";
import { catchError, interval, repeat, startWith, switchMap } from "rxjs";
import { getUsersWithFacts } from "../api";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

const catFactsController = async (req: Request, res: Response) => {
  const observable = interval(10000).pipe(
    startWith(0),
    switchMap(() => fromPromise(getUsersWithFacts())),
    catchError((error) => {
      console.error(`error fetching data: ${error}`);
      return [];
    })
  );

  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  res.write(": \n\n");

  const subscription = observable.subscribe((data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  req.on("close", () => {
    subscription.unsubscribe();
    res.end();
  });
};

export default catFactsController;
