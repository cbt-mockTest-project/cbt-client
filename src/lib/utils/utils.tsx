import ClearIcon from '@mui/icons-material/Clear';
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
