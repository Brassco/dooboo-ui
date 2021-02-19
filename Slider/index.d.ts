import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import React, { FC } from 'react';
interface Props {
    hideMark?: boolean;
    hideLabel?: boolean;
    autoLabel?: boolean;
    step?: number;
    defaultValue?: number;
    minValue?: number;
    maxValue?: number;
    thumb?: React.ReactElement;
    thumbSize?: number;
    mark?: React.ReactElement;
    customMarkWidth?: number;
    startMark?: boolean;
    endMark?: boolean;
    markStyle?: StyleProp<ViewStyle>;
    railStyle?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    labelSize?: number;
    labelStyle?: StyleProp<ViewStyle>;
    labelTextStyle?: StyleProp<TextStyle>;
    onChange?: (value: number) => void;
}
declare const Slider: FC<Props>;
export { Slider };
