export var roundNearest = function (number, digit) {
    var rest = number % digit;
    var halfDigit = digit / 2;
    var base = number - rest;
    if (rest >= halfDigit)
        return base + digit;
    return base;
};
export var getPercentByValue = function (value, maxValue, minValue) {
    return (value / (maxValue - minValue)) * 100;
};
export var getValueByPercent = function (percent, maxValue, minValue) {
    return ((maxValue - minValue) * percent) / 100;
};
export var getStepPercent = function (_a) {
    var minValue = _a.minValue, maxValue = _a.maxValue, step = _a.step;
    return (100 / (maxValue - minValue)) * step;
};
export var getPercentByPositionX = function (_a) {
    var positionX = _a.positionX, sliderWidth = _a.sliderWidth, stepPercent = _a.stepPercent;
    var percent = (positionX / sliderWidth) * 100;
    if (percent <= 0)
        return 0;
    if (percent >= 100)
        return 100;
    return roundNearest(percent, stepPercent);
};
export var getNearestPercentByValue = function (_a) {
    var value = _a.value, minValue = _a.minValue, maxValue = _a.maxValue, step = _a.step;
    var stepPercent = getStepPercent({
        minValue: minValue,
        maxValue: maxValue,
        step: step,
    });
    var percent = getPercentByValue(value, maxValue, minValue);
    if (percent <= 0)
        return 0;
    if (percent >= 100)
        return 100;
    return roundNearest(getPercentByValue(value, maxValue, minValue), stepPercent);
};
export var getStepValueByPercent = function (_a) {
    var percent = _a.percent, stepPercent = _a.stepPercent, step = _a.step;
    return (percent / stepPercent) * step;
};
