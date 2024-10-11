export interface IConversation {
  id: string;
  name: string;
}

export interface ICreateConversationPayload {
  name: string;
}

export interface ICreateConversationResponse {
  id: string;
}

export interface IAddUserToConversationPayload {
  userId: string;
  conversationId: string;
}

export interface ISendMessagePayload {
  fromUserId: string;
  messageText: string;
  conversationId: string;
}

export interface IMessage {
  id: string;
  messageText: string;
  fromUser: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
  };
  sendDate: string;
}

export interface ISendMessageResponse extends IMessage {}

export interface IGetConversationQuery {
  id: string;
  page: number;
  take: number;
}

export interface IGetConversationResponse {
  page: number;
  take: number;
  items: IMessage[];
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IGetUserConversationPayload {
  userId: string;
}

export interface IGetUserConversationResponse extends Array<IConversation> {}
