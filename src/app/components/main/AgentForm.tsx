import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/types";

interface AgentFormProps {
  agent: Agent | null;
  onNameChange: (name: string) => void;
  onPromptChange: (prompt: string) => void;
}

export const AgentForm = ({
  agent,
  onNameChange,
  onPromptChange,
}: AgentFormProps) => {
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Name</h2>
            <Input
              value={agent?.name || ""}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter agent name"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Prompt</h2>
            <Textarea
              value={agent?.prompt || ""}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Enter your prompt here..."
              className="min-h-[200px]"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
