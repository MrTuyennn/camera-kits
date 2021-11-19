import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {ptColor} from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}
const IconClose = (props: Props) => {
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
          d="M271 5109 c-104 -20 -194 -91 -239 -187 -22 -47 -27 -71 -27 -137 0
-155 -68 -78 1075 -1220 l1010 -1010 -1019 -1020 c-827 -829 -1022 -1029
-1041 -1070 -34 -71 -35 -199 -2 -270 29 -63 93 -129 157 -163 72 -37 187 -42
270 -12 58 22 94 56 1083 1044 l1022 1021 1018 -1016 c817 -816 1027 -1021
1067 -1040 42 -20 65 -24 145 -24 83 0 101 4 145 27 62 32 129 103 158 166 32
68 30 197 -3 267 -19 41 -214 241 -1041 1070 l-1019 1020 1010 1010 c1143
1142 1075 1065 1075 1220 0 65 -5 90 -26 135 -81 172 -284 242 -454 158 -26
-13 -391 -370 -1057 -1036 l-1018 -1017 -1017 1017 c-667 666 -1032 1023
-1058 1036 -34 17 -145 45 -164 41 -3 -1 -26 -5 -50 -10z"
        />
      </G>
    </Svg>
  );
};

export default IconClose;

const styles = StyleSheet.create({});
