import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    testID?: string;
    sliderWidth: number;
    style?: StyleProp<ViewStyle>;
    mark?: React.ReactElement;
    customMarkWidth?: number;
    step: number;
    startMark?: boolean;
    endMark?: boolean;
    disabled?: boolean;
    onInit?: (markValues: number[], markPositions: number[]) => void | Promise<void>;
    onMarkPress?: (value: number, position: number, index: number) => void | Promise<void>;
    minValue: number;
    maxValue: number;
}
declare const Marks: FC<Props>;
export default Marks;
