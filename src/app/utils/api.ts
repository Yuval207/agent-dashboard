import axios from "axios";

const API_BASE = "https://api.retellai.com/v1";

export const getAgents = async (page: number) => {
  const { data } = await axios.get(`${API_BASE}/agents?page=${page}`);
  return data;
};

export const updateAgent = async (agentId: string, updates: any) => {
  const { data } = await axios.patch(`${API_BASE}/agents/${agentId}`, updates);
  return data;
};

export const testPrompt = async (agentId: string, prompt: string) => {
  const { data } = await axios.post(`${API_BASE}/agents/${agentId}/test`, {
    prompt,
  });
  return data;
};
