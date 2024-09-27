import {
  catchError,
  from,
  interval,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { fetchCatFacts, fetchRandomUsers } from "../api";

export const getUsersWithFacts = async () => {
  const factsApiResponse = await fetchCatFacts();
  const usersApiResponse = await fetchRandomUsers();

  const facts = factsApiResponse.data.map(({ fact }) => fact);
  const users = usersApiResponse.results.map(
    ({ name }) => `${name.first} ${name.last}`
  );

  if (facts.length !== users.length)
    throw new Error("facts and users must have the same number of elements");

  const factsWithUsers = facts.map((fact, index) => {
    const user = users[index];

    return {
      user,
      fact,
    };
  });

  return factsWithUsers;
};

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
