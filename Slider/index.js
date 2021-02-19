var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Animated, Easing, PanResponder, Platform, } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { getNearestPercentByValue, getPercentByPositionX, getStepPercent, getStepValueByPercent, } from './utils';
import Label from './Label';
import Marks from './Marks';
import Rail from './Rail';
import Thumb from './Thumb';
import Track from './Track';
import styled from 'styled-components/native';
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  position: relative;\n  width: 100%;\n"], ["\n  display: flex;\n  justify-content: center;\n  position: relative;\n  width: 100%;\n"])));
var Slider = function (_a) {
    var _b = _a.hideMark, hideMark = _b === void 0 ? false : _b, _c = _a.hideLabel, hideLabel = _c === void 0 ? true : _c, _d = _a.autoLabel, autoLabel = _d === void 0 ? false : _d, _e = _a.step, step = _e === void 0 ? 1 : _e, _f = _a.defaultValue, defaultValue = _f === void 0 ? 0 : _f, _g = _a.minValue, minValue = _g === void 0 ? 0 : _g, _h = _a.maxValue, maxValue = _h === void 0 ? 100 : _h, thumb = _a.thumb, thumbSize = _a.thumbSize, mark = _a.mark, customMarkWidth = _a.customMarkWidth, _j = _a.startMark, startMark = _j === void 0 ? true : _j, _k = _a.endMark, endMark = _k === void 0 ? true : _k, markStyle = _a.markStyle, railStyle = _a.railStyle, trackStyle = _a.trackStyle, thumbStyle = _a.thumbStyle, labelSize = _a.labelSize, labelStyle = _a.labelStyle, labelTextStyle = _a.labelTextStyle, onChange = _a.onChange;
    var sliderRef = React.useRef();
    var _l = useState(0), sliderWidth = _l[0], setSliderWidth = _l[1];
    var _m = useState(0), sliderPositionX = _m[0], setSliderPositionX = _m[1];
    var _o = useState(getNearestPercentByValue({
        value: defaultValue || minValue,
        minValue: minValue,
        maxValue: maxValue,
        step: step,
    })), percent = _o[0], setPercent = _o[1];
    var _p = useState(defaultValue), value = _p[0], setValue = _p[1];
    var scaleValue = useState(new Animated.Value(0.01))[0];
    var opacityValue = useState(new Animated.Value(0.12))[0];
    var _q = useState(false), isVisibleLabel = _q[0], setIsVisibleLabel = _q[1];
    var percentValue = useState(new Animated.Value(0))[0];
    useEffect(function () {
        if (!hideLabel && !autoLabel)
            setIsVisibleLabel(true);
    }, [autoLabel, hideLabel]);
    useEffect(function () {
        // Set Label percent animated Value
        Animated.timing(percentValue, {
            toValue: percent,
            duration: 255,
            easing: Easing.elastic(1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }, [percent, percentValue]);
    var panResponder = useMemo(function () {
        return PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderTerminationRequest: function () { return true; },
            onPanResponderGrant: function () {
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 225,
                    easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                    useNativeDriver: Platform.OS === 'android',
                }).start();
                if (!hideLabel && autoLabel)
                    setIsVisibleLabel(true);
            },
            onPanResponderRelease: function () {
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 225,
                    easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                    useNativeDriver: Platform.OS === 'android',
                }).start();
                if (!hideLabel && autoLabel)
                    setIsVisibleLabel(false);
            },
            onPanResponderMove: function (evt, gestureState) {
                // the latest screen coordinates of the recently-moved touch
                var stepPercent = getStepPercent({
                    minValue: minValue,
                    maxValue: maxValue,
                    step: step,
                });
                // eslint-disable-next-line @typescript-eslint/no-shadow
                var percent = getPercentByPositionX({
                    positionX: gestureState.moveX - sliderPositionX,
                    sliderWidth: sliderWidth,
                    stepPercent: stepPercent,
                });
                // eslint-disable-next-line @typescript-eslint/no-shadow
                var value = getStepValueByPercent({
                    percent: percent,
                    stepPercent: stepPercent,
                    step: step,
                });
                setPercent(percent);
                setValue(value);
                if (onChange)
                    onChange(value);
            },
        });
    }, [
        scaleValue,
        hideLabel,
        autoLabel,
        minValue,
        maxValue,
        step,
        sliderPositionX,
        sliderWidth,
        onChange,
    ]);
    if (sliderRef.current)
        sliderRef.current.measure(function (x, y, width, height, pageX) {
            if (width && pageX) {
                setSliderPositionX(pageX);
                setSliderWidth(width);
            }
        });
    return (
    // @ts-ignore
    <Container ref={sliderRef} collapsable={false} {...panResponder.panHandlers}>
      <Rail testID="rail-test-id" style={railStyle}/>
      <Track testID="track-test-id" percent={percent} style={trackStyle}/>
      {!hideMark && step > 0 && (<Marks testID="marks-test-id" sliderWidth={sliderWidth} minValue={minValue} maxValue={maxValue} step={step} mark={mark} customMarkWidth={customMarkWidth} startMark={startMark} endMark={endMark} style={markStyle}/>)}
      <Thumb testID="thumb-test-id" scaleValue={scaleValue} opacityValue={opacityValue} size={thumbSize} percent={percent} customThumb={thumb} style={thumbStyle}/>
      {isVisibleLabel && (<Label testID="label-test-id" percentValue={percentValue} value={value} size={labelSize} style={labelStyle} textStyle={labelTextStyle}/>)}
    </Container>);
};
export { Slider };
var templateObject_1;
