import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { IUser } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  user: Observable<IUser | null>;

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  public selectedLanguage: any = {
    language: 'Tiếng Việt',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/vietnam.png',
  };

  public languages: any[] = [
    {
      language: 'Tiếng Việt',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/vietnam.png',
    },
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];

  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    translate.setDefaultLang('en');
    this.user = this.userService.user$;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  logout() {
    this.router.navigate(['/authentication/side-login']);
    this.authService.logout();
  }

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman đã tham gia đội ngũ!',
      subtitle: 'Hãy chúc mừng anh ấy',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'Đã nhận được tin nhắn mới',
      subtitle: 'Salma đã gửi cho bạn một tin nhắn mới',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'Đã nhận được khoản thanh toán mới',
      subtitle: 'Kiểm tra thu nhập của bạn',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly đã hoàn thành các nhiệm vụ',
      subtitle: 'Giao cho cô ấy nhiệm vụ mới',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman đã tham gia đội ngũ!',
      subtitle: 'Hãy chúc mừng anh ấy',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'Tài khoản của tôi',
      subtitle: 'Cài đặt tài khoản của bạn',
      link: '/',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'Tin nhắn',
      subtitle: 'Tin nhắn',
      link: '/apps/chat',
    },
  ];

  apps: apps[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-dd-chat.svg',
      title: 'Tin nhắn',
      subtitle: 'Tin nhắn',
      link: '/apps/chat',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-dd-cart.svg',
      title: 'Cửa hàng',
      subtitle: 'Quản lý cửa hàng',
      link: '/store/management',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-dd-invoice.svg',
      title: 'Thống kê',
      subtitle: 'Thống kê cửa hàng',
      link: '/dashboard/dashborad1',
    },
    {
      id: 6,
      img: '/assets/images/svgs/icon-dd-lifebuoy.svg',
      title: 'Giao hàng',
      subtitle: 'Quản lý giao hàng',
      link: '/apps/todo',
    },
  ];

  quicklinks: quicklinks[] = [];
}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    TablerIconsModule,
    FormsModule,
    NgForOf,
  ],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}
