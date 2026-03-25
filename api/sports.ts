import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { type, sport, status, id } = req.query;

  const url = new URL("https://api.sportsrc.org/v2/");

  if (type) url.searchParams.append("type", String(type));
  if (sport) url.searchParams.append("sport", String(sport));
  if (status) url.searchParams.append("status", String(status));
  if (id) url.searchParams.append("id", String(id));

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-API-KEY": "84f79cf576a79338d491889b45198610",
      },
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch  {
    res.status(500).json({ error: "Failed to fetch sports data" });
  }
}