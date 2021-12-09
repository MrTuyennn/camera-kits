import {PermissionsAndroid} from 'react-native';

export const ROUTE_KEY = {
  MainScreen: 'MainScreen',
  CameraKit: 'CameraKit',
  ScrollCamera: 'ScrollCamera',
  QRCodeScreen: 'QRCodeScreen',
};

export const requestPermission = async (callback: any) => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
      granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
    ) {
      return callback(true);
    } else {
      console.log('Read storage permission denied');
    }
  } catch (err) {
    console.warn('err', err);
  }
};

export const requestCameraPermission = async (callback: any) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === 'granted') {
      return callback(true);
    } else {
      console.log('Read storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
