import CameraRoll from '@react-native-community/cameraroll';
import {CommonActions} from '@react-navigation/routers';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import {
  IconBack,
  IconCheck,
  IconCircle,
  IconClose,
  IconFlash,
  IconTakePhoto,
  IconUnFlash,
} from '../assets/svgs';
import {requestPermission, ROUTE_KEY} from '../config/constains';
import {HEIGHT, ptColor, WIDTH} from '../config/styles';
export interface CameraKitProps {
  navigation?: any;
}

export default class CameraKit extends React.PureComponent<
  CameraKitProps,
  any
> {
  camera: any;
  constructor(props: CameraKitProps) {
    super(props);
    this.state = {
      linkImage: {},
      flashMode: RNCamera.Constants.FlashMode.off,
      type: RNCamera.Constants.Type.back,
      itemImage: '',
    };
  }

  getAlbums = async () => {
    await CameraRoll.getAlbums({assetType: 'All'});
    const albumList = await CameraRoll.getPhotos({
      first: 1,
      groupTypes: 'All',
      assetType: 'Photos',
      include: ['fileSize', 'filename', 'imageSize', 'location'],
    });
    await this.setState({
      itemImage: albumList.edges[0],
    });
  };

  componentDidMount() {
    this.getAlbums();
  }

  toggleTypeCamera = () => {
    const {type} = this.state;
    if (type === RNCamera.Constants.Type.back) {
      this.setState({
        type: RNCamera.Constants.Type.front,
      });
    } else {
      this.setState({
        type: RNCamera.Constants.Type.back,
      });
    }
  };

  toggleFlash = () => {
    const {flashMode} = this.state;
    if (flashMode === RNCamera.Constants.FlashMode.off) {
      this.setState({flashMode: RNCamera.Constants.FlashMode.on});
    } else {
      this.setState({flashMode: RNCamera.Constants.FlashMode.off});
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      await CameraRoll.save(data.uri, {
        type: 'photo' || 'video',
        album: 'medpro',
      });
      await this.setState({
        linkImage: data,
      });
      await this.getAlbums();
    }
  };
  render() {
    const {itemImage, type, flashMode, linkImage} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ptColor.black}}>
        {linkImage?.uri ? (
          <View style={styles.imageBackground}>
            <Image
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}
              source={{uri: linkImage?.uri}}
            />
            <View style={styles.viewRow}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    linkImage: {},
                  });
                }}
                style={styles.viewCircle}>
                <IconClose />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const captureImage = await RNFetchBlob.fs.stat(
                    linkImage?.uri,
                  );
                  const imageData = {
                    fileName: captureImage.filename,
                    fileSize: captureImage.size,
                    type: captureImage.type,
                    uri: captureImage.path,
                  };
                  this.props.navigation.dispatch((state: any) => {
                    const routes = state.routes.filter(
                      (r: any) => r.name === ROUTE_KEY.MainScreen,
                    );
                    return CommonActions.reset({
                      ...state,
                      routes: [
                        ...routes,
                        {
                          name: ROUTE_KEY.MainScreen,
                          params: {
                            imageData: imageData,
                            linkImage: linkImage?.uri,
                          },
                        },
                      ],
                      index: routes.length,
                    });
                  });
                }}
                style={styles.viewCircle}>
                <IconCheck />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              captureAudio={false}
              style={{flex: 1}}
              type={type}
              flashMode={flashMode}
            />
            <View style={styles.iconBack}>
              <IconBack />
            </View>

            <TouchableOpacity
              onPress={() => this.toggleFlash()}
              style={styles.iconFlash}>
              {flashMode === RNCamera.Constants.FlashMode.on ? (
                <IconFlash />
              ) : (
                <IconUnFlash />
              )}
            </TouchableOpacity>

            <View style={styles.viewBottom}>
              <TouchableOpacity
                onPress={async () => {
                  const result = await requestPermission((arg: any) => {
                    return arg;
                  });
                  if (result) {
                    navigation.push(ROUTE_KEY.ScrollCamera);
                  }
                }}
                style={styles.pickImage}>
                <Image
                  resizeMode="cover"
                  source={{uri: itemImage?.node?.image?.uri}}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.takePicture()}>
                <IconTakePhoto />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.toggleTypeCamera()}
                style={styles.iconCircle}>
                <IconCircle />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 30,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconTakePhoto: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: ptColor.gray,
    backgroundColor: ptColor.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconCircle: {
    // position: 'absolute',
    // right: 20,
  },
  pickImage: {
    height: 40,
    width: 40,
    borderRadius: 20 / 2,
    borderWidth: 1,
    borderColor: ptColor.gray,
    overflow: 'hidden',
  },
  iconFlash: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconBack: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageBackground: {
    height: HEIGHT / 1.2,
    width: WIDTH,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  viewCircle: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    // backgroundColor: ptColor.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
