import type { CatFactsAPIResponse, RandomUserAPIResponse } from "./types";

const fetchCatFacts = async () => {
  // https://publicapis.io/cat-facts-api was not responding.
  const url = new URL("https://catfact.ninja/facts");

  url.searchParams.set("limit", "6");

  try {
    const response = await fetch(url);
    return (await response.json()) as CatFactsAPIResponse;
  } catch (error) {
    throw new Error(`error fetching cat facts: ${error}`);
  }
};

const fetchRandomUsers = async () => {
  const url = new URL("https://randomuser.me/api/");

  url.searchParams.set("results", "6");

  try {
    const response = await fetch(url);
    return (await response.json()) as RandomUserAPIResponse;
  } catch (error) {
    throw new Error(`error fetching random users: ${error}`);
  }
};

export const getUsersWithFacts = async () => {
  const factsApiResponse = await fetchCatFacts();
  const usersApiResponse = await fetchRandomUsers();

  const facts = factsApiResponse.data.map(({ fact }) => fact);
  const users = usersApiResponse.results.map(
    ({ name }) => `${name.first} ${name.last}`
  );

  const factsWithUsers = facts.map((fact, index) => {
    const user = users[index];

    return {
      user,
      fact,
    };
  });

  return factsWithUsers;
};
