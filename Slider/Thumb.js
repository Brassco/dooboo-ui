var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Animated } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
var ThumbPositioner = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  left: ", ";\n"], ["\n  position: absolute;\n  left: ", ";\n"])), function (_a) {
    var percent = _a.percent;
    return percent + "%";
});
var StyledThumb = styled.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 12px;\n  height: 12px;\n  background-color: #0b21e8;\n  border-radius: 6px;\n  transform: translate(-6px);\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 12px;\n  height: 12px;\n  background-color: #0b21e8;\n  border-radius: 6px;\n  transform: translate(-6px);\n"])));
var Thumb = function (_a) {
    var testID = _a.testID, percent = _a.percent, _b = _a.size, size = _b === void 0 ? 12 : _b, _c = _a.scaleValue, scaleValue = _c === void 0 ? new Animated.Value(0.01) : _c, _d = _a.opacityValue, opacityValue = _d === void 0 ? new Animated.Value(0.12) : _d, customThumb = _a.customThumb, style = _a.style;
    var rippleSize = (size - 2) * 2 + 48 / size;
    return (<ThumbPositioner testID="thumb-positioner-test-id" percent={percent}>
      {customThumb || (<StyledThumb testID={testID} style={style}>
          <Animated.View testID="thumb-animated" style={{
        width: rippleSize,
        height: rippleSize,
        borderRadius: 100,
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
        backgroundColor: '#0b21e8',
    }}/>
        </StyledThumb>)}
    </ThumbPositioner>);
};
export default Thumb;
var templateObject_1, templateObject_2;
