import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

import {
  IConversationResponse,
  IGetConversationResponse,
} from '../models/conversation';

@Injectable({
  providedIn: 'root',
})
export class ConversationService extends BaseService {
  url = 'conversations';

  getUserConversations() {
    return this.get<IGetConversationResponse>(`${this.url}`);
  }

  getConversationByOtherUserId(userId: string) {
    return this.get<IConversationResponse>(`${this.url}/${userId}/user`);
  }

  getConversationByProductId(productId: string) {
    return this.get<IConversationResponse>(`${this.url}/${productId}/product`);
  }
}
