import { describe, test, mock, expect, beforeEach, afterEach } from "bun:test";
import { CAT_FACTS_DATA } from "./mocks/catFactsData";
import { RANDOM_USERS_DATA } from "./mocks/randomUsersData";
import { getUsersWithFacts } from "../controllers/utils";

const fetchCatFacts = mock(
  () => new Promise((resolve) => resolve(CAT_FACTS_DATA))
);

const fetchRandomUsers = mock(
  () => new Promise((resolve) => resolve(RANDOM_USERS_DATA))
);

describe("getUsersWithFacts", () => {
  beforeEach(() => {
    mock.module("../api.ts", () => ({
      fetchCatFacts,
      fetchRandomUsers,
    }));
  });

  test("creates users with facts", async () => {
    const result = await getUsersWithFacts();

    expect(result).toBeArray();

    const { first, last } = RANDOM_USERS_DATA.results[0].name;
    const mockUserName = `${first} ${last}`;

    expect(result[0].user).toBe(mockUserName);
    expect(result[0].fact).toBe(CAT_FACTS_DATA.data[0].fact);
  });

  afterEach(() => {
    mock.restore();
  });
});
