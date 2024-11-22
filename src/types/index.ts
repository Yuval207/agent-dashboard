export interface Agent {
  id: string;
  name: string;
  voice: string;
  language: string;
  prompt: string;
}

export interface Voice {
  name: string;
  gender: "male" | "female";
  language: string;
}

export interface Message {
  text: string;
  sender: "user" | "agent";
}
