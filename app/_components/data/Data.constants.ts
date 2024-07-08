import { PostOrderType } from '../../types';
import { OrderOption } from './Data.type';

export const DATA_ORDER_OPTIONS: OrderOption[] = [
  { value: PostOrderType.CreatedAt, label: '최신순' },
  { value: PostOrderType.Like, label: '인기순' },
];
