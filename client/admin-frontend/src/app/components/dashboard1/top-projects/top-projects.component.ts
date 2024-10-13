import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Hòng Lâm',
    position: 'Bàn ghế, giường,...',
    productName: 'Bàn học sinh viên',
    budget: 32.9,
    priority: 'critical',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Vua đồ cũ',
    position: 'Đồ nội thất cũ',
    productName: 'Giường tầng',
    budget: 24.5,
    priority: 'high',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Bé hàng rong',
    position: 'Bán đồ decor',
    productName: 'Rèm cửa sổ',
    budget: 12.8,
    priority: 'medium',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Bán đồ dạo',
    position: 'Bán đồ dạo',
    productName: 'Ghế sofa',
    budget: 2.4,
    priority: 'low',
  },
];

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-top-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './top-projects.component.html',
})
export class AppTopProjectsComponent {
  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'mar', viewValue: '9/2024' },
    { value: 'apr', viewValue: '10/2024' },
    { value: 'june', viewValue: '11/2024' },
  ];
}
