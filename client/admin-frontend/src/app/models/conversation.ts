export interface IGetConversationResponse {
  conversation_name: string;
  conversations: IConversation[];
}

export interface IConversationResponse {
  user: IUserConversation;
  other: IUserConversation;
  messages: IMessage[];
}

export interface IConversation {
  user: IUserConversation;
  other: IUserConversation;
  last_message: IMessage;
}

interface IUserConversation {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
}

export interface IMessage {
  created_at: string;
  id: number;
  sender_id: string;
  content: string;
  isRead: boolean;
}
