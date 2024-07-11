import { App, ConfigProvider, theme } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { CustomStyleProvider } from './CustomStyleProvider';
import useThemeControl from '@lib/hooks/useThemeControl';
import { ThemeValue } from 'customTypes';
import { themes } from './themes';

interface ThemeProviderWrapperProps {
  isOnlyLightMode: boolean;
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
  isOnlyLightMode,
}) => {
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
