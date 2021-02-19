import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
interface Props {
    testID?: string;
    percentValue: Animated.Value;
    value: number;
    size?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
declare const Label: React.FC<Props>;
export default Label;
