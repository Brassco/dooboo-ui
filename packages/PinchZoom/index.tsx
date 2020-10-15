import { Animated, NativeMethods, NativeTouchEvent, PanResponder, PanResponderInstance, ViewStyle } from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type Props = PropsWithChildren<{
  style?: ViewStyle,
  onScaleChanged?(value: number): void,
  onTranslateChanged?(valueXY: {x: number, y: number}): void,
  onRelease?(): void,
  fixOverflowAfterRelease?: boolean,
}>

export interface PinchZoomRef {
  animatedValue: { scale: Animated.Value, translate: Animated.ValueXY },
  setValues(_: { scale?: number, translate?: { x: number, y: number } }): void,
}

type TouchePosition = Pick<NativeTouchEvent, 'locationX' | 'locationY' | 'pageX' | 'pageY'>

function getDistanceFromTouches(
  touches: NativeTouchEvent[],
): number {
  const [touch1, touch2] = touches;

  return Math.sqrt((touch1.pageX - touch2.pageX) ** 2 +
    (touch1.pageY - touch2.pageY) ** 2);
}

function getRelativeTouchesCenterPosition(
  touches: NativeTouchEvent[], layout: {width: number, height: number, pageX: number, pageY: number},
): TouchePosition {
  return {
    locationX: (touches[0].locationX + touches[1].locationX) / 2 - layout.width / 2,
    locationY: (touches[0].locationY + touches[1].locationY) / 2 - layout.height / 2,
    pageX: (touches[0].pageX + touches[1].pageX) / 2 - layout.width / 2 - layout.pageX,
    pageY: (touches[0].pageY + touches[1].pageY) / 2 - layout.height / 2 - layout.pageY,
  };
}

function PinchZoom(props: Props, ref: Ref<PinchZoomRef>): ReactElement {
  const { style, children, onScaleChanged, onRelease, onTranslateChanged, fixOverflowAfterRelease = true } = props;
  const containerView = useRef<NativeMethods>();
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const transformCache = useRef({ scale: 1, translateX: 0, translateY: 0 }).current;
  const lastTransform = useRef({ scale: 1, translateX: 0, translateY: 0 });
  const initialDistance = useRef<number>();
  const initialTouchesCenter = useRef<TouchePosition>();
  const layout = useRef<{width: number, height: number, pageX: number, pageY: number}>();
  const decayingTranslateAnimation = useRef<Animated.CompositeAnimation>();
  const isResponderActive = useRef(false);

  containerView.current?.measure((x, y, width, height, pageX, pageY) => {
    layout.current = { width, height, pageX, pageY };
  });

  useEffect(() => {
    scale.addListener(({ value }) => {
      transformCache.scale = value;
      onScaleChanged && onScaleChanged(value);
    });

    const id = translate.addListener(({ x, y }) => {
      if (decayingTranslateAnimation.current && layout.current && !isResponderActive.current) {
        const overflowX = Math.abs(x) > (transformCache.scale - 1) * layout.current.width / 2;
        const overflowY = Math.abs(y) > (transformCache.scale - 1) * layout.current.height / 2;

        if (overflowX || overflowY) {
          decayingTranslateAnimation.current?.stop();
          decayingTranslateAnimation.current = undefined;

          translate.setValue({
            x: overflowX ? Math.sign(x) * (transformCache.scale - 1) * layout.current.width / 2 : x,
            y: overflowY ? Math.sign(y) * (transformCache.scale - 1) * layout.current.height / 2 : y,
          });
        }
      }

      transformCache.translateX = x;
      transformCache.translateY = y;
      onTranslateChanged && onTranslateChanged({ x, y });
    });

    return () => {
      scale.removeAllListeners();
      translate.removeListener(id);
    };
  }, [onScaleChanged, onTranslateChanged]);

  const [panResponder, setPanResponder] = useState<PanResponderInstance>();

  useEffect(() => {
    setPanResponder(PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        isResponderActive.current = true;

        if (decayingTranslateAnimation.current) {
          decayingTranslateAnimation.current.stop();
        }

        const { touches } = nativeEvent;

        lastTransform.current = { ...transformCache };

        if (touches.length === 2 && layout.current != null) {
          initialDistance.current = getDistanceFromTouches(touches);
          initialTouchesCenter.current = getRelativeTouchesCenterPosition(touches, layout.current);
        } else {
          initialDistance.current = undefined;
        }
      },
      onPanResponderMove: ({ nativeEvent }, gestureState) => {
        const { touches } = nativeEvent;

        if (layout.current == null) {
          return;
        }

        if (touches.length === 2) {
          if (initialDistance.current && initialTouchesCenter.current && layout.current) {
            const newScale = Math.max(
              1,
              getDistanceFromTouches(touches) / initialDistance.current * lastTransform.current.scale,
            );

            const { pageX, pageY } = getRelativeTouchesCenterPosition(touches, layout.current);

            scale.setValue(newScale);

            const newTranslateX = pageX - (initialTouchesCenter.current.locationX * newScale);
            const newTranslateY = pageY - (initialTouchesCenter.current.locationY * newScale);

            translate.setValue({
              x: fixOverflowAfterRelease
                ? Math.min(Math.abs(newTranslateX), (newScale - 1) * layout.current.width / 2) *
                    Math.sign(newTranslateX)
                : newTranslateX,
              y: fixOverflowAfterRelease
                ? Math.min(Math.abs(newTranslateY), (newScale - 1) * layout.current.height / 2) *
                    Math.sign(newTranslateY)
                : newTranslateY,
            });
          } else {
            initialDistance.current = getDistanceFromTouches(touches);
            initialTouchesCenter.current = getRelativeTouchesCenterPosition(touches, layout.current);
          }
        } else if (touches.length === 1) {
          const newTranslateX = lastTransform.current.translateX + gestureState.dx;
          const newTranslateY = lastTransform.current.translateY + gestureState.dy;

          translate.setValue({
            x: newTranslateX,
            y: newTranslateY,
          });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        isResponderActive.current = false;

        if (layout.current == null) return;

        const overflowX = Math.abs(transformCache.translateX) > (transformCache.scale - 1) * layout.current.width / 2;
        const overflowY = Math.abs(transformCache.translateY) > (transformCache.scale - 1) * layout.current.height / 2;

        if (overflowX || overflowY) {
          if (!fixOverflowAfterRelease) {
            onRelease && onRelease();

            return;
          }

          decayingTranslateAnimation.current?.stop();
          decayingTranslateAnimation.current = undefined;

          const toValue = {
            x: overflowX
              ? Math.sign(transformCache.translateX) * (transformCache.scale - 1) * layout.current.width / 2
              : transformCache.translateX,
            y: overflowY
              ? Math.sign(transformCache.translateY) * (transformCache.scale - 1) * layout.current.height / 2
              : transformCache.translateY,
          };

          Animated.timing(translate, {
            toValue,
            duration: 100,
            useNativeDriver: true,
          }).start();
        } else {
          decayingTranslateAnimation.current = Animated.decay(
            translate,
            {
              velocity: { x: gestureState.vx, y: gestureState.vy },
              useNativeDriver: true,
            },
          );

          decayingTranslateAnimation.current.start(() => {
            decayingTranslateAnimation.current = undefined;
          });
        }
      },
    }));
  }, [fixOverflowAfterRelease, onRelease]);

  useImperativeHandle(ref, () => ({
    animatedValue: { scale, translate },
    setValues: (values) => {
      values.scale != null && scale.setValue(values.scale);
      values.translate != null && translate.setValue(values.translate);
    },
  }));

  return <Animated.View
    ref={containerView}
    style={[style, style?.transform ? {} : {
      transform: [
        { translateX: translate.x },
        { translateY: translate.y },
        { scale },
      ],
    }]}
    {...(panResponder?.panHandlers || {})}
  >
    {children}
  </Animated.View>;
}

export default forwardRef<PinchZoomRef, Props>(PinchZoom);
