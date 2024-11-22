const API_BASE_URL = "https://api.retellai.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_RETELL_API_KEY}`,
};

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(response.status, error.message || "An error occurred");
  }
  return response.json();
}
