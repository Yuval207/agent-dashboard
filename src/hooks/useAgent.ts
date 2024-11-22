import { useState, useCallback } from "react";
import { Agent } from "@/types";
import { agentService } from "@/services/agentServices";

export function useAgent(initialAgent?: Agent) {
  const [agent, setAgent] = useState<Agent | null>(initialAgent || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateAgentName = useCallback(
    async (name: string) => {
      if (!agent) return;

      setLoading(true);
      setError(null);

      try {
        const updatedAgent = await agentService.updateAgent(agent.id, { name });
        setAgent(updatedAgent);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update agent name")
        );
      } finally {
        setLoading(false);
      }
    },
    [agent]
  );

  const updateAgentPrompt = useCallback(
    async (prompt: string) => {
      if (!agent) return;

      setLoading(true);
      setError(null);

      try {
        const updatedAgent = await agentService.updateAgent(agent.id, {
          prompt,
        });
        setAgent(updatedAgent);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to update agent prompt")
        );
      } finally {
        setLoading(false);
      }
    },
    [agent]
  );

  const testCall = useCallback(async () => {
    if (!agent) return;

    setLoading(true);
    setError(null);

    try {
      return await agentService.testCall(agent.id);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to initiate test call")
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [agent]);

  const testChat = useCallback(
    async (message: string) => {
      if (!agent) return;

      setLoading(true);
      setError(null);

      try {
        return await agentService.testChat(agent.id, message);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to send test message")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [agent]
  );

  return {
    agent,
    setAgent,
    loading,
    error,
    updateAgentName,
    updateAgentPrompt,
    testCall,
    testChat,
  };
}
