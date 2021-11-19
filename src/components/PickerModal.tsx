import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ptColor} from '../config/styles';
import BottomModal from './BottomModal';

interface Props {
  onPickerCamera?: () => void;
  onPickerImage?: () => void;
}

const PickerModal = forwardRef((props: Props, ref) => {
  const {onPickerCamera, onPickerImage} = props;
  // @ts-ignore
  const bottomModalRef = useRef<BottomModal>(null);

  const show = () => {
    if (bottomModalRef?.current) {
      bottomModalRef?.current?.show();
    }
  };
  const hide = () => {
    if (bottomModalRef?.current) {
      bottomModalRef?.current?.hide();
    }
  };

  const pickerCamera = () => {
    hide();
    if (onPickerCamera) {
      onPickerCamera();
    }
  };
  const pickerImage = () => {
    hide();
    if (onPickerImage) {
      onPickerImage();
    }
  };
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));
  return (
    <View style={styles.container}>
      <BottomModal ref={bottomModalRef}>
        <TouchableOpacity
          onPress={() => pickerCamera()}
          style={styles.touchableOpacity}>
          <Text>Chọn chụp ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => pickerImage()}
          style={styles.touchableOpacity}>
          <Text>Chọn hình ảnh ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => hide()}>
          <Text>Hủy</Text>
        </TouchableOpacity>
      </BottomModal>
    </View>
  );
});

export default PickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacity: {
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: ptColor.blue,
  },
});
