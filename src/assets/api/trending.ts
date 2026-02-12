interface ServerResponse {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
}

export default async function handler(
  _req: unknown,
  res: ServerResponse
) {
  try {
    const response = await fetch(
      
      "https://zeldvorik.ru/apiv3/api.php?action=trending"
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch trending" });
  }
}
