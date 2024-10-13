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

// export interface ICreateConversationPayload {
//   product_id: string;
//   user_id: string;
//   other_id: string;
// }

// export interface ICreateConversationResponse {
//   id: string;
//   name: string;
//   product_id: string;
//   user_id: string;
//   other_id: string;
//   created_at: string;
// }

// export interface IGetUserConversationResponse {
//   user: IUserConversationInfo;
//   other: IUserConversationInfo;
//   last_message: {
//     id: number;
//     created_at: string;
//     sender_id: string;
//     content: string;
//     isRead: boolean;
//   };
// }

// interface IUserConversationInfo {
//   id: string;
//   first_name: string;
//   last_name: string;
//   image_url: string;
// }
