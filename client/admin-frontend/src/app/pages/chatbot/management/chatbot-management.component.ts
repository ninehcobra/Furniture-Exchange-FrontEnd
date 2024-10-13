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
import { ProductService } from 'src/app/services/product.service';
import { ICreateProductPayload, IProduct } from 'src/app/models/product.model';

@Component({
  templateUrl: './chatbot-management.component.html',
  styleUrl: './chatbot-management.component.scss',
})
export class ChatbotManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  searchText: string = '';
  displayedColumns: string[] = [
    '#',
    'name',
    'price',
    'description',
    'category',
    'action',
  ];
  dataSource = new MatTableDataSource<IProduct>([]);

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private clipboard: Clipboard,
    private toastService: ToastService,
    private productService: ProductService,
    private bannerService: BannerService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: IProduct[]) => {
        this.dataSource.data = products;
        console.log(products);
      },
      (error) => {
        this.toastService.showError('Failed to fetch products');
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, product?: IProduct): void {
    const dialogRef = this.dialog.open(ChatbotDialogContentComponent, {
      data: { action, product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'Add') {
          this.addProduct(result.data);
        } else if (result.action === 'Update') {
          this.updateProduct(result.data);
        } else if (result.action === 'Delete') {
          this.deleteProduct(result.data);
        }
      }
    });
  }

  addProduct(productData: ICreateProductPayload): void {
    this.productService.createProduct(productData).subscribe(
      (response) => {
        this.toastService.showSuccess('Product created successfully');
        this.fetchProducts();
      },
      (error) => {
        this.toastService.showError('Failed to create product');
      }
    );
  }

  updateProduct(product: IProduct): void {
    // Implement update logic using ProductService
  }

  deleteProduct(product: IProduct): void {
    // Implement delete logic using ProductService
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
      this.local_data.imagePath = '';
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
