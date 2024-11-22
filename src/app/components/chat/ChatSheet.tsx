import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/types";
import { FormEvent } from "react";

interface ChatSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatSheet = ({
  open,
  onOpenChange,
  messages,
  onSendMessage,
}: ChatSheetProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    if (input.value.trim()) {
      onSendMessage(input.value);
      input.value = "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Test Chat</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 pr-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input name="message" placeholder="Type your message..." />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
