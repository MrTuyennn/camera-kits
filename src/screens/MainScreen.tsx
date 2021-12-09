import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import PickerModal from '../components/PickerModal';
import {
  requestCameraPermission,
  requestPermission,
  ROUTE_KEY,
} from '../config/constains';
import {ptColor} from '../config/styles';

export interface MainScreenProps {
  route?: any;
  navigation?: any;
}

export default class MainScreen extends React.PureComponent<
  MainScreenProps,
  any
> {
  pickerModal: any;
  imageData: any;
  constructor(props: MainScreenProps) {
    super(props);
    this.pickerModal = React.createRef();
    this.imageData = this.props.route?.params;
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    console.log('?');
    try {
      const itemImage = nextProps?.route?.params;
      console.log('itemImage', itemImage);
    } catch (error) {
      console.log('error', error);
    }
  }

  public render() {
    const {navigation}: any = this.props;
    console.log('this.imageData?.uri', JSON.stringify(this.imageData, null, 2));
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.pickerModal?.current?.show()}>
            <Text>Chọn phương thức</Text>
          </TouchableOpacity>
          {this.imageData?.uri !== '' && (
            <View style={styles.imageContent}>
              <Image
                source={{
                  uri:
                    this.imageData?.linkImage || this.imageData?.imageData?.uri,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          )}
        </View>
        <PickerModal
          ref={this.pickerModal}
          onPickerImage={async () => {
            const result = await requestPermission((arg: any) => {
              return arg;
            });
            if (result) {
              navigation.push(ROUTE_KEY.ScrollCamera);
            }
          }}
          onPickerCamera={async () => {
            const result = await requestCameraPermission((arg: any) => {
              return arg;
            });
            if (result) {
              navigation.push(ROUTE_KEY.CameraKit);
            }
          }}
          onScanQRCode={async () => {
            const result = await requestCameraPermission((arg: any) => {
              return arg;
            });
            if (result) {
              navigation.push(ROUTE_KEY.QRCodeScreen);
            }
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    height: 200,
    width: 200,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
