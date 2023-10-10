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
import {ColorSpace} from 'react-native-reanimated';

const MyOrderCard = ({
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
  const [isAccepted, setIsAccepted] = React.useState(false);
  const handleAccept = () => {
    setIsAccepted(true);
    onPressAccept(item?.id, 1); // Pass 1 to represent acceptance
  };

  const handleReject = () => {
    onPressReject(item?.id, 0); // Pass 0 to represent rejection
  };
  return (
    <Row onPress={onPress} style={styles.contentContainerStyleNew}>
      <View style={{alignSelf: 'center', padding: mvs(10)}}>
        <Medium
          label={`${t('Odrer')} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
        <Medium
          label={`#${item?.id || 'N/A'} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingVertical: mvs(5),
        }}>
        <Medium
          label={item?.pickup_date || 'N/A'}
          color={colors.bluecolor}
          fontSize={mvs(14)}
          style={{
            borderBottomWidth: mvs(1),
            borderBottomColor: colors.border,
            marginLeft: mvs(10),
            paddingBottom: mvs(5),
          }}
        />

        <Row
          style={{
            paddingHorizontal: mvs(10),
            paddingVertical: mvs(8),
            // justifyContent: 'flex-start',
          }}>
          <Medium
            label={t('Name')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.name || 'N/A'}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(8)}}>
          <Medium
            style={{width: mvs(110)}}
            label={t('delivery_time')}
            fontSize={mvs(12)}
            color={colors.black}
          />
          <Medium
            label={`${item?.pickup_date || 'N/A'}`}
            numberOfLines={1}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(8)}}>
          <Medium
            label={t('pickup_location')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.pickup_address || 'N/A'}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(8)}}>
          <Medium
            label={t('service_type')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.service?.title || 'N/A'}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>

        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(8)}}>
          {isAccepted ? (
            <PrimaryButton
              title={t('accepted')}
              containerStyle={{
                width: mvs(80),
                height: mvs(30),
                backgroundColor: colors.acceptcolor,
                borderColor: colors.lightGray,
              }}
              textStyle={{
                color: colors.white,
              }}
              disabled // Disable the button
            />
          ) : (
            <>
              <PrimaryButton
                title={t('accept')}
                containerStyle={{
                  width: mvs(80),
                  height: mvs(30),
                  backgroundColor: colors.acceptcolor,
                  borderColor: colors.lightGray,
                }}
                textStyle={{
                  color: colors.white,
                }}
                onPress={handleAccept}
              />
              <PrimaryButton
                title={t('rejected')}
                containerStyle={{
                  width: mvs(80),
                  height: mvs(30),
                  backgroundColor: colors.primary,
                  ...colors.shadow,
                }}
                textStyle={{
                  color: colors.white,
                }}
                onPress={handleReject}
              />
            </>
          )}
          <PrimaryButton
            title={t('details')}
            containerStyle={{
              width: mvs(80),
              height: mvs(30),
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
              ...colors.shadow,
            }}
            textStyle={{
              color: colors.primary,
            }}
            onPress={onPressDetails}
          />
        </Row>
      </View>
    </Row>
  );
};
export default React.memo(MyOrderCard);
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
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(6),
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
