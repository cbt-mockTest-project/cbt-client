import { PostOrderType } from 'types';

export interface UploadFile {
  name: string;
  url: string;
  page: number;
}

export interface OrderOption {
  value: PostOrderType;
  label: string;
}

export interface ReadDataListQuery {
  page: number;
  order: PostOrderType;
  search: string;
}
