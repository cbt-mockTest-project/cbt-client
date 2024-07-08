import { coreActions } from '../../_modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '../../_modules/redux/store/configureStore';
import { setCookie } from 'cookies-next';
import { ThemeValue } from '../../customTypes';

const useThemeControl = () => {
  const theme = useAppSelector((state) => state.core.theme);
  const dispatch = useAppDispatch();

  const setTheme = (currentTheme: ThemeValue) => {
    setCookie('theme', currentTheme);
    if (theme === currentTheme) return;
    dispatch(coreActions.setTheme(currentTheme));
  };

  return { theme, setTheme };
};

export default useThemeControl;
