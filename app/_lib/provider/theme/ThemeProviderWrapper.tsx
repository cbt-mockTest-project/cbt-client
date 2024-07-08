import { App, ConfigProvider, theme } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { CustomStyleProvider } from './CustomStyleProvider';
import useThemeControl from '../../hooks/useThemeControl';
import { ThemeValue } from '../../../customTypes';
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
    setTheme((getCookie('theme') as ThemeValue) || 'light');
  }, [mode]);

  return (
    <ThemeProvider theme={isOnlyLightMode ? themes.light : themes[mode]}>
      <ConfigProvider
        theme={{
          algorithm: isOnlyLightMode
            ? theme.defaultAlgorithm
            : mode === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        }}
      >
        <App className="theme-provider-wrapper">
          <CustomStyleProvider mode={mode}>{children}</CustomStyleProvider>
        </App>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
