import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {ptColor} from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconUnFlash = (props: Props) => {
  const {height, width, color} = props;
  return (
    <Svg
      width={width || 30}
      height={height || 30}
      viewBox="0 0 512.000000 512.000000">
      <G
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color || ptColor.gray}
        stroke="none">
        <Path
          d="M1889 4359 l-221 -442 60 -61 c33 -34 396 -412 807 -841 410 -429
       750 -780 755 -780 5 0 204 234 443 520 l435 520 -724 3 c-398 1 -724 5 -724 8
       0 4 844 1244 1012 1487 l19 27 -820 0 -821 0 -221 -441z"
        />
        <Path
          d="M718 4557 l-58 -52 425 -442 c234 -243 425 -447 425 -453 0 -5 -135
       -280 -300 -610 l-300 -600 610 0 c335 0 610 -2 610 -5 0 -3 -133 -454 -296
       -1002 -162 -549 -298 -1010 -301 -1024 -5 -24 1 -30 62 -65 l68 -37 16 21
       c104 135 1399 1681 1407 1679 5 -1 288 -292 628 -647 340 -355 621 -646 624
       -647 4 -1 33 21 64 50 l58 52 -543 565 c-471 491 -1220 1273 -2740 2860 -214
       223 -392 406 -395 407 -4 1 -33 -21 -64 -50z"
        />
      </G>
    </Svg>
  );
};

export default IconUnFlash;

const styles = StyleSheet.create({});
