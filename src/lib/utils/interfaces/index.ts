export interface ForgeAIResponse {
  subject: string;
  body: string;
  success: boolean;
}

export interface Bot {
  id: string;
  name: string;
  description?: string;
  tip?: string;
  placeholder?: string;
}

export interface EmailFormProps {
  bot: Bot | undefined;
} 

export interface BotSelectorProps {
  botId: string;
  icon?: React.ReactNode;
  label: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}