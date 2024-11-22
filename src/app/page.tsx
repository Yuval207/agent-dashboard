"use client";

import { useState } from "react";
import { FirstSidebar } from "@/app/components/sidebar/Firstsidebar";
import { SecondSidebar } from "@/app/components/sidebar/Secondsidebar";
import { Navbar } from "@/app/components/main/Navbar";
import { AgentForm } from "@/app/components/main/AgentForm";
import { ChatSheet } from "@/app/components/chat/ChatSheet";
import { Agent, Voice, Message } from "@/types";

export default function AgentDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const voices: Voice[] = [
    { name: "Marie", gender: "female", language: "English" },
    { name: "Sarah", gender: "female", language: "English" },
    { name: "Mark", gender: "male", language: "English" },
    { name: "Sam", gender: "male", language: "English" },
    { name: "Marie", gender: "female", language: "Spanish" },
    { name: "Sarah", gender: "female", language: "Spanish" },
    { name: "Mark", gender: "male", language: "Spanish" },
    { name: "Sam", gender: "male", language: "Spanish" },
    { name: "Marie", gender: "female", language: "French" },
    { name: "Sarah", gender: "female", language: "French" },
    { name: "Mark", gender: "male", language: "French" },
    { name: "Sam", gender: "male", language: "French" },
  ];

  const handleVoiceSelect = (voice: Voice) => {
    setSelectedAgent({
      id: voice.name,
      name: voice.name,
      voice: voice.name,
      language: voice.language,
      prompt: "",
    });
  };

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `This is a test response to: ${message}`, sender: "agent" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <FirstSidebar />
      <SecondSidebar
        voices={voices}
        onVoiceSelect={handleVoiceSelect}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          agentName={selectedAgent?.name || ""}
          onNameChange={(name) =>
            setSelectedAgent((prev) => (prev ? { ...prev, name } : null))
          }
          onTestCall={() => {}}
          onTestChat={() => setChatOpen(true)}
        />
        <AgentForm
          agent={selectedAgent}
          onNameChange={(name) =>
            setSelectedAgent((prev) => (prev ? { ...prev, name } : null))
          }
          onPromptChange={(prompt) =>
            setSelectedAgent((prev) => (prev ? { ...prev, prompt } : null))
          }
        />
        <ChatSheet
          open={chatOpen}
          onOpenChange={setChatOpen}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
