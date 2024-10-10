import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatNativeDateModule } from '@angular/material/core';
import {
  ChatbotManagementComponent,
  ChatbotDialogContentComponent,
} from './management/chatbot-management.component';
import { ChatbotRoutes } from './chatbot.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChatbotRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    NgxPaginationModule,
    MatNativeDateModule,
    NgScrollbarModule,
  ],
  exports: [TablerIconsModule],
  declarations: [ChatbotManagementComponent, ChatbotDialogContentComponent],
  providers: [DatePipe],
})
export class ChatbotModule {}
