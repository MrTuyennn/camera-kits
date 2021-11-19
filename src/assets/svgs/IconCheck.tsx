import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {ptColor} from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconCheck = (props: Props) => {
  const {height, width, color} = props;
  return (
    <Svg
      width={width || 30}
      height={height || 30}
      viewBox="0 0 512.000000 512.000000">
      <G
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color || ptColor.white}
        stroke="none">
        <Path
          d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595
c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234
-125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44
257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91
392 -292 453 -56 17 -162 17 -216 0z"
        />
      </G>
    </Svg>
  );
};

export default IconCheck;

const styles = StyleSheet.create({});
