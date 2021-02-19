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
export var ThemeType;
(function (ThemeType) {
    ThemeType["LIGHT"] = "LIGHT";
    ThemeType["DARK"] = "DARK";
})(ThemeType || (ThemeType = {}));
export var colors = {
    helioTrope: '#9A77FF',
    mauve: '#cfa7ff',
    fuchsiaBlue: '#664acb',
    eastBay: '#3d3f77',
    scampi: '#6b6aa6',
    downRiver: '#0c194b',
    magicMint: '#a5f4cc',
    babyBlue: '#d8ffff',
    deYork: '#74c19b',
    aquaMarine: '#44D1A6',
    salmon: '#FF7676',
    charcoalGray: '#48454D',
    brownGray: '#999999',
    white: '#FFFFFF',
    black: '#000000',
    darkGray: '#00000070',
    mediumGray: '#00000050',
    lightGray: '#CFCED0',
    paleViolet: '#F2F2F2',
    mineShaftDark: '#222222',
    mineShaft: '#333333',
    light: '#F3F3F3',
    negative: '#ff7676',
    apple: '#151E22',
    google: '#E04238',
    facebook: '#345997',
    success: '#00BA90',
};
export var light = {
    background: colors.white,
    primary: colors.helioTrope,
    primaryLight: colors.mauve,
    primaryDark: colors.fuchsiaBlue,
    secondary: colors.eastBay,
    secondaryLight: colors.scampi,
    secondaryDark: colors.downRiver,
    tertiary: colors.downRiver,
    tertiaryLight: colors.magicMint,
    tertiaryDark: colors.babyBlue,
    positive: colors.aquaMarine,
    negative: colors.salmon,
    text: colors.mineShaftDark,
    primaryText: colors.charcoalGray,
    secondaryText: colors.brownGray,
    contrastBackground: colors.darkGray,
    contrastText: colors.white,
    dialog: colors.lightGray,
    disabled: colors.mediumGray,
    disabledText: colors.light,
    placeholder: colors.lightGray,
    paper: colors.paleViolet,
    appleIcon: colors.apple,
    appleText: colors.apple,
    appleBackground: colors.light,
    facebookIcon: colors.light,
    facebookText: colors.light,
    facebookBackground: colors.facebook,
    googleIcon: colors.light,
    googleText: colors.light,
    googleBackground: colors.google,
};
export var dark = {
    background: colors.mineShaftDark,
    primary: colors.helioTrope,
    primaryLight: colors.fuchsiaBlue,
    primaryDark: colors.mauve,
    secondary: colors.downRiver,
    secondaryLight: colors.scampi,
    secondaryDark: colors.eastBay,
    tertiary: colors.downRiver,
    tertiaryLight: colors.babyBlue,
    tertiaryDark: colors.magicMint,
    positive: colors.aquaMarine,
    negative: colors.salmon,
    text: colors.white,
    primaryText: colors.white,
    secondaryText: colors.brownGray,
    contrastBackground: colors.white,
    contrastText: colors.mineShaftDark,
    dialog: colors.lightGray,
    disabled: colors.lightGray,
    disabledText: colors.mediumGray,
    placeholder: colors.lightGray,
    paper: colors.mineShaft,
    appleIcon: colors.apple,
    appleText: colors.apple,
    appleBackground: colors.light,
    facebookIcon: colors.light,
    facebookText: colors.light,
    facebookBackground: colors.facebook,
    googleIcon: colors.light,
    googleText: colors.light,
    googleBackground: colors.google,
};
export var theme = {
    light: light,
    dark: dark,
};
export var createDoobooTheme = function (_a) {
    var type = _a.type, themes = _a.themes;
    switch (type) {
        case ThemeType.DARK:
            return __assign(__assign({}, theme.dark), themes === null || themes === void 0 ? void 0 : themes.dark);
        case ThemeType.LIGHT:
        default:
            return __assign(__assign({}, theme.light), themes === null || themes === void 0 ? void 0 : themes.light);
    }
};
export { ThemeProvider, useTheme, withTheme } from './ThemeProvider';
