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
    } catch (error) {
      console.log(error);
      if (errorCallback) {
        return await errorCallback();
      }
    }
  };
