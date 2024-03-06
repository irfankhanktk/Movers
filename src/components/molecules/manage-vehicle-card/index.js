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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ColorSpace} from 'react-native-reanimated';
import moment from 'moment';
import {DATE_FORMAT} from 'config/constants';
const LabelValue = ({label, value, containerStyle, labelStyle, valueStyle}) => (
  <Row style={containerStyle}>
    <Medium
      style={labelStyle}
      label={label}
      fontSize={mvs(12)}
      color={colors.black}
    />
    <Regular
      style={valueStyle}
      label={value}
      fontSize={mvs(12)}
      // color={colors.gray}
    />
  </Row>
);
const MangeVehcileCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressEdit = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;

  return (
    <View style={[styles.contentContainerStyleNew, {backgroundColor}]}>
      <View style={{marginTop: mvs(6)}}>
        <TouchableOpacity
          style={{
            paddingHorizontal: mvs(20),
            alignSelf: 'flex-end',
          }}
          onPress={onPressEdit}>
          <FontAwesome name={'edit'} color={colors.white} size={mvs(25)} />
        </TouchableOpacity>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Medium
            label={t('vehicle_type')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(16)}
          />
          <Medium
            label={item?.vehicle_type}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(16)}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('vehicle_model')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            label={item?.vehicle_model}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('vehicle_number')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            label={item?.vehicle_number}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={'Vehicle Price'}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            label={item?.vehicle_price}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('vehicle_year')}
            color={colors.white}
            fontSize={mvs(12)}
            style={{width: mvs(170)}}
          />
          <Regular
            label={item?.vehicle_year}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('vehicle_make')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            label={item?.vehicle_make}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>

        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('vehicle_load_capacity')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            label={item?.vehicle_load_capacity}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>

        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('created_at')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            // moment().format(DATE_FORMAT.yyyy_mm_dd)
            label={moment(item?.created_at).format('DD MMM, YYYY  hh:mm a')}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
            numberOfLines={2}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(20), paddingVertical: mvs(2)}}>
          <Regular
            label={t('order_count')}
            color={colors.white}
            style={{width: mvs(170)}}
            fontSize={mvs(12)}
          />
          <Regular
            // moment().format(DATE_FORMAT.yyyy_mm_dd)
            label={item?.order_count}
            color={colors.white}
            style={{flex: 1}}
            fontSize={mvs(12)}
          />
        </Row>
      </View>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          // top: mvs(40),
          right: mvs(10),
          bottom: mvs(-80),
        }}>
        <Image
          // source={item?.icon}
          source={
            item?.vehicle_type === 'Car' || item?.vehicle_type === 'car'
              ? IMG.hondablackvehicle
              : item?.vehicle_type === 'Truck'
              ? IMG.truckvehicle
              : item?.vehicle_type === 'Motor Cycle'
              ? IMG.Bike
              : ''
          }
          resizeMode="contain"
          style={{
            width: mvs(180),
            height: mvs(122),
          }}
        />
      </View>
    </View>
    // </View>
  );
};
export default React.memo(MangeVehcileCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(327),
    width: mvs(147),
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    borderWidth: 1,
    backgroundColor: colors.white,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
  },
  contentContainerStyleNew: {
    // marginVertical: mvs(10),
    marginBottom: mvs(60),
    paddingVertical: mvs(8),
    width: '100%',
    height: mvs(300),
    // borderColor: colors.primary,
    backgroundColor: colors.primary,
    // justifyContent: 'space-between',
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(30),
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
