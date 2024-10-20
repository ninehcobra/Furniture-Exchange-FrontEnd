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
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { IUser } from 'src/app/models/user.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  templateUrl: './chatbot-management.component.html',
  styleUrl: './chatbot-management.component.scss',
})
export class ChatbotManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  user: IUser = LocalStorageUtil.get('user');

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
    if (this.user && this.user.role === 'seller') {
      this.fetchSellerProducts();
    } else {
      this.fetchProducts();
    }
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

  fetchSellerProducts(): void {
    this.productService.getSellerProducts().subscribe(
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
export class ChatbotDialogContentComponent implements OnInit {
  productForm: FormGroup;
  selectedFiles: File[] = [];

  previewUrls: string[] = [];

  categories: ICategory[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChatbotDialogContentComponent>,
    private productService: ProductService,
    private categoryService: CategoryService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      origin: ['', Validators.required],
      address_line: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      state: ['used', Validators.required],
      category_id: [null, Validators.required],
      expired_at: ['', Validators.required],
      kilogram: ['', Validators.required],
      image_urls: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  addImageUrl() {
    const imageUrls = this.productForm.get('image_urls') as FormArray;
    imageUrls.push(this.fb.control(''));
  }

  removeImageUrl(index: number) {
    const imageUrls = this.productForm.get('image_urls') as FormArray;
    imageUrls.removeAt(index);
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: ICategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.previewUrls = [];

    for (let file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  get imageUrls() {
    return this.productForm.get('image_urls') as FormArray;
  }

  doAction(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.productService.createProduct(productData).subscribe(
        (response) => {
          console.log('Server response:', response);
          this.dialogRef.close({ event: 'Add', data: response });
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
