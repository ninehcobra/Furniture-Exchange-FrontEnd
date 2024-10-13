import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Trang chủ',
  },
  {
    displayName: 'Thống kê',
    iconName: 'point',
    route: 'dashboards/dashboard1',
  },
  {
    displayName: 'Cửa hàng',
    iconName: 'point',
    route: '/store/management',
  },
  {
    displayName: 'Tin nhắn',
    iconName: 'point',
    route: 'apps/chat',
  },
  {
    displayName: 'Quản lý giao hàng',
    iconName: 'point',
    route: 'apps/todo',
  },
];
