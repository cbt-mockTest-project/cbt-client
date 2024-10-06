import { App, ConfigProvider, theme } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { CustomStyleProvider } from './CustomStyleProvider';
import useThemeControl from '@lib/hooks/useThemeControl';
import { ThemeValue } from 'customTypes';
import { themes } from './themes';
import {
  EXAMS_PDF_PAGE,
  EXAM_CREATE_PAGE,
  EXAM_PDF_PAGE,
  EXAM_SOLUTION_PAGE,
  QUESTION_EDIT_PAGE,
} from '@lib/constants/displayName';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  displayName: string;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
  displayName,
}) => {
  const isOnlyLightMode = isOnlyLightModePage.includes(String(displayName));

  const { theme: mode, setTheme } = useThemeControl();

  useEffect(() => {
    if (['light', 'dark'].includes(getCookie('theme') as ThemeValue)) {
      setTheme(getCookie('theme') as ThemeValue);
    }
  }, []);

  return (
    <ThemeProvider theme={isOnlyLightMode ? themes.light : themes[mode]}>
      <App className="theme-provider-wrapper">
        <CustomStyleProvider mode={mode}>
          <ConfigProvider
            theme={{
              algorithm: isOnlyLightMode
                ? theme.defaultAlgorithm
                : mode === 'light'
                ? theme.defaultAlgorithm
                : theme.darkAlgorithm,
            }}
          >
            {children}
          </ConfigProvider>
        </CustomStyleProvider>
      </App>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;

const isOnlyLightModePage = [
  EXAM_SOLUTION_PAGE,
  EXAM_CREATE_PAGE,
  QUESTION_EDIT_PAGE,
  EXAM_PDF_PAGE,
  EXAMS_PDF_PAGE,
];
