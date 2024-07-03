import { theme } from 'antd';
import { AliasToken } from 'antd/lib/theme/interface';

export interface CustomToken {
  colorErrorBase: string;
  colorSuccessBase: string;
  colorSemiTransparentBg: string;
  colorRedTagBg: string;
  colorPrimaryBase: string;
  colorDisabled: string;
  colorNeutral06: string;
}

export interface TokenKeys extends AliasToken, CustomToken {}

export interface CustomDefaultTheme {
  color: (token: keyof TokenKeys) => string;
}

const customTokens: Record<'light' | 'dark', CustomToken> = {
  light: {
    colorErrorBase: '#FF4D4F',
    colorSuccessBase: '#52C41A',
    colorPrimaryBase: '#1668DC',
    colorSemiTransparentBg: '#00000080',
    colorRedTagBg: '#fac8c3',
    colorDisabled: '#272727',
    colorNeutral06: '#BFBFBF',
  },
  dark: {
    colorErrorBase: '#E84749',
    colorSuccessBase: '#49AA19',
    colorPrimaryBase: '#1668DC',
    colorSemiTransparentBg: '#00000080',
    colorRedTagBg: '#fac8c3',
    colorDisabled: '#272727',
    colorNeutral06: '#BFBFBF',
  },
};

export const themes: Record<'light' | 'dark', CustomDefaultTheme> = {
  light: {
    color: (token: keyof TokenKeys) => {
      const tokens = {
        ...theme.getDesignToken({ algorithm: theme.defaultAlgorithm }),
        ...customTokens.light,
      };
      return tokens[token] as string;
    },
  },
  dark: {
    color: (token: keyof TokenKeys) => {
      const tokens = {
        ...theme.getDesignToken({ algorithm: theme.darkAlgorithm }),
        ...customTokens.dark,
      };
      return tokens[token] as string;
    },
  },
};
