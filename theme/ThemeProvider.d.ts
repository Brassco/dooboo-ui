import { DefaultTheme, withTheme } from 'styled-components/native';
import React from 'react';
import { ThemeParam, ThemeType } from './index';
import type { Colors } from './index';
interface Context {
    themeType: ThemeType;
    media: {
        isDesktop: boolean;
        isTablet: boolean;
        isMobile: boolean;
    };
    theme: DefaultTheme;
    changeThemeType: () => void;
    colors: Colors;
}
declare const useCtx: () => Context;
interface Props {
    children?: React.ReactElement;
    initialThemeType?: ThemeType;
    customTheme?: ThemeParam;
}
declare function ThemeProvider({ children, initialThemeType, customTheme, }: Props): React.ReactElement;
export { useCtx as useTheme, ThemeProvider, ThemeType, withTheme };
