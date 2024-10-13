import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatBotService } from 'src/app/services/chat-bot.service';
import { IChatBot } from 'src/app/models/chat-bot.model';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CHAT_WIDGET_DEFAULT_CONFIG } from 'src/constants/chat-widget-config.constant';
import { MatAccordion } from '@angular/material/expansion';
import { BannerService } from 'src/app/services/banner.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { PreviewChatbotDialogComponent } from './preview/preview-chatbot-dialog.component';

@Component({
  selector: 'app-chatbot-config',
  templateUrl: './chatbot-config.component.html',
  styleUrls: ['./chatbot-config.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ColorPickerModule],
})
export class ChatbotConfigComponent implements OnInit, AfterViewInit {
  chatbot: IChatBot | null = null;
  config: any = CHAT_WIDGET_DEFAULT_CONFIG;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  panelOpenState: { [key: string]: boolean } = {
    general: true,
    button: false,
    chatWindow: false,
    botMessage: false,
    userMessage: false,
    textInput: false,
  };

  constructor(
    private route: ActivatedRoute,
    private chatBotService: ChatBotService,
    private snackBar: MatSnackBar,
    private bannerService: BannerService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    const chatbotId = this.route.snapshot.paramMap.get('id');
    if (chatbotId) {
      this.chatBotService.getChatBotById(chatbotId).subscribe(
        (chatbot: IChatBot) => {
          if (chatbot === null) {
            this.router.navigate(['/store/management']);
          }
          this.chatbot = chatbot;
          this.initializeConfig();
        },
        (error) => {
          console.error('Error fetching chatbot:', error);
          this.showErrorMessage('Failed to load chatbot configuration');
        }
      );
    }
  }

  initializeConfig() {
    if (this.chatbot && this.chatbot.chatbotConfig) {
      this.config = JSON.parse(this.chatbot.chatbotConfig);
    }
  }

  closeAllPanels() {
    Object.keys(this.panelOpenState).forEach((key) => {
      this.panelOpenState[key] = false;
    });
  }

  onConfigChange() {
    // This method will be called whenever a configuration value changes
    console.log('Configuration changed:', this.config);
  }

  openPreview() {
    const dialogRef = this.dialog.open(PreviewChatbotDialogComponent, {
      data: {
        config: this.config,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, perform the restore action
        this.restoreDefaultConfig();
      }
    });
  }

  togglePanel(panelName: string) {
    this.panelOpenState[panelName] = !this.panelOpenState[panelName];
  }

  updateConfig() {
    if (this.chatbot) {
      this.chatbot.chatbotConfig = JSON.stringify(this.config);
      this.chatBotService.updateChatBot(this.chatbot).subscribe(
        () => {
          this.bannerService.show(
            'Chatbot configuration updated successfully',
            'success'
          );
          this.showSuccessMessage('Chatbot configuration updated successfully');
          this.closeAllPanels();
        },
        (error) => {
          console.error('Error updating chatbot config:', error);
          this.bannerService.show(
            'Failed to update chatbot configuration',
            'error'
          );
          this.showErrorMessage('Failed to update chatbot configuration');
        }
      );
    }
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }

  onSetDefault() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Restore',
        message: 'Are you sure you want to restore the default configuration?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, perform the restore action
        this.restoreDefaultConfig();
      }
    });
  }

  restoreDefaultConfig() {
    this.config = CHAT_WIDGET_DEFAULT_CONFIG;
    this.updateConfig();
    this.showSuccessMessage('Default configuration restored successfully');
  }
}
