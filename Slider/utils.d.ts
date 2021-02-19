export declare const roundNearest: (number: number, digit: number) => number;
export declare const getPercentByValue: (value: number, maxValue: number, minValue: number) => number;
export declare const getValueByPercent: (percent: number, maxValue: number, minValue: number) => number;
export declare const getStepPercent: ({ minValue, maxValue, step, }: {
    minValue: number;
    maxValue: number;
    step: number;
}) => number;
export declare const getPercentByPositionX: ({ positionX, sliderWidth, stepPercent, }: {
    positionX: number;
    sliderWidth: number;
    stepPercent: number;
}) => number;
export declare const getNearestPercentByValue: ({ value, minValue, maxValue, step, }: {
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
}) => number;
export declare const getStepValueByPercent: ({ percent, stepPercent, step, }: {
    percent: number;
    stepPercent: number;
    step: number;
}) => number;
