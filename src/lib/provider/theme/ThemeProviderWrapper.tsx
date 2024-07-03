import { App, ConfigProvider, theme } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { CustomStyleProvider } from './CustomStyleProvider';
import useThemeControl from '@lib/hooks/useThemeControl';
import { ThemeValue } from 'customTypes';
import { themes } from './themes';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  isLightModePageList: boolean;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
  isLightModePageList,
}) => {
  const { theme: mode, setTheme } = useThemeControl();
  useEffect(() => {
    setTheme((getCookie('theme') as ThemeValue) || 'light');
  }, [mode]);

  return (
    <ThemeProvider theme={themes[mode]}>
      <ConfigProvider
        theme={{
          algorithm:
            mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <App className="theme-provider-wrapper">
          <CustomStyleProvider theme={mode}>{children}</CustomStyleProvider>
        </App>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
