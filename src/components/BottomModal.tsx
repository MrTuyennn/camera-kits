import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {HEIGHT, WIDTH} from '../config/styles';
interface Props {
  styleContainer?: ViewStyle;
  children?: any;
}

const BottomModal = forwardRef((props: Props, ref) => {
  const {styleContainer, children} = props;
  const [visible, setVisible] = React.useState(false);
  const modalRef = useRef<Modal>(null);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));
  return (
    <Modal // @ts-ignore
      // deviceWidth={WIDTH} // @ts-ignore
      // deviceHeight={HEIGHT}
      ref={modalRef}
      animationIn="fadeInUp"
      animationInTiming={300}
      animationOutTiming={300}
      isVisible={visible}
      swipeDirection={undefined}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      backdropOpacity={0.6}
      hasBackdrop={true}
      style={{
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',
      }}
      {...props}>
      <View
        style={[
          {
            padding: 16,
            backgroundColor: 'white',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
          styleContainer,
        ]}>
        {children}
      </View>
    </Modal>
  );
});

export default BottomModal;

const styles = StyleSheet.create({});
