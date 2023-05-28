import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { fetchClientIp } from '@lib/apis/fetch-client-ip';
import { circleIcon } from '@lib/constants';
import { PUSH_TO_TELEGRAM } from '@lib/graphql/user/query/telegramQuery';
import { initializeApollo } from '@modules/apollo';
import * as Sentry from '@sentry/nextjs';
import { message } from 'antd';
import { checkboxOption } from 'customTypes';
import { QuestionState, User } from '../../types';
import { clearIcon, triangleIcon } from '../constants/index';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';

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

interface PushErrorLogToSentryArgs {
  level: Sentry.SeverityLevel;
  message: string;
}

export const pushErrorLogToSentry = ({
  message,
  level,
}: PushErrorLogToSentryArgs) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, level);
  } else {
    console.log(message);
  }
};

export const handleError = async (error: any) => {
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
  if (error?.message === 'Forbidden resource') {
    return message.error({ content: '로그인이 필요합니다' });
  }

  if (
    typeof window !== 'undefined' &&
    window.navigator.userAgent.includes('Googlebot')
  ) {
    return;
  }
  const clientIp = !isServer() ? await fetchClientIp() : 'server';
  const telegramMessage = `[Client Error]\nMessage: ${
    error?.response?.data ||
    error?.response?.message ||
    error?.message ||
    error ||
    ''
  }\nCurrentPagePath: ${
    typeof window !== 'undefined' ? window.location : ''
  }\nUserAgent: ${
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
  }\nIP:${clientIp}
      `;
  sendErrorToTelegram(telegramMessage);
  pushErrorLogToSentry({ message: telegramMessage, level: 'error' });
};

interface CheckUrlArgs {
  url: string;
  allowUrls: string[];
  reverse?: boolean;
}

export const someIncludes = (arr: string[], target: string) =>
  arr.some((el) => target.startsWith(el));

export const checkUrl = ({ url, allowUrls, reverse }: CheckUrlArgs) =>
  reverse
    ? !allowUrls.some((allowUrl) => url.startsWith(allowUrl))
    : allowUrls.some((allowUrl) => url.startsWith(allowUrl));

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

export const convertExamTitle = (title: string) => {
  const splited = title.split('-');
  if (splited.length === 3) {
    return splited[0] + ' ' + splited[1] + ' ' + splited[2];
  }
  if (splited.length === 2) {
    return splited[0] + ' ' + splited[1];
  }
  return title;
};

export const removeHtmlTag = (String: string) =>
  String.replace(/<[^>]*>?/g, '');

export const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const removeWhiteSpace = (string: string) => string.replace(/\s/g, '');

export const checkAdblock = (): boolean => {
  if (isServer()) {
    return false;
  }
  const adsbygoogle = document.querySelector('ins.adsbygoogle');
  if (!adsbygoogle) {
    return true;
  }
  return false;
};

export const isScriptLoaded = (url: string): boolean => {
  const scripts = document.getElementsByTagName('script');
  for (const script of scripts) {
    if (script.src === url) {
      return true;
    }
  }
  return false;
};

interface LoadScriptArgs {
  url: string;
  type: string;
}

export const loadScript = ({ url, type }: LoadScriptArgs): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded(url)) {
      console.warn(`Script "${url}" is already loaded.`);
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.type = type;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

export const makeMoneyString = (money: number) =>
  String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

interface CheckRoleParams {
  roleIds: number[];
  meQuery?: MeQuery;
  user?: User;
}
/**
 * roleId List
 * 1 : Basic - 광고제거, 무제한 랜덤모의고사
 * 2 : SafePremium - 산업안전기사 프리미엄
 * 3 : FreeTrial - 무료체험
 */

export const checkRole = ({ roleIds, meQuery, user }: CheckRoleParams) => {
  if (!meQuery && !user) {
    return false;
  }
  const currentUser = meQuery?.me.user || user;
  return currentUser?.userRoles.some((userRole) =>
    roleIds.includes(userRole.role.id)
  );
};

export const deduplication = (array: any[]) => {
  const stack = [];
  for (const el of array) {
    const a = stack.findIndex(
      (stack_el) => JSON.stringify(stack_el) === JSON.stringify(el)
    );
    if (a === -1) {
      stack.push(el);
    }
  }
  return stack;
};
