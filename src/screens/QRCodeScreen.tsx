import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';
import {QRScannerRectView} from '../components/QRScanner';
import {HEIGHT, WIDTH} from '../config/styles';
interface Props {}

const QRCodeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <QRCodeScanner
        checkAndroid6Permissions
        showMarker
        reactivate
        reactivateTimeout={5000}
        // flashMode={}
        // @ts-ignore
        style={{flex: 1}}
        customMarker={
          // @ts-ignore
          <QRScannerRectView
            hintText={'Vui lòng đưa mã QR vào vùng quét'}
            scanBarAnimateReverse={true}
          />
        }
        containerStyle={{backgroundColor: 'black'}}
        cameraStyle={{
          width: WIDTH,
          height: HEIGHT,
        }}
        {...props}
        onRead={(e: any) => console.log('e', e)}
      />
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
