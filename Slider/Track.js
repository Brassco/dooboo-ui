var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components/native';
var DEFAULT = {
    height: 3,
};
var StyledTrack = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: ", ";\n  height: ", "px;\n  background-color: #0b21e8;\n"], ["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: ", ";\n  height: ", "px;\n  background-color: #0b21e8;\n"])), function (_a) {
    var width = _a.width;
    return width + "%";
}, DEFAULT.height);
var Track = function (_a) {
    var testID = _a.testID, style = _a.style, percent = _a.percent;
    return <StyledTrack testID={testID} style={style} width={percent}/>;
};
export default Track;
var templateObject_1;
