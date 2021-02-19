import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    testID?: string;
    style?: StyleProp<ViewStyle>;
    percent: number;
}
declare const Track: FC<Props>;
export default Track;
