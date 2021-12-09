import PropTypes from 'prop-types';
import React, {Component, ReactPropTypes} from 'react';
import {
  Animated,
  AppState,
  Easing,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WIDTH} from '../config/styles';
// import { getStatusBarHeight } from 'utils/getStatusBarHeight';
// import {
//   HEIGHT,
//   WIDTH,
//   WIDTH_SCALE_RATIO,
//   HEIGHT_SCALE_RATIO,
//   headerHeight,
//   IS_IOS,
// } from '../../constants/styles';
const defaultRectStyle = {
  height: 300,
  width: 300,
  borderWidth: 0,
  borderColor: '#000000',
  marginBottom: 0,
};
const defaultCornerStyle = {
  height: 32,
  width: 32,
  borderWidth: 6,
  borderColor: '#1A6DD5',
};
const defaultScanBarStyle = {
  marginHorizontal: 8,
  borderRadius: 2,
  backgroundColor: '#1A6DD5',
};
const defaultHintTextStyle = {
  color: '#fff',
  fontSize: 14,
  backgroundColor: 'transparent',
  marginTop: 32,
};

export class QRScannerRectView extends Component<ReactPropTypes> {
  static propTypes = {
    maskColor: PropTypes.string,
    rectStyle: PropTypes.object,

    cornerStyle: PropTypes.object,
    cornerOffsetSize: PropTypes.number,
    isShowCorner: PropTypes.bool,
    isShowScanBar: PropTypes.bool,
    scanBarAnimateTime: PropTypes.number,
    scanBarAnimateReverse: PropTypes.bool,
    scanBarImage: PropTypes.any,
    scanBarStyle: PropTypes.object,

    hintText: PropTypes.string,
    hintTextStyle: PropTypes.object,
  };

  static defaultProps = {
    maskColor: '#0000004D',
    cornerOffsetSize: 0,
    isShowScanBar: true,
    isShowCorner: true,
    scanBarAnimateTime: 3000,
    //hintText: strings.info_qr_code,
  };

  state = {
    animatedValue: new Animated.Value(0),
  };
  innerRectStyle: any;
  innerCornerStyle: any;
  innerScanBarStyle: any;
  innerHintTextStyle: any;
  scanBarAnimation: any;
  scanBarAnimateTime: any;
  constructor(props: any) {
    super(props);
    this.innerRectStyle = Object.assign(defaultRectStyle, props.rectStyle);
    this.innerCornerStyle = Object.assign(
      defaultCornerStyle,
      props.cornerStyle,
    );
    this.innerScanBarStyle = Object.assign(
      defaultScanBarStyle,
      props.scanBarStyle,
    );
    this.innerHintTextStyle = Object.assign(
      defaultHintTextStyle,
      props.hintTextStyle,
    );
  }

  componentDidMount() {
    this.scanBarMove();
  }

  componentWillUnmount() {
    this.scanBarAnimation && this.scanBarAnimation.stop();
  }

  // 扫描动画
  scanBarMove() {
    const {cornerOffsetSize, scanBarAnimateReverse, isShowScanBar}: any =
      this.props;
    const scanBarHeight = isShowScanBar
      ? this.innerScanBarStyle.height || 4
      : 0;
    const startValue = this.innerCornerStyle.borderWidth;
    const endValue =
      this.innerRectStyle.height -
      (this.innerRectStyle.borderWidth +
        cornerOffsetSize +
        this.innerCornerStyle.borderWidth) -
      scanBarHeight;
    if (scanBarAnimateReverse) {
      this.scanBarAnimation = Animated.sequence([
        Animated.timing(this.state.animatedValue, {
          toValue: endValue,
          // @ts-ignore
          duration: this.props.scanBarAnimateTime,
          easing: Easing.linear,
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.animatedValue, {
          toValue: startValue, // @ts-ignore
          duration: this.props.scanBarAnimateTime,
          easing: Easing.linear,
          isInteraction: false,
          useNativeDriver: true,
        }),
      ]).start(() => this.scanBarMove());
    } else {
      this.state.animatedValue.setValue(startValue); //重置Rotate动画值为0
      this.scanBarAnimation = Animated.timing(this.state.animatedValue, {
        toValue: endValue, // @ts-ignore
        duration: this.props.scanBarAnimateTime,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: true,
      }).start(() => this.scanBarMove());
    }
  }

  getBackgroundColor = () => {
    // @ts-ignore
    return {backgroundColor: this.props.maskColor};
  };

  getRectSize = () => {
    return {
      height: this.innerRectStyle.height,
      width: this.innerRectStyle.width,
    };
  };

  getRectOffsetHeight = () => {
    return {height: this.innerRectStyle.marginBottom};
  };

  getBorderStyle() {
    // @ts-ignore
    const {cornerOffsetSize} = this.props;
    return {
      height: this.innerRectStyle.height - cornerOffsetSize * 2,
      width: this.innerRectStyle.width - cornerOffsetSize * 2,
      borderWidth: this.innerRectStyle.borderWidth,
      borderColor: this.innerRectStyle.borderColor,
    };
  }

  getCornerStyle() {
    return {
      height: this.innerCornerStyle.height,
      width: this.innerCornerStyle.width,
      borderColor: this.innerCornerStyle.borderColor,
    };
  }

  getScanImageWidth() {
    return (
      this.innerRectStyle.width - this.innerScanBarStyle.marginHorizontal * 2
    );
  }

  measureScanBarImage = (e: any) => {
    this.setState({scanBarImageHeight: Math.round(e.layout.height)});
  };

  renderScanBar() {
    const {isShowScanBar, scanBarImage}: any = this.props;

    if (!isShowScanBar) {
      return;
    }
    return scanBarImage ? (
      <Image
        source={scanBarImage}
        style={[
          this.innerScanBarStyle,
          {
            resizeMode: 'contain',
            backgroundColor: 'transparent',
            width: this.getScanImageWidth(),
          },
        ]}
      />
    ) : (
      <View style={[{height: 4}, this.innerScanBarStyle]} />
    );
  }

  render() {
    const animatedStyle = {
      transform: [{translateY: this.state.animatedValue}],
    };

    const {borderWidth} = this.innerCornerStyle;
    const {isShowCorner}: any = this.props;

    return (
      <View style={[{bottom: 0, width: WIDTH, flex: 1}]}>
        <View style={[this.getBackgroundColor(), {flex: 0.5}]} />

        <View style={{flexDirection: 'row'}}>
          <View style={[this.getBackgroundColor(), {flex: 1}]} />

          <View
            style={[
              this.getRectSize(),
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View style={this.getBorderStyle()}>
              <Animated.View style={animatedStyle}>
                {this.renderScanBar()}
              </Animated.View>
            </View>
            {isShowCorner && (
              <View
                style={[
                  this.getCornerStyle(),
                  // styles.topLeftCorner,
                  {
                    borderLeftWidth: borderWidth,
                    borderTopWidth: borderWidth,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                ]}
              />
            )}
            {isShowCorner && (
              <View
                style={[
                  this.getCornerStyle(),
                  // styles.topRightCorner,
                  {
                    borderRightWidth: borderWidth,
                    borderTopWidth: borderWidth,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  },
                ]}
              />
            )}

            {isShowCorner && (
              <View
                style={[
                  this.getCornerStyle(),
                  // styles.bottomLeftCorner,
                  {
                    borderLeftWidth: borderWidth,
                    borderBottomWidth: borderWidth,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  },
                ]}
              />
            )}

            {isShowCorner && (
              <View
                style={[
                  this.getCornerStyle(),
                  // styles.bottomRightCorner,
                  {
                    borderRightWidth: borderWidth,
                    borderBottomWidth: borderWidth,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  },
                ]}
              />
            )}
          </View>

          <View style={[this.getBackgroundColor(), {flex: 1}]} />
        </View>

        <View
          style={[
            this.getBackgroundColor(),
            {flex: 1, alignItems: 'center', paddingHorizontal: 32},
          ]}>
          <Text style={{...this.innerHintTextStyle, textAlign: 'center'}}>
            {/* @ts-ignore */}
            {this.props.hintText}
          </Text>
        </View>

        <View style={[this.getBackgroundColor(), this.getRectOffsetHeight()]} />
      </View>
    );
  }
}
