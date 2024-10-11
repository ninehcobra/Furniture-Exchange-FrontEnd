import { IRole } from './role.model';

export interface IChatBot {
  name: string;
  thumbnail: string;
  flowData: any;
  isPublic: boolean;
  isDeploy: boolean;
  domain: string;
  chatbotConfig: any;
  apiKeyId: string;
  id: string;
  owner: IChatBotOwner;
}

export interface ICreateChatBotPayload {
  name: string;
  thumbnail: string;
  flowData: any;
  isPublic: boolean;
  isDeploy: boolean;
  domain: string;
  chatbotConfig: any;
  apiKeyId: string;
  checkSSL?: boolean;
}

export interface ICreateChatBotResponse {
  id: string;
}

export interface IUpdateChatBotPayload {
  id: string;
  name: string;
  thumbnail: string;
  flowData: any;
  isPublic: boolean;
  isDeploy: boolean;
  domain: string;
  chatbotConfig: any;
  apiKeyId: string;
}

export interface IGetChatBotResponse extends Array<IChatBot> {}

export interface IGetChatBotByIdResponse extends IChatBot {
  userId: string;
  role: IRole;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface IChatBotOwner {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ICheckDomainResponse {
  status: boolean;
  message: string;
}
