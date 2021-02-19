var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { Animated, StyleSheet, } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
var Value = styled.Text(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  transform: rotate(45deg);\n"], ["\n  transform: rotate(45deg);\n"])));
var Label = function (_a) {
    var testID = _a.testID, percentValue = _a.percentValue, value = _a.value, _b = _a.size, size = _b === void 0 ? 32 : _b, style = _a.style, textStyle = _a.textStyle;
    return (<Animated.View testID={testID} style={[
        __assign({ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderTopRightRadius: size / 2, borderTopLeftRadius: size / 2, borderBottomRightRadius: size / 2, backgroundColor: '#4163f4', transform: [
                { rotate: '-45deg' },
                { translateX: -((Math.sqrt(2) * size) / 2) },
            ], top: -size * 2, left: percentValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
            }) }, StyleSheet.flatten(style)),
    ]}>
      <Value style={__assign({ color: 'white' }, StyleSheet.flatten(textStyle))}>
        {value}
      </Value>
    </Animated.View>);
};
export default Label;
var templateObject_1;
