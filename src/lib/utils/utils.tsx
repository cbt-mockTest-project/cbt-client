import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { circleIcon } from '@lib/constants';
import { message } from 'antd';
import { checkboxOption } from 'customTypes';
import { QuestionState, User } from '../../types';
import { clearIcon, triangleIcon } from '../constants/index';
import { MeQuery } from '@lib/graphql/query/userQuery.generated';
import { cloneDeep } from 'lodash';
import { format } from 'date-fns';
import {
  EHS_AIR_EXAM_IDS,
  EHS_CONSTRUCTION_EXAM_IDS,
  EHS_DANGEROUS_EXAM_IDS,
  EHS_SAFE_EXAM_IDS,
  EHS_SAFE_INDUSTRIAL_EXAM_IDS,
} from '@lib/constants/ehsMaster';
import { ko } from 'date-fns/locale';

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

export const handleError = async (error: any) => {
  if (error?.message === 'Forbidden resource') {
    return message.error({ content: '로그인이 필요합니다' });
  }

  if (
    typeof window !== 'undefined' &&
    window.navigator.userAgent.includes('Googlebot')
  ) {
    return;
  }
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
  for (const script of scripts as any) {
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

export const swapArray = <T,>(
  array: T[],
  currentIndex: number,
  afterIndex: number
) => {
  const newArray = cloneDeep(array);
  const temp = newArray[currentIndex];
  newArray[currentIndex] = newArray[afterIndex];
  newArray[afterIndex] = temp;
  return newArray;
};

export const removeTypeNameFromObjectArray = <T,>(array: Array<T>) => {
  return array.map((el) => {
    const { __typename, ...rest } = el as any;
    return rest;
  });
};

export const convertToKST = (
  dateString: string,
  formatString: string = 'yy.MM.dd HH:mm'
) => {
  let date = new Date(new Date(dateString).getTime());
  return format(date, formatString, { locale: ko });
};

export const reomveImgTag = (htmlString: string) => {
  // DOMParser를 사용하여 문자열을 DOM 객체로 변환
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlString, 'text/html');

  // <img> 태그를 모두 선택
  let imgTags = doc.querySelectorAll('img');

  // 각 <img> 태그를 순회하며 DOM에서 제거
  imgTags.forEach((img) => img.remove());

  // 변경된 HTML을 문자열로 반환
  return doc.body.innerHTML;
};

export const replaceSpaceSlashAndSpecialCharsToHyphen = (string: string) => {
  return string.replace(/[ \/\\.,!?@#$%^&*_+={};:'"<>|`~]/g, '-');
};

export const linkify = (text: string) => {
  const urlRegex =
    /(\bhttps?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          href={part}
          key={index}
          style={{
            color: '#2595ff',
            textDecoration: 'underline',
          }}
          target="_blank"
          rel="noreferrer"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const checkIsEhsMasterExam = (examIds: number[]) => {
  return examIds.some((examId) => {
    return [
      ...EHS_AIR_EXAM_IDS,
      ...EHS_CONSTRUCTION_EXAM_IDS,
      ...EHS_DANGEROUS_EXAM_IDS,
      ...EHS_SAFE_EXAM_IDS,
      ...EHS_SAFE_INDUSTRIAL_EXAM_IDS,
    ].includes(examId);
  });
};
