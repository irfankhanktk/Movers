import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import {SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';

const ServiceCard = ({
  item,
  style,
  onPress = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{uri: `${item?.image}`}}
        imageStyle={styles.imgStyle}
        style={styles.bg}>
        <LinearGradient
          style={styles.grd}
          colors={[
            `${colors.black}30`,
            `${colors.black}70`,
            `${colors.black}50`,
          ]}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',

              flex: 1,
            }}>
            <Image
              source={item?.icon}
              style={{height: mvs(50), width: mvs(50), resizeMode: 'contain'}}
            />
            <Medium
              label={item?.title}
              color={colors.white}
              fontSize={mvs(16)}
            />
            <Regular
              label={item?.desc}
              numberOfLines={1}
              color={colors.white}
              fontSize={mvs(14)}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default React.memo(ServiceCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(170),
    width: '47%',
    borderRadius: mvs(15),
    marginBottom: mvs(20),

    ...colors.shadow,
  },
  row: {alignItems: 'flex-end'},
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.white,
    height: mvs(28),
    width: mvs(96),
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  btnTxt: {color: colors.primary, fontSize: mvs(12), lineHeight: mvs(16)},
  imgStyle: {borderRadius: mvs(15)},

  grd: {
    height: '100%',
    padding: mvs(15),
    borderRadius: mvs(15),
  },
  heartContainer: {
    position: 'absolute',
    right: mvs(20),
    top: mvs(-13),
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(30),
    width: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: colors.red,
  },
});
