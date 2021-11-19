import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {ptColor} from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconFlash = (props: Props) => {
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
          d="M1510 3600 l-600 -1200 610 0 c335 0 610 -3 610 -7 -1 -5 -137 -467
-304 -1028 l-303 -1020 69 -39 c38 -21 73 -34 78 -30 4 5 568 683 1253 1506
l1246 1498 -764 2 -764 3 554 750 c305 413 554 753 555 758 0 4 -369 7 -820 7
l-820 0 -600 -1200z"
        />
      </G>
    </Svg>
  );
};

export default IconFlash;

const styles = StyleSheet.create({});
