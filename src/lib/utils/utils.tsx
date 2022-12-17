import { clearIcon, triangleIcon } from '../constants/index';
import { QuestionState } from '../../types';
import { circleIcon } from '@lib/constants';
import { checkboxOption } from 'customTypes';

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
      return clearIcon;
  }
};

interface tryCatchHandlerParams<T, K> {
  callback: Function;
  params?: T;
  errorCallback?: Function;
  errorCallbackParams?: K;
}

export const tryCatchHandler = async <T = unknown, K = unknown>({
  callback,
  params,
  errorCallback,
  errorCallbackParams,
}: tryCatchHandlerParams<T, K>) => {
  try {
    params ? await callback(params) : await callback();
  } catch (error) {
    console.log('error', error);
    if (errorCallback) {
      errorCallbackParams
        ? await errorCallback(errorCallbackParams)
        : await errorCallback();
    }
  }
};
