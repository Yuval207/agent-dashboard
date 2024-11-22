import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Voice } from "@/types";
import { Search } from "lucide-react";

interface SecondSidebarProps {
  voices: Voice[];
  onVoiceSelect: (voice: Voice) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SecondSidebar = ({
  voices,
  onVoiceSelect,
  searchTerm,
  onSearchChange,
}: SecondSidebarProps) => {
  const groupedVoices = voices.reduce((acc, voice) => {
    if (!acc[voice.language]) {
      acc[voice.language] = [];
    }
    acc[voice.language].push(voice);
    return acc;
  }, {} as Record<string, Voice[]>);

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Voice/Language"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <ScrollArea className="h-[calc(100vh-6rem)] mt-4">
          {Object.entries(groupedVoices).map(([language, voices]) => (
            <div key={language} className="mb-4">
              <h3 className="text-sm text-gray-500 mb-2">{language}</h3>
              {voices.map((voice) => (
                <button
                  key={voice.name}
                  onClick={() => onVoiceSelect(voice)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 mb-1 flex items-center justify-between"
                >
                  <span>{voice.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      voice.gender === "female"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {voice.gender}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
