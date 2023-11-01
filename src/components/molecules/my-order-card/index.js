import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import React from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TextInput,
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
import {SendIcon, SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ColorSpace} from 'react-native-reanimated';
import moment from 'moment';
import {CheckmarkAnimation, CrossModal, OTPAnimation} from 'assets/icons';
const MyOrderCard = ({
  item,
  backgroundColor,
  index,
  style,
  acceptTitle,
  rejectTitle,
  onRefreshList,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
  onPressChat = () => {},
  disabledAccept,
}) => {
  // console.log(';iteem user id', item);
  const {t} = i18n;
  const [isAccepted, setIsAccepted] = React.useState(false);
  // const [isRejectInputVisible, setIsRejectInputVisible] = React.useState(false);
  // const [rejectReason, setRejectReason] = React.useState('');
  const handleAccept = () => {
    setIsAccepted(true);
    onPressAccept(item?.id, 1);
    // onRefreshList(); // Pass 1 to represent acceptance
  };

  const handleReject = () => {
    onPressReject(item?.id, 0);
    // onRefreshList(); // Pass 0 to represent rejection
  };
  return (
    <Row onPress={onPress} style={styles.contentContainerStyleNew}>
      <View style={{alignSelf: 'center', padding: mvs(10)}}>
        <Medium
          label={`${t('Order')} `}
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
        <Row
          style={{
            borderBottomWidth: mvs(1),
            borderBottomColor: colors.border,
            marginHorizontal: mvs(10),
            marginVertical: mvs(10),
          }}>
          <Medium
            label={item?.service?.title}
            // label={
            //   item?.pickup_date
            //     ? moment(item.pickup_date).format('DD-MM-YYYY')
            //     : 'N/A'
            // }
            color={colors.bluecolor}
            fontSize={mvs(14)}
            style={{
              width: mvs(130),
              // marginLeft: mvs(10),
              // paddingBottom: mvs(5),
            }}
            numberOfLines={2}
          />
          {['start', 'accepted', 'delivered'].includes(item?.status) && (
            <TouchableOpacity onPress={onPressChat}>
              <Row
                style={{
                  width: mvs(100),
                  height: mvs(40),
                  backgroundColor: colors.primary,
                  borderColor: colors.lightGray,
                  marginBottom: mvs(10),
                  borderRadius: mvs(5),
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <SendIcon
                  // width={mvs(15)}
                  // height={mvs(20)}
                  style={{marginLeft: mvs(5)}}
                />
                <Regular
                  label={t('chat_now')}
                  fontSize={mvs(12)}
                  color={colors.white}
                  style={{marginRight: mvs(5)}}
                />
              </Row>
            </TouchableOpacity>
          )}
        </Row>

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
            label={t('phone')}
            fontSize={mvs(12)}
            color={colors.black}
          />
          <Medium
            label={item?.phone || 'N/A'}
            // label={
            //   item?.pickup_date
            //     ? moment(item.pickup_date).format('DD-MM-YYYY')
            //     : 'N/A'
            // }
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
            label={t('price')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.price || 'N/A'}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>

        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(8)}}>
          {/* {isAccepted ? ( */}
          {/* <PrimaryButton
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
            /> */}
          {/* ) : (
            <> */}
          <PrimaryButton
            title={acceptTitle}
            // title={t('accept')}
            containerStyle={{
              width: mvs(90),
              height: mvs(30),
              backgroundColor: colors.acceptcolor,
              borderColor: colors.lightGray,
            }}
            textStyle={{
              color: colors.white,
              fontSize: mvs(12),
            }}
            onPress={onPressAccept}
            disabled={disabledAccept}
            // onPressAccept
            // onPress={handleAccept}
          />
          {item?.status === 'accepted' ||
          item?.status === 'start' ||
          item?.status === 'delivered' ? null : ( // Do not render the "Reject" button when status is "accepted"
            <PrimaryButton
              title={t('reject')}
              containerStyle={{
                width: mvs(80),
                height: mvs(30),
                backgroundColor: colors.primary,
                ...colors.shadow,
              }}
              textStyle={{
                color: colors.white,
              }}
              onPress={onPressReject}
              // onPress={() => setIsRejectInputVisible(true)}
            />
          )}
          {/* </> */}
          {/* )} */}
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
      {/* {isRejectInputVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRejectInputVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setIsRejectInputVisible(false)}
                style={styles.cross}>
                <CrossModal height={mvs(30)} width={mvs(30)} />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Enter rejection reason"
                value={rejectReason}
                onChangeText={text => setRejectReason(text)}
                multiline={true} // Allow multiline input
                numberOfLines={6} // Set the number of lines you want to display
                textAlignVertical="top"
              />
              <PrimaryButton
                title="Confirm Reject"
                onPress={() => {
                  onPressReject(item?.id, 0, rejectReason); // Pass the reason to onPressReject
                  setIsRejectInputVisible(false); // Close the modal
                }}
              />
            </View>
          </View>
        </Modal>
      )} */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white',
    padding: mvs(20),
    height: mvs(300),
    borderRadius: mvs(10),
  },
  textInput: {
    marginTop: mvs(30),
    borderWidth: mvs(1),
    borderColor: colors.black,
    padding: mvs(10),
    marginBottom: mvs(10),
    borderRadius: mvs(10),
    height: mvs(130),
  },
  cross: {
    padding: mvs(14),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: mvs(-5),
  },
});
