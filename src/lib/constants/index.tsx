import CircleIcon from '@mui/icons-material/Circle';
import TriangleIcon from '@assets/svg/triangle_fill.svg';
import ClearIcon from '@mui/icons-material/Clear';

export const circleIcon = (
  <CircleIcon className="circle-icon" style={{ width: '110%' }} />
);
export const triangleIcon = (
  <TriangleIcon viewBox="0 0 16 16" className="triangle-icon" />
);
export const clearIcon = (
  <ClearIcon className="clear-icon" style={{ width: '180%' }} />
);

/**
 * 로컬스토리지 답안 임시저장 key
 */
export const tempAnswerKey = 'tempAnswerKey';

export const loginModal = 'loginModal';

export const widhDrawalModal = 'widhDrawalModal';

export const selectExamCategoryHistory = 'selectExamCategoryHistory';

export const selectExamHistory = 'selectExamHistory';
