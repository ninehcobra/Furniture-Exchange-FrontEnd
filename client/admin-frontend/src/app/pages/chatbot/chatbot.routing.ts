import { Routes } from '@angular/router';
import { ChatbotConfigComponent } from './management/chatbot-config/chatbot-config.component';
import { ChatbotManagementComponent } from './management/chatbot-management.component';

export const ChatbotRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'management',
        component: ChatbotManagementComponent,
        data: {
          title: 'ChatBot',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'ChatBot' },
          ],
        },
      },
      {
        path: 'management/:id',
        component: ChatbotConfigComponent,
        data: {
          title: 'ChatBot',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'ChatBot' },
          ],
        },
      },
    ],
  },
];
