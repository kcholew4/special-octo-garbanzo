export interface CatFactsAPIResponse {
  data: {
    fact: string;
  }[];
}

export interface RandomUserAPIResponse {
  results: {
    name: {
      first: string;
      last: string;
    };
  }[];
}
