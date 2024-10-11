import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {
  ICreateChatBotPayload,
  ICreateChatBotResponse,
  IGetChatBotByIdResponse,
  IGetChatBotResponse,
  IUpdateChatBotPayload,
} from '../models/chat-bot.model';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService extends BaseService {
  url = 'chat-bots';

  createChatBot(
    data: ICreateChatBotPayload
  ): Observable<ICreateChatBotResponse> {
    return this.post<ICreateChatBotResponse>(`${this.url}`, data);
  }

  getChatBot(): Observable<IGetChatBotResponse> {
    return this.get<IGetChatBotResponse>(`${this.url}/me`);
  }

  updateChatBot(data: IUpdateChatBotPayload): Observable<boolean> {
    return this.patch<boolean>(`chat-bots/${data.id}`, {
      apiKeyId: data.apiKeyId,
      chatbotConfig: data.chatbotConfig,
      domain: data.domain,
      flowData: data.flowData,
      isDeploy: data.isDeploy,
      isPublic: data.isPublic,
      name: data.name,
      thumbnail: data.thumbnail,
    });
  }

  getChatBotById(id: string): Observable<IGetChatBotByIdResponse> {
    return this.get<IGetChatBotByIdResponse>(`${this.url}/${id}/user`);
  }

  checkDomain(domain: string): Observable<boolean> {
    return this.get<boolean>(`${this.url}/check-domain?domain=${domain}`);
  }
}
