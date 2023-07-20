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

const AdviceFromUsCard = ({
  item,
  style,
  onPress = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;

  return (
    <View style={styles.container}>
      <View
        style={{width: '100%', height: mvs(200), paddingHorizontal: mvs(10)}}>
        <Image
          source={{uri: `${item?.image}`}}
          // imageStyle={styles.imgStyle}
          style={styles.imgStyle}></Image>
      </View>
      <View
        style={{
          marginLeft: mvs(10),

          paddingVertical: mvs(6),
        }}>
        <Medium label={item?.title} color={colors.primary} fontSize={mvs(16)} />
        <Medium
          label={item?.desc}
          fontSize={mvs(14)}
          numberOfLines={100}
          style={{lineHeight: mvs(20)}}
        />
      </View>
    </View>
  );
};
export default React.memo(AdviceFromUsCard);
const styles = StyleSheet.create({
  container: {
    // height: mvs(50),
    // width: '20%',
    // borderRadius: mvs(15),
    // marginBottom: mvs(20),

    // ...colors.shadow,
    flex: 1,
  },
  row: {alignItems: 'flex-end'},
  // bg: {
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'flex-end',
  // },
  btn: {
    backgroundColor: colors.white,
    height: mvs(28),
    width: mvs(96),
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  btnTxt: {color: colors.primary, fontSize: mvs(12), lineHeight: mvs(16)},
  imgStyle: {
    borderRadius: mvs(6),
    resizeMode: 'cover',
    height: '100%',

    width: '100%',
    // alignSelf: 'center',
  },

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
