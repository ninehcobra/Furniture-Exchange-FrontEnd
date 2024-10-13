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
          title: 'Quản lý cửa hàng',
          urls: [
            { title: 'Trang chủ', url: '/dashboards/dashboard1' },
            { title: 'Quản lý cửa hàng' },
          ],
        },
      },
      {
        path: 'management/:id',
        component: ChatbotConfigComponent,
        data: {
          title: 'Quản lý cửa hàng',
          urls: [
            { title: 'Trang chủ', url: '/dashboards/dashboard1' },
            { title: 'Quản lý cửa hàng' },
          ],
        },
      },
    ],
  },
];
