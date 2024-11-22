import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  agentName: string;
  onNameChange: (name: string) => void;
  onTestCall: () => void;
  onTestChat: () => void;
}

export const Navbar = ({
  agentName,
  onNameChange,
  onTestCall,
  onTestChat,
}: NavbarProps) => {
  return (
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <Input
        value={agentName}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-48 h-9"
        placeholder="Agent Name"
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={onTestCall} className="bg-white">
          Test Call
        </Button>
        <Button onClick={onTestChat}>Test Chat</Button>
      </div>
    </div>
  );
};
