import { useEffect, useState } from "react";
import { createCatFactsObservable } from "../api";
import { CatFact } from "../types";

export const useCatFacts = () => {
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observable = createCatFactsObservable();

    const subscription = observable.subscribe({
      next(value) {
        setCatFacts(value);
      },
      error(error: Error) {
        console.error(error.message);
        setError(true);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return [catFacts, error] as const;
};
