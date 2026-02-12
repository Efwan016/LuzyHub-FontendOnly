import type { VercelResponse } from '@vercel/node';

export default async function handler(res: VercelResponse) {
  try {
    const response = await fetch("https://zeldvorik.ru/apiv3/api.php?action=trending");

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch trending" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending", err });
  }
}
