type FetchParams = Record<string, string | number>;

const SPORTS_BASE_URL = "/api/sports";

const fetchSportsApi = async (params: FetchParams) => {
  const searchParams = new URLSearchParams(params as Record<string, string>);
  const url = `${SPORTS_BASE_URL}?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sports API Error: ${response.status}`);
  }

  return response.json();
};

export const sportsApi = {
  getLiveMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "inprogress",
    }),

  getUpcomingMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "notstarted",
    }),

  getFinishedMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "finished",
    }),

  getMatchDetail: (id: string) =>
    fetchSportsApi({
      type: "detail",
      id,
    }),
};