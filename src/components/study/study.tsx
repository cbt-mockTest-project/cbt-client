import { QuestionState } from 'types';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

export const STUDY_STATE_ICON = {
  [QuestionState.High]: <PanoramaFishEyeIcon />,
  [QuestionState.Row]: <ClearIcon />,
  [QuestionState.Core]: '',
  [QuestionState.Middle]: <ChangeHistoryIcon />,
};
