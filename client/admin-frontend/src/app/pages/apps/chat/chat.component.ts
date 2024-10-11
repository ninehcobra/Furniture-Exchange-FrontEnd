import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  Optional,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { messages } from './chat-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConversationService } from 'src/app/services/conversation.service';
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { ToastService } from 'src/app/services/toast.service';
import { IUser } from 'src/app/models/user.model';
import {
  IConversation,
  IGetConversationResponse,
} from 'src/app/models/conversation';
import { DateUtils } from 'src/app/utils/date-format.util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class AppChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  MAX_MESSAGE_LENGTH = 500;

  chatBox = document.getElementById('chat-box');

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;

  selectedConversation: {
    info: IConversation | null;
    data: IGetConversationResponse | null;
  } = { info: null, data: null };

  public messages: Array<any> = messages;
  // tslint:disable-next-line - Disables all

  user: IUser = LocalStorageUtil.get('user');
  conversations: IConversation[] = [];

  DateFormat = DateUtils.timeAgo;

  constructor(
    public dialog: MatDialog,
    public conversationService: ConversationService,
    private toastService: ToastService
  ) {
    this.selectedMessage = this.messages[0];
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  async ngOnInit(): Promise<void> {
    await this.conversationService
      .getUserConversation({ userId: this.user.id })
      .subscribe((res) => {
        this.conversations = res;
        if (this.conversations.length > 0) {
          this.getConversationMessage(
            this.conversations[0].id,
            this.conversations[0].name
          );
        }
      });

    this.scrollToBottom();
  }

  getConversationMessage(conversationId: string, name: string): void {
    this.conversationService
      .getConversation({
        id: conversationId,
        page: 1,
        take: 50,
      })
      .subscribe((res) => {
        this.selectedConversation = {
          info: {
            id: conversationId,
            name: name,
          },
          data: res,
        };
        console.log('Selected conversation:', this.selectedConversation);
      });
  }

  getConversations() {
    this.conversationService
      .getUserConversation({ userId: this.user.id })
      .subscribe((res) => {
        this.conversations = res;
      });
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  createConversation(): void {
    this.openDialog('Add', {
      messages: 'hi',
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ChatbotDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.conversationService
          .createConversation(result.data)
          .subscribe((res) => {
            this.conversationService
              .addUserToConversation({
                conversationId: res.id,
                userId: this.user.id,
              })
              .subscribe((res) => {
                this.getConversations();
                this.toastService.showSuccess('Conversation created');
              });
          });
      } else if (result.event === 'Update') {
      } else if (result.event === 'Delete') {
      }
    });
  }

  // tslint:disable-next-line - Disables all
  onSelect(conversation: IConversation): void {
    if (conversation.id === this.selectedConversation.info?.id) {
      return;
    }
    this.getConversationMessage(conversation.id, conversation.name);
  }

  scrollToBottom(): void {
    const maxScroll = this.chatContainer?.nativeElement.scrollHeight;
    this.chatContainer?.nativeElement.scrollTo({
      top: maxScroll,
      behavior: 'smooth',
    });
  }

  sanitizeInput(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  async OnAddMsg(): Promise<void> {
    this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '' && this.selectedConversation.info?.id) {
      if (
        this.sanitizeInput(this.msg).length > 0 &&
        this.msg.length > this.MAX_MESSAGE_LENGTH
      ) {
        this.toastService.showError(
          'Message is too long or have some special characters. Please enter a valid message.'
        );
      } else {
        await this.conversationService
          .sendMessage({
            messageText: this.msg,
            conversationId: this.selectedConversation.info?.id,
            fromUserId: this.user.id,
          })
          .subscribe((res) => {
            this.toastService.showSuccess('Message sent');
            console.log(this.chatContainer.nativeElement);

            if (
              this.selectedConversation.info?.id &&
              this.selectedConversation.info?.name
            ) {
              this.getConversationMessage(
                this.selectedConversation.info.id,
                this.selectedConversation.info.name
              );
            }
          });
      }
    }

    this.scrollToBottom();
    this.myInput.nativeElement.value = '';
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'chatbot-dialog-content.html',
  styleUrl: 'chatbot-dialog-content.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
// tslint:disable-next-line: component-class-suffix
export class ChatbotDialogContentComponent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public dialogRef: MatDialogRef<ChatbotDialogContentComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    if (this.action === 'Add') {
      const payload = {
        name: this.local_data.name,
      };
      this.dialogRef.close({ event: this.action, data: payload });
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
