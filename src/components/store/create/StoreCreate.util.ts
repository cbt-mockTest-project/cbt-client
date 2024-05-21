import { DeepPartial } from '@apollo/client/utilities';
import { removeHtmlTag } from '@lib/utils/utils';
import { CreateItemInput } from 'types';

export const validateStoreCreateForm = (
  data: DeepPartial<CreateItemInput>,
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
      return '가격은 0원 또는 1000원 이상으로 입력해주세요.';
    }
    return null;
  }
  if (key === 'file') {
    if (!data.file) {
      return '파일을 업로드해주세요.';
    }
    return null;
  }
  if (key === 'description') {
    if (removeHtmlTag(data.description).length < 10) {
      return '자료소개는 10글자 이상 입력해주세요.';
    }
    return null;
  }
  if (key === 'contents') {
    if (removeHtmlTag(data.contents).length < 10) {
      return '목차는 10글자 이상 입력해주세요.';
    }
    return null;
  }
};
