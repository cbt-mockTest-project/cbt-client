import { QuestionState } from 'types';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';

export const STUDY_STATE_ICON = {
  [QuestionState.High]: <PanoramaFishEyeIcon />,
  [QuestionState.Row]: <ClearIcon />,
  [QuestionState.Core]: '',
  [QuestionState.Middle]: '',
};
