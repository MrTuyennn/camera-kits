import React, { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { ptColor } from '../../config/styles';
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconBack = (props: Props) => {
  const {height, width, color} = props;
  return (
    <Svg
      height={height || 20}
      width={width || 20}
      viewBox="0 0 16 16"
      fill="none">
      <Path
        d="M3.828 6.99992H16V8.99992H3.828L9.192 14.3639L7.778 15.7779L0 7.99992L7.778 0.221924L9.192 1.63592L3.828 6.99992Z"
        fill={color || ptColor.white}
      />
    </Svg>
  );
};

export default memo(IconBack);
