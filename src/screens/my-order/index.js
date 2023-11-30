import { useIsFocused } from '@react-navigation/native';
import { CrossModal } from 'assets/icons';
import { PrimaryButton } from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import { Loader } from 'components/atoms/loader';
import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import { Row } from 'components/atoms/row';
import MyOrderCard from 'components/molecules/my-order-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React, { useEffect } from 'react';
import {
  Alert,
  Modal,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  getOrderListList,
  getOrderStatusChange,
  getOrderStatusChange2,
} from 'services/api/auth-api-actions';
import { onCreateConveration } from 'services/api/chat-api-actions';
import i18n from 'translation';
import { UTILS } from 'utils';
import styles from './styles';

const MyOrderScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [chatLoading, setChatLoading] = React.useState(false);
  const [id, setId] = React.useState();
  const [isRejectInputVisible, setIsRejectInputVisible] = React.useState(false);
  const [reason, setReason] = React.useState('');
  const isFocus = useIsFocused();

  React.useEffect(() => {
    if (isFocus) {
      getList();
    }
  }, [isFocus]);
  const onMessagePress = async user_id => {
    try {
      setChatLoading(true);
      const res = await onCreateConveration({
        receiver_id: user_id,
      });
      console.log('create message res check karna===>', res);
      navigate('InboxScreen', {
        id: res?.conversation_id,
        // title: res?.title,
        title: res?.receiver_name,
        email: res?.receiver_email,
        image: res?.receiver_image,
      });
    } catch (error) {
      console.log('Error in create conversion====>', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setChatLoading(false);
    }
  };
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getOrderListList();
      setOrderData(res?.data);

      console.log(res?.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getList()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };

  const onPressAccept = itemId => {
    // Display an alert to confirm the acceptance
    Alert.alert(
      'Confirm Acceptance',
      'Do you want to accept this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            // If the user confirms the acceptance, call the ChangeStatus function
            ChangeStatus(itemId, 1);
            // Then, refresh the list
            Alert.alert('Order has been accepted');
            getList();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onPressReject = itemId => {
    // Display an alert to confirm the rejection
    Alert.alert(
      'Confirm Rejection',
      'Do you want to reject this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reject',
          onPress: () => {
            // If the user confirms the rejection, call the ChangeStatus function
            ChangeStatus2(itemId, 0, reason);
            Alert.alert('Order has been Rejected');
            setReason('');
            // Then, refresh the list
            getList();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const ChangeStatus = async (id, status) => {
    console.log('id', id, status);
    // return;
    try {
      // const status = isRejected ? 0 : 1;

      const res = await getOrderStatusChange(id, status);

      console.log('resp==========>', res);
    } catch (error) {
      console.log('Error:', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  const ChangeStatus2 = async (id, status, reason) => {
    console.log('id', id, status, reason);
    // return;
    try {
      // const status = isRejected ? 0 : 1;

      const res = await getOrderStatusChange2(id, status, reason);

      console.log('resp==========>', res);
    } catch (error) {
      console.log('Error:', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  useEffect(() => {}, []);
  const renderAppointmentItem = ({item, index}) => (
    <MyOrderCard
      item={item}
      onPressDetails={() =>
        props?.navigation?.navigate(
          'OrderDetailsScreen',
          {
            id: item?.id,
          },
          console.log('sl', id),
        )
      }
      onPressChat={() => onMessagePress(item?.user_id)}
      chatLoading={chatLoading}
      // acceptTitle={item?.status === 'free' ? t('accept') : item?.status}
      // acceptTitle={
      //   item?.status === 'free' || item?.status === 'paid'
      //     ? t('accept')
      //     : item?.status
      // }
      acceptTitle={
        (acceptTitle =
          item?.status === 'free' || item?.status === 'paid'
            ? t('accept')
            : item?.status === 'start'
            ? 'Started'
            : item?.status === 'accepted'
            ? 'Accepted'
            : item?.status === 'delivered'
            ? 'Completed'
            : item?.status)
      }
      disabledAccept={
        item?.status === 'accepted' ||
        item?.status === 'delivered' ||
        item?.status === 'start'
      }
      // onRefreshList={getList}
      onPressAccept={() => onPressAccept(item?.id)}
      // To accept the order
      onPressReject={() => {
        setIsRejectInputVisible(true), setId(item?.id);
      }}
      // To reject the order
      // onPressReject={() => onPressReject(item?.id)} // To reject the order
    />
  );
  console.log('id', orderData?.id);
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('my_order')} />
      <View style={styles.contentContainerStyle}>
        <Row style={{marginBottom: mvs(20)}}>
          <PrimaryButton
            title={t('accepted')}
            containerStyle={{
              width: '30%',
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'accepted' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'accepted' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'accepted') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('accepted');
              }
            }}
          />
          <PrimaryButton
            title={t('start')}
            containerStyle={{
              width: '30%',
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'start' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color: selectedOrder === 'start' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'start') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('start');
              }
            }}
          />
          <PrimaryButton
            title={t('completed')}
            containerStyle={{
              width: '30%',
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'delivered' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'delivered' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'delivered') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('delivered');
              }
            }}
          />
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            // emptyList={<EmptyList label={t('no_notification')} />}
            contentContainerStyle={styles.contentContainerStyleFlatlist}
            showsVerticalScrollIndicator={false}
            data={
              !selectedOrder
                ? orderData
                : orderData?.filter(item => item?.status === selectedOrder)
            }
            // data={orderData}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#ff0000', '#00ff00', '#0000ff']}
              />
            }
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent()}
            keyExtractor={(_, index) => index?.toString()}
          />
        )}
      </View>
      {isRejectInputVisible && (
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
                value={reason}
                onChangeText={text => setReason(text)}
                multiline={true} // Allow multiline input
                numberOfLines={6} // Set the number of lines you want to display
                textAlignVertical="top"
              />
              <PrimaryButton
                title="Confirm Reject"
                onPress={() => {
                  onPressReject(id); // Pass the reason to onPressReject
                  setIsRejectInputVisible(false); // Close the modal
                }}
              />
            </View>
          </View>
        </Modal>
      )}
      {console.log('orderData?.id', orderData?.id)}
      {/* <PlusButton /> */}
    </View>
  );
};
export default MyOrderScreen;
