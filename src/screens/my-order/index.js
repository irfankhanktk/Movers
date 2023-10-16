import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {Alert, FlatList, Image, RefreshControl, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {EmptyList} from 'components/atoms/empty-list';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import MyOrderCard from 'components/molecules/my-order-card';
import {ORDER_LIST} from 'config/constants';
import {
  getOrderListList,
  getOrderStatusChange,
} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import {useIsFocused} from '@react-navigation/native';
import {onCreateConveration} from 'services/api/chat-api-actions';
import {navigate} from 'navigation/navigation-ref';

const MyOrderScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [chatLoading, setChatLoading] = React.useState(false);
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
        title: res?.title,
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
            ChangeStatus(itemId, 0);
            Alert.alert('Order has been Rejected');
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
  useEffect(() => {}, []);
  const renderAppointmentItem = ({item, index}) => (
    <MyOrderCard
      item={item}
      onPressDetails={() =>
        props?.navigation?.navigate('OrderDetailsScreen', {
          id: item?.id,
        })
      }
      onPressChat={() => onMessagePress(item?.user_id)}
      chatLoading={chatLoading}
      // acceptTitle={item?.status === 'free' ? t('accept') : item?.status}
      acceptTitle={item?.status === 'free' ? t('accept') : t('accepted')}
      disabledAccept={item?.status === 'accepted'}
      // onRefreshList={getList}
      onPressAccept={() => onPressAccept(item?.id)} // To accept the order
      onPressReject={() => onPressReject(item?.id)} // To reject the order
    />
  );
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
              width: mvs(88),
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
            title={t('paid')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'paid' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color: selectedOrder === 'paid' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'paid') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('paid');
              }
            }}
          />
          <PrimaryButton
            title={t('completed')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'completed' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'completed' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'completed') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('completed');
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
      {/* <PlusButton /> */}
    </View>
  );
};
export default MyOrderScreen;
