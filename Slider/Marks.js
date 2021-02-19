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
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import styled from 'styled-components/native';
var DEFAULT = {
    width: 3,
    height: 3,
};
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  position: absolute;\n"], ["\n  display: flex;\n  justify-content: center;\n  position: absolute;\n"])));
var MarkPositioner = styled.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  display: flex;\n  align-items: center;\n  width: ", "px;\n  left: ", "px;\n"], ["\n  position: absolute;\n  display: flex;\n  align-items: center;\n  width: ", "px;\n  left: ", "px;\n"])), function (_a) {
    var width = _a.width;
    return width;
}, function (_a) {
    var position = _a.position;
    return position;
});
var Mark = styled.View(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n  background-color: #4163f4;\n"], ["\n  width: ", "px;\n  height: ", "px;\n  background-color: #4163f4;\n"])), DEFAULT.width, DEFAULT.height);
// Checks if null or undefined. temporary until using othe library like 'lodash'.
var isNil = function (value) { return value == null; };
var getMarkCountByStep = function (_a) {
    var step = _a.step, startMark = _a.startMark, endMark = _a.endMark, minValue = _a.minValue, maxValue = _a.maxValue;
    var count = Math.floor((maxValue - minValue) / step);
    var countToApply = count <= 0 ? 2 : count + 1;
    return countToApply - (startMark ? 0 : 1) - (endMark ? 0 : 1);
};
var getStepByMarkCount = function (_a) {
    var railWidth = _a.railWidth, count = _a.count, startMark = _a.startMark, endMark = _a.endMark;
    var step = railWidth / count;
    if (startMark && endMark)
        return railWidth / (count - 1);
    if (!startMark && !endMark)
        return (railWidth - step) / count;
    return (railWidth - step) / (count - 1);
};
var getStepDistanceByMarkCount = function (_a) {
    var railWidth = _a.railWidth, markWidth = _a.markWidth, startMark = _a.startMark, endMark = _a.endMark, count = _a.count;
    var getStepFineTunedStepByMark = function (_a) {
        var currentMarkWidth = _a.markWidth, markCount = _a.markCount, step = _a.step;
        var fineTunerToFitMark = currentMarkWidth / markCount;
        return step - fineTunerToFitMark;
    };
    var stepToApply = getStepByMarkCount({
        railWidth: railWidth,
        count: count,
        startMark: startMark,
        endMark: endMark,
    });
    return getStepFineTunedStepByMark({
        markWidth: markWidth,
        markCount: count,
        step: stepToApply,
    });
};
var getStepDistanceByStep = function (_a) {
    var railWidth = _a.railWidth, markWidth = _a.markWidth, markCount = _a.markCount, startMark = _a.startMark, endMark = _a.endMark;
    return getStepDistanceByMarkCount({
        railWidth: railWidth,
        markWidth: markWidth,
        startMark: startMark,
        endMark: endMark,
        count: markCount,
    });
};
var getStepDistance = function (_a) {
    var railWidth = _a.railWidth, markWidth = _a.markWidth, step = _a.step, startMark = _a.startMark, endMark = _a.endMark, minValue = _a.minValue, maxValue = _a.maxValue;
    var options = {
        railWidth: railWidth,
        markWidth: markWidth,
        startMark: startMark,
        endMark: endMark,
    };
    var count = getMarkCountByStep({
        step: step,
        startMark: startMark,
        endMark: endMark,
        minValue: minValue,
        maxValue: maxValue,
    });
    return {
        markCount: count,
        stepDistance: getStepDistanceByStep(__assign(__assign({}, options), { markCount: count })),
    };
};
var getMarkPositions = function (_a) {
    var startMark = _a.startMark, count = _a.count, stepDistance = _a.stepDistance;
    var startAt = startMark ? 0 : stepDistance;
    return Array.from({ length: count }).map(function (_, index) { return startAt + stepDistance * index; });
};
var getMarkValue = function (step, markIndex) {
    return step * markIndex;
};
var getMarkValues = function (step, markPositions) {
    return markPositions.map(function (_, index) { return getMarkValue(step, index); });
};
var createMarks = function (_a) {
    var positions = _a.positions, step = _a.step, stepDistance = _a.stepDistance, style = _a.style, mark = _a.mark, markWidth = _a.markWidth, disabled = _a.disabled, onMarkPress = _a.onMarkPress;
    var halfStepDistance = stepDistance / 2;
    var fineTunedHalfStepDistance = halfStepDistance - markWidth / 2;
    return positions.map(function (position, index) {
        var handlePress = function () {
            if (disabled)
                return;
            var value = getMarkValue(step, index);
            if (onMarkPress)
                onMarkPress(value, position, index);
        };
        return (<TouchableWithoutFeedback key={position} onPress={handlePress}>
          <MarkPositioner width={stepDistance} position={position - fineTunedHalfStepDistance}>
            {mark || <Mark style={style}/>}
          </MarkPositioner>
        </TouchableWithoutFeedback>);
    });
};
var getMarkWidth = function (markStyle) {
    var width = markStyle.width;
    if (isNil(width))
        return DEFAULT.width;
    // eslint-disable-next-line radix
    return parseInt(width.toString());
};
var Marks = function (_a) {
    var testID = _a.testID, sliderWidth = _a.sliderWidth, _b = _a.style, style = _b === void 0 ? {} : _b, mark = _a.mark, customMarkWidth = _a.customMarkWidth, step = _a.step, _c = _a.startMark, startMark = _c === void 0 ? true : _c, _d = _a.endMark, endMark = _d === void 0 ? true : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, onInit = _a.onInit, onMarkPress = _a.onMarkPress, minValue = _a.minValue, maxValue = _a.maxValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var handleInit = function (markValues, markPositions) {
        if (onInit)
            onInit(markValues, markPositions);
    };
    if (mark && isNil(customMarkWidth))
        throw Error('Must have customMarkWidth prop if it uses a cutsom mark.');
    var markStyleToApply = StyleSheet.flatten(style);
    var railWidth = sliderWidth;
    var markWidth = isNil(mark)
        ? getMarkWidth(markStyleToApply)
        : customMarkWidth;
    var markOptions = {
        railWidth: railWidth,
        markWidth: markWidth,
        step: step,
        startMark: startMark,
        endMark: endMark,
        minValue: minValue,
        maxValue: maxValue,
    };
    var _f = useMemo(function () { return getStepDistance(markOptions); }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(markOptions)), markCountToApply = _f.markCount, stepDistance = _f.stepDistance;
    var markPositions = useMemo(function () {
        return getMarkPositions({
            startMark: startMark,
            count: markCountToApply,
            stepDistance: stepDistance,
        });
    }, [startMark, markCountToApply, stepDistance]);
    var marks = createMarks({
        positions: markPositions,
        step: step,
        stepDistance: stepDistance,
        style: markStyleToApply,
        mark: mark,
        markWidth: markWidth,
        disabled: disabled,
        onMarkPress: onMarkPress,
    });
    useEffect(function () {
        var markValues = getMarkValues(step, markPositions);
        handleInit(markValues, markPositions);
    }, [handleInit, markPositions, step]);
    return (<Container testID={testID} style={style}>
      {marks}
    </Container>);
};
export default Marks;
var templateObject_1, templateObject_2, templateObject_3;
