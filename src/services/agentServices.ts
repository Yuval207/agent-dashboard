import { Agent } from "@/types";

const API_BASE_URL = "https://api.retellai.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_RETELL_API_KEY}`,
};

export interface CreateAgentDTO {
  name: string;
  voice: string;
  language: string;
  prompt: string;
}

export interface UpdateAgentDTO {
  name?: string;
  voice?: string;
  prompt?: string;
}

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

export const agentService = {
  async createAgent(data: CreateAgentDTO): Promise<Agent> {
    const response = await fetch(`${API_BASE_URL}/agent`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Agent>(response);
  },

  async updateAgent(agentId: string, data: UpdateAgentDTO): Promise<Agent> {
    const response = await fetch(`${API_BASE_URL}/agent/${agentId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Agent>(response);
  },

  async getAgents(): Promise<Agent[]> {
    const response = await fetch(`${API_BASE_URL}/agent`, {
      headers,
    });
    return handleResponse<Agent[]>(response);
  },

  async deleteAgent(agentId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/agent/${agentId}`, {
      method: "DELETE",
      headers,
    });
    return handleResponse<void>(response);
  },

  async testCall(agentId: string): Promise<{ callId: string }> {
    const response = await fetch(`${API_BASE_URL}/agent/${agentId}/test-call`, {
      method: "POST",
      headers,
    });
    return handleResponse<{ callId: string }>(response);
  },

  async testChat(
    agentId: string,
    message: string
  ): Promise<{ response: string }> {
    const response = await fetch(`${API_BASE_URL}/agent/${agentId}/test-chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message }),
    });
    return handleResponse<{ response: string }>(response);
  },
};
