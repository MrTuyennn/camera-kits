import CameraRoll from '@react-native-community/cameraroll';
import {CommonActions} from '@react-navigation/routers';
import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconBack} from '../assets/svgs';
import {ROUTE_KEY} from '../config/constains';
import {HEIGHT, ptColor} from '../config/styles';

export interface ScrollCameraProps {
  navigation?: any;
}

export default class ScrollCamera extends React.PureComponent<
  ScrollCameraProps,
  any
> {
  constructor(props: ScrollCameraProps) {
    super(props);
    this.state = {
      albumList: [],
      itemImage: '',
      selectedImage: 0,
    };
  }

  getAlbums = async () => {
    await CameraRoll.getAlbums({assetType: 'All'});
    const albumList = await CameraRoll.getPhotos({
      first: 1000,
      groupTypes: 'All',
      assetType: 'Photos',
      include: ['fileSize', 'filename', 'imageSize', 'location'],
    });
    await this.setState({
      albumList: albumList.edges,
      itemImage: albumList.edges[0],
    });
  };

  componentDidMount() {
    this.getAlbums();
  }

  renderItem = ({item, index}: any) => {
    const {selectedImage} = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            itemImage: item,
            selectedImage: index,
          });

          console.log('Read', this.state?.itemImage);
        }}
        style={[
          styles.imageContainer,
          {
            borderWidth: selectedImage === index ? 2 : 0,
            borderColor:
              selectedImage === index ? ptColor.blue : ptColor.transparent,
          },
        ]}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: item?.node?.image?.uri}}
        />
      </TouchableOpacity>
    );
  };

  public render() {
    const {navigation} = this.props;
    const {albumList, itemImage} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerApp}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <IconBack color="black" />
          </TouchableOpacity>
          {itemImage !== '' && (
            <TouchableOpacity
              onPress={async () => {
                const imageData = await {
                  type: itemImage?.node?.type,
                  fileSize: itemImage?.node?.image?.fileSize,
                  filename: itemImage?.node?.image?.filename,
                  uri: itemImage?.node?.image?.uri,
                };
                await this.props.navigation.dispatch((state: any) => {
                  const routes = state.routes.filter(
                    (r: any) => r.name === ROUTE_KEY.MainScreen,
                  );
                  return CommonActions.reset({
                    ...state,
                    routes: [
                      ...routes,
                      {
                        name: ROUTE_KEY.MainScreen,
                        params: {imageData: imageData},
                      },
                    ],
                    index: routes.length,
                  });
                });
              }}>
              <Text style={{color: ptColor.blue}}>Chọn</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.imageHeader}>
          <Image
            resizeMode="contain"
            resizeMethod="scale"
            source={{uri: itemImage?.node?.image?.uri}}
            style={styles.imageContent}
          />
        </View>
        <FlatList
          numColumns={4}
          data={albumList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeader: {
    height: HEIGHT / 2.5,
    width: '100%',
    backgroundColor: ptColor.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 100,
    width: 100,
    margin: 1,
    flex: 1 / 4,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContent: {
    height: '100%',
    width: '100%',
  },
  headerApp: {
    height: 50,
    width: '100%',
    backgroundColor: ptColor.white,
    borderWidth: 0.5,
    borderColor: ptColor.black,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
});
