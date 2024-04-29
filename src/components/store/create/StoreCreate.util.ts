import { CreateItemInput } from 'types';

export const validateStoreCreateForm = (
  data: Partial<CreateItemInput>,
  key: keyof CreateItemInput
) => {
  if (key === 'title') {
    if (data.title.length < 3) {
      return '제목은 3글자 이상이어야 합니다.';
    }
    if (data.title.length > 30) {
      return '제목은 30자 이하로 입력해주세요.';
    }
    return null;
  }
  if (key === 'price') {
    if (data.price === 0) {
      return null;
    }
    if (data.price < 0) {
      return '가격은 0보다 작을 수 없습니다.';
    }
    if (data.price < 1000) {
      return '판매가격은 1000원 이상이어야 합니다.';
    }
    return null;
  }
};
