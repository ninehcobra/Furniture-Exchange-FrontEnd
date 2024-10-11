import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import {
  ICreateChatBotPayload,
  ICreateChatBotResponse,
} from '../models/chat-bot.model';
import {
  IAddUserToConversationPayload,
  IGetConversationQuery,
  IGetConversationResponse,
  IGetUserConversationPayload,
  IGetUserConversationResponse,
  ISendMessagePayload,
} from '../models/conversation';

@Injectable({
  providedIn: 'root',
})
export class ConversationService extends BaseService {
  url = 'conversations';

  createConversation(data: ICreateChatBotPayload) {
    return this.post<ICreateChatBotResponse>(`${this.url}`, data);
  }

  addUserToConversation(data: IAddUserToConversationPayload) {
    return this.post<boolean>(
      `${this.url}/${data.conversationId}/members`,
      data
    );
  }

  sendMessage(data: ISendMessagePayload) {
    return this.post<boolean>(
      `${this.url}/${data.conversationId}/messages`,
      data
    );
  }

  getUserConversation(data: IGetUserConversationPayload) {
    return this.post<IGetUserConversationResponse>(`${this.url}/user`, data);
  }

  getConversation(data: IGetConversationQuery) {
    return this.get<IGetConversationResponse>(
      `${this.url}/${data.id}/messages?page=${data.page}&take=${data.take}`
    );
  }
}
