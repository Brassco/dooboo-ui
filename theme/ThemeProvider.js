var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ThemeProvider as OriginalThemeProvider, withTheme, } from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { ThemeType, colors, dark, light } from './index';
import { Appearance } from 'react-native';
import createCtx from './createCtx';
import { useMediaQuery } from 'react-responsive';
var _a = createCtx(), useCtx = _a[0], Provider = _a[1];
function ThemeProvider(_a) {
    var children = _a.children, initialThemeType = _a.initialThemeType, customTheme = _a.customTheme;
    var isMobile = useMediaQuery({ maxWidth: 767 });
    var isTablet = useMediaQuery({ minWidth: 767, maxWidth: 992 });
    var isDesktop = useMediaQuery({ minWidth: 992 });
    var _b = useState(initialThemeType || ThemeType.LIGHT), themeType = _b[0], setThemeType = _b[1];
    useEffect(function () {
        var listener = function (_a) {
            var colorScheme = _a.colorScheme;
            setThemeType(colorScheme === 'light' ? ThemeType.LIGHT : ThemeType.DARK);
        };
        Appearance.addChangeListener(listener);
        return function cleanup() {
            Appearance.removeChangeListener(listener);
        };
    }, []);
    var changeThemeType = function () {
        var newThemeType = themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
        setThemeType(newThemeType);
    };
    var defaultTheme = themeType === ThemeType.DARK
        ? __assign(__assign({}, dark), customTheme === null || customTheme === void 0 ? void 0 : customTheme.dark) : __assign(__assign({}, light), customTheme === null || customTheme === void 0 ? void 0 : customTheme.light);
    var media = {
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: isDesktop,
    };
    var theme = __assign(__assign({}, defaultTheme), media);
    return (<Provider value={{
        media: media,
        themeType: themeType,
        changeThemeType: changeThemeType,
        theme: defaultTheme,
        colors: colors,
    }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>);
}
export { useCtx as useTheme, ThemeProvider, ThemeType, withTheme };
