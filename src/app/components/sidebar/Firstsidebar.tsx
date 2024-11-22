import { Button } from "@/components/ui/button";
import { Settings, Mic2, Box, Hash } from "lucide-react";

export const FirstSidebar = () => {
  return (
    <div className="w-16 bg-[#4839A3] flex flex-col items-center py-4 space-y-6">
      <Button variant="ghost" className="p-2 hover:bg-white/10">
        <Mic2 className="h-6 w-6 text-white" />
      </Button>
      <Button variant="ghost" className="p-2 hover:bg-white/10">
        <Settings className="h-6 w-6 text-white" />
      </Button>
      <Button variant="ghost" className="p-2 hover:bg-white/10">
        <Box className="h-6 w-6 text-white" />
      </Button>
      <Button variant="ghost" className="p-2 hover:bg-white/10">
        <Hash className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};
