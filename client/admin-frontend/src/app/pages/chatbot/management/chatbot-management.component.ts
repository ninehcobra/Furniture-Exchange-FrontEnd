import {
  Component,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from 'src/app/services/toast.service';
import { ChatBotService } from 'src/app/services/chat-bot.service';
import {
  IChatBot,
  ICreateChatBotPayload,
  ICreateChatBotResponse,
  IGetChatBotResponse,
} from 'src/app/models/chat-bot.model';
import { CHAT_WIDGET_DEFAULT_CONFIG } from 'src/constants/chat-widget-config.constant';
import { BannerService } from 'src/app/services/banner.service';
import { Router } from '@angular/router';

const chatbots: IGetChatBotResponse = [];

@Component({
  templateUrl: './chatbot-management.component.html',
  styleUrl: './chatbot-management.component.scss',
})
export class ChatbotManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'name',
    'thumbnail',
    'isPublic',
    'isDeploy',
    'domain',
    'apiKey',
    'action',
  ];
  dataSource = new MatTableDataSource(chatbots);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private clipboard: Clipboard,
    private toastService: ToastService,
    private chatBotService: ChatBotService,
    private bannerService: BannerService,
    private router: Router
  ) {}

  fetchChatBots(): void {
    this.chatBotService
      .getChatBot()
      .subscribe((response: IGetChatBotResponse) => {
        this.dataSource.data = response;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchChatBots();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ChatbotDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result.event);
      if (result.event === 'Add') {
        console.log(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  editGeneralInfo(element: IChatBot): void {
    this.openDialog('Update', element);
  }

  editInterface(element: IChatBot): void {
    this.router.navigate([`/chatbot/management/${element.id}`]);
  }

  copyId(id: string) {
    this.clipboard.copy(id);
    this.toastService.showSuccess('ID copied to clipboard');
  }

  toggleApiKeyVisibility(element: any): void {
    element.showApiKey = !element.showApiKey;
  }

  addRowData(row_obj: IChatBot): void {
    this.chatBotService.createChatBot(row_obj).subscribe(
      (response: ICreateChatBotResponse) => {
        this.toastService.showSuccess('Chatbot created successfully');
        this.bannerService.show('Create chatbot successfully', 'success');
        this.fetchChatBots(); // Refetch the chatbots
      },
      (error) => {
        this.bannerService.show('Failed to create chatbot', 'error');
        this.toastService.showError(error);
      }
    );
  }

  updateRowData(row_obj: IChatBot): void {
    this.chatBotService.updateChatBot(row_obj).subscribe(
      (success: boolean) => {
        if (success) {
          this.bannerService.show('Chatbot updated successfully', 'success');
          this.fetchChatBots();
        } else {
          this.bannerService.show('Failed to update chatbot', 'error');
        }
      },
      (error) => {
        this.toastService.showError(error);
        this.bannerService.show('Failed to update chatbot', 'error');
      }
    );
  }

  deleteRowData(row_obj: IChatBot): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }
}

// Chatbot Dialog
@Component({
  selector: 'app-dialog-content',
  templateUrl: 'chatbot-dialog-content.html',
  styleUrl: 'chatbot-dialog-content.scss',
})
// tslint:disable-next-line: component-class-suffix
export class ChatbotDialogContentComponent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  isDomainValid: boolean;

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ChatbotDialogContentComponent>,
    private chatBotService: ChatBotService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IChatBot
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.isDomainValid = this.action !== 'Add';

    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath =
        'https://th.bing.com/th/id/OIP.efATY6p5-5aINwEzOqYKFwAAAA?rs=1&pid=ImgDetMain';
    }
  }

  onDomainInput(event: Event) {
    const domain = (event.target as HTMLInputElement).value;

    // Special case for localhost with port
    if (/^localhost:\d+$/.test(domain)) {
      this.isDomainValid = true;
      return;
    }

    this.chatBotService.checkDomain(domain).subscribe(
      (isValid) => {
        this.isDomainValid = isValid;
      },
      (error) => {
        this.isDomainValid = false;
      }
    );
  }

  doAction(): void {
    if (this.action === 'Add') {
      const payload: ICreateChatBotPayload = {
        name: this.local_data.name,
        thumbnail: this.local_data.imagePath,
        isPublic: this.local_data.isPublic,
        isDeploy: this.local_data.isDeploy,
        domain: this.local_data.domain,
        apiKeyId: this.local_data.apiKeyId,
        flowData: '',
        chatbotConfig: JSON.stringify(CHAT_WIDGET_DEFAULT_CONFIG),
      };
      this.dialogRef.close({ event: this.action, data: payload });
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}
