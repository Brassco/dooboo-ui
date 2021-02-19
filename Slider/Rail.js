var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components/native';
var DEFAULT = {
    height: 3,
    borderRadius: 1,
};
var StyledRail = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: ", ";\n  border-radius: ", "px;\n  background-color: #bcdbfb;\n"], ["\n  width: 100%;\n  height: ", ";\n  border-radius: ", "px;\n  background-color: #bcdbfb;\n"])), DEFAULT.height + "px", DEFAULT.borderRadius);
var Rail = function (_a) {
    var testID = _a.testID, style = _a.style;
    return <StyledRail testID={testID} style={style}/>;
};
export default Rail;
var templateObject_1;
