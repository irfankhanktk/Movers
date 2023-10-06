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
import {mvs, width} from '../../../config/metrices';
import {SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ColorSpace} from 'react-native-reanimated';
const LabelValue = ({label, value, containerStyle, labelStyle, valueStyle}) => (
  <Row style={containerStyle}>
    <Medium
      style={labelStyle}
      label={label}
      fontSize={mvs(12)}
      color={colors.white}
    />
    <Regular
      style={valueStyle}
      label={value}
      fontSize={mvs(12)}
      color={colors.white}
    />
  </Row>
);
const OrderDetailsCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;

  return (
    <View onPress={onPress} style={styles.contentContainerStyleNew}>
      {/* <Row
        style={{
          padding: mvs(10),
          borderBottomWidth: mvs(1),
          borderBottomColor: colors.white,
        }}>
        <Medium
          label={`${t('Odrer')}: #${item?.Order_no} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
        <Medium label={item?.date} fontSize={mvs(16)} color={colors.white} />
      </Row> */}
      <LabelValue
        containerStyle={{
          paddingVertical: mvs(8),
          borderBottomWidth: mvs(1),
          borderBottomColor: colors.white,
        }}
        label={`${t('Odrer')}: #${item?.id} `}
        value={item?.date}
      />
      {/* <View
        style={{
          flex: 1,
          paddingVertical: mvs(5),
        }}> */}
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('Name')}
        value={item?.name || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('delivery_time')}
        value={item?.pickup_date || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('pickup_location')}
        value={item?.value?.pickup_address || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('dropoff_location')}
        value={item?.dropoff_address || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('service_type')}
        value={item?.service_type}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
    </View>
    // </View>
  );
};
export default React.memo(OrderDetailsCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(327),
    width: mvs(147),
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    borderWidth: 1,
    backgroundColor: colors.primary,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
  },
  contentContainerStyleNew: {
    marginVertical: mvs(10),
    overflow: 'hidden',
    paddingVertical: mvs(8),
    // borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    // borderRadius: mvs(6),
    borderBottomWidth: mvs(1),
    borderBottomColor: colors.white,
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
