import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Trang chủ',
  },
  {
    displayName: 'Thống kê',
    iconName: 'aperture',
    route: 'dashboards/dashboard1',
  },
  {
    displayName: 'Cửa hàng',
    iconName: 'shopping-cart',
    route: '/store/management',
  },
  {
    displayName: 'Tin nhắn',
    iconName: 'message-2',
    route: 'apps/chat',
  },
  {
    displayName: 'Quản lý giao hàng',
    iconName: 'truck',
    route: 'apps/todo',
  },
];
