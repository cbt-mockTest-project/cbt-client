import { clearIcon, triangleIcon } from '../constants/index';
import { QuestionState } from '../../types';
import { circleIcon } from '@lib/constants';
import { checkboxOption } from 'customTypes';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { message } from 'antd';

export const isServer = () => typeof window === 'undefined';
export const convertStateToIcon = (
  state: QuestionState
): checkboxOption['label'] => {
  switch (state) {
    case QuestionState.High:
      return circleIcon;
    case QuestionState.Middle:
      return triangleIcon;
    case QuestionState.Row:
      return clearIcon;
    default:
      return '';
  }
};

interface ConvertWithErrorHandlingFuncParams<
  T extends (...args: any[]) => ReturnType<T>
> {
  callback: T | ((...args: any[]) => ReturnType<T>);
  errorCallback?: (...args: any[]) => ReturnType<T>;
}

declare type ConvertWithErrorHandlingFunc = <
  T extends (...args: any[]) => ReturnType<T>
>({
  callback,
  errorCallback,
}: ConvertWithErrorHandlingFuncParams<T>) => () => Promise<
  ReturnType<T> | undefined
>;

export const convertWithErrorHandlingFunc: ConvertWithErrorHandlingFunc =
  ({ callback, errorCallback }) =>
  async () => {
    try {
      return await callback();
    } catch (error: any) {
      if (error.message === 'Forbidden resource') {
        message.error({ content: '로그인이 필요합니다' });
      }
      if (errorCallback) {
        return await errorCallback(error);
      }
    }
  };

export const ellipsisText = (string: string, count: number) =>
  string.slice(0, count) + '...';

export const extractKeysOfCache = (
  client: ApolloClient<NormalizedCacheObject>,
  commonKey: string
) => Object.keys(client.extract()).filter((el) => el.includes(commonKey));

export const extractCache = (
  client: ApolloClient<NormalizedCacheObject>,
  key: string
) => client.extract()[key];

export const convertExamTurn = (title: string) => {
  const splited = title.split('-');
  return splited[0] + '-' + splited.at(-1);
};

export const convertExamTitle = (title: string) => {
  const splited = title.split('-');
  return splited[0] + ' ' + splited[1] + '실기' + ' ' + splited[2];
};
