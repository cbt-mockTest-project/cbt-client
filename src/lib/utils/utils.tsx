import { clearIcon, triangleIcon } from '../constants/index';
import { QuestionState } from '../../types';
import { circleIcon } from '@lib/constants';
import { checkboxOption } from 'customTypes';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { message } from 'antd';
import { initializeApollo } from '@modules/apollo';
import { PUSH_TO_TELEGRAM } from '@lib/graphql/user/query/telegramQuery';

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
    const apolloClient = initializeApollo({}, '');
    const sendErrorToTelegram = (message: string) =>
      apolloClient.mutate({
        mutation: PUSH_TO_TELEGRAM,
        variables: {
          input: {
            message,
          },
        },
      });
    try {
      return await callback();
    } catch (error: any) {
      if (error?.message === 'Forbidden resource') {
        return message.error({ content: '로그인이 필요합니다' });
      }
      let telegramMessage: string;
      if (error instanceof TypeError) {
        telegramMessage = `
            name: typeError
            message: 모두CBT ${error?.message}
            pathname: ${typeof window !== 'undefined' ? window.location : ''}
            userAgent: ${
              typeof window !== 'undefined' ? window.navigator.userAgent : ''
            }
        `;
      } else {
        telegramMessage = `
          name: ${
            !!error?.response?.status ? 'API Call Error' : 'Unknwon Error'
          }
          message: 모두CBT ${
            error?.response?.data ||
            error?.response?.message ||
            error?.message ||
            error
          }
          __uri:${error?.response?.config?.url}
          __status:${error?.response?.status}
          pathname: ${typeof window !== 'undefined' ? window.location : ''}
          userAgent: ${
            typeof window !== 'undefined' ? window.navigator.userAgent : ''
          }
        `;
      }
      sendErrorToTelegram(telegramMessage);
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
  if (splited.length === 3) {
    return splited[0] + ' ' + splited[1] + ' ' + splited[2];
  }
  return splited[0] + ' ' + splited.at(-1);
};

export const removeHtmlTag = (String: string) =>
  String.replace(/<[^>]*>?/g, '');
