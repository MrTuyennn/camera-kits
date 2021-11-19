import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {ptColor} from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconTakePhoto = (props: Props) => {
  const {height, width, color} = props;
  return (
    <Svg
      width={width || 50}
      height={height || 50}
      viewBox="0 0 512.000000 512.000000">
      <G
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color || ptColor.gray}
        stroke="none">
        <Path
          d="M2380 5113 c-344 -33 -606 -99 -878 -221 -279 -125 -592 -349 -792
-566 l-43 -46 114 -198 c63 -109 247 -428 409 -709 l295 -511 17 26 c9 15 300
520 647 1122 l631 1095 -57 6 c-60 7 -282 8 -343 2z"
        />
        <Path
          d="M3082 5028 c-52 -87 -783 -1360 -788 -1373 -5 -13 142 -15 1291 -15
l1296 0 -58 113 c-329 631 -942 1114 -1630 1287 -45 11 -84 20 -86 20 -3 0
-14 -15 -25 -32z"
        />
        <Path
          d="M395 3923 c-204 -323 -325 -667 -377 -1063 -16 -124 -15 -478 1 -605
20 -155 86 -453 104 -471 2 -2 371 -3 821 -2 l816 3 -626 1085 c-344 597 -636
1102 -649 1123 l-22 38 -68 -108z"
        />
        <Path
          d="M3393 3278 c163 -290 1257 -2173 1264 -2175 11 -4 130 189 192 312
129 258 212 535 253 845 18 139 15 489 -5 635 -17 121 -51 282 -82 388 l-16
57 -821 0 -820 0 35 -62z"
        />
        <Path
          d="M2987 1138 c-356 -616 -645 -1124 -641 -1127 11 -11 429 -6 524 7
576 77 1078 319 1478 714 56 56 102 105 102 109 0 6 -804 1404 -814 1416 -1 1
-293 -502 -649 -1119z"
        />
        <Path
          d="M286 1388 c151 -300 399 -603 677 -827 224 -181 528 -345 802 -434
122 -40 247 -69 255 -60 10 10 800 1381 807 1399 4 12 -195 14 -1291 14
l-1296 0 46 -92z"
        />
      </G>
    </Svg>
  );
};

export default IconTakePhoto;

const styles = StyleSheet.create({});
