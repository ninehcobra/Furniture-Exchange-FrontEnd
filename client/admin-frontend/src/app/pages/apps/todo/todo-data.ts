import { ToDo } from './todo';

export const todos: ToDo[] = [
  {
    id: 1,
    message: 'Bàn làm việc',
    completionStatus: true,
    edit: false,
    date: new Date('10-10-2024'),
  },
  {
    id: 2,
    message: 'Giường 2 tầng ',
    completionStatus: false,
    edit: false,
    date: new Date('10-10-2024'),
  },
  {
    id: 3,
    message: 'Bàn ăn',
    completionStatus: true,
    edit: false,
    date: new Date('10-10-2024'),
  },
  {
    id: 4,
    message: 'Giường 2 tầng',
    completionStatus: false,
    edit: false,
    date: new Date('10-12-2024'),
  },
  {
    id: 5,
    message: 'Rèm cửa sổ',
    completionStatus: false,
    edit: false,
    date: new Date('10-10-2024'),
  },
];
