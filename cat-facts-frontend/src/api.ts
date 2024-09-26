import { Observable } from "rxjs";
import { CatFact } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";

const getCatFactsEventSource = () => {
  const url = new URL("cat-facts", API_BASE_URL);
  return new EventSource(url);
};

export const createCatFactsObservable = () =>
  new Observable<CatFact[]>((subscriber) => {
    const source = getCatFactsEventSource();

    source.addEventListener("message", (event) => {
      let data: CatFact[];

      try {
        data = JSON.parse(event.data);
      } catch (error) {
        return subscriber.error(error);
      }

      subscriber.next(data);
    });

    source.addEventListener("error", () =>
      subscriber.error(new Error("an error occurred while attempting to connect"))
    );

    return () => source.close();
  });
