import {
  catchError,
  from,
  interval,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { getUsersWithFacts } from "../api";

export const createFactsObservable = () =>
  interval(10000).pipe(
    startWith(0),
    switchMap(() => from(getUsersWithFacts())),
    catchError((error) => {
      console.error(`error fetching data: ${error}`);
      return [];
    }),
    shareReplay({ refCount: true })
  );
