import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
interface Props {
    testID?: string;
    percent: number;
    size?: number;
    scaleValue?: Animated.Value;
    opacityValue?: Animated.Value;
    customThumb?: React.ReactElement;
    style?: StyleProp<ViewStyle>;
}
declare const Thumb: FC<Props>;
export default Thumb;
