import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './preview-chatbot-dialog.component.html',
  styleUrls: ['./preview-chatbot-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class PreviewChatbotDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private scriptElement: HTMLScriptElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { config: any }) {}

  ngAfterViewInit(): void {
    console.log('Preview Chatbot Dialog Component After View Init');
    this.scriptElement = document.createElement('script');
    this.scriptElement.src =
      'https://ninehcobra.github.io/chat-template/chat-widget.js';
    this.scriptElement.async = true;
    document.body.appendChild(this.scriptElement);

    this.scriptElement.onload = () => {
      const initChatWidget = (window as any).initChatWidget;
      if (typeof initChatWidget === 'function') {
        initChatWidget(this.data.config);
      } else {
        console.error('initChatWidget function not found');
      }
    };
  }

  ngOnInit() {
    console.log('Preview Chatbot Dialog Component Initialized', this.data);
  }

  ngOnDestroy() {
    if (this.scriptElement) {
      document.body.removeChild(this.scriptElement);
      console.log('Script removed from the document');
    }

    const chatWidgetContainer = document.getElementById(
      'chat-widget-container'
    );
    if (chatWidgetContainer) {
      chatWidgetContainer.remove();
      console.log('Chat widget container removed');
    }

    const toggleChatWidget = document.getElementById('chat-widget-toggle');
    if (toggleChatWidget) {
      toggleChatWidget.remove();
      console.log('Toggle chat widget removed');
    }
  }
}
