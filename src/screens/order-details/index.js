import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {EmptyList} from 'components/atoms/empty-list';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import MyOrderCard from 'components/molecules/my-order-card';
import {
  ITEM_DETAILS_LIST,
  ORDER_DETAILS_LIST,
  ORDER_LIST,
} from 'config/constants';
import MapDirections from 'components/atoms/map-directions';
import CustomMap from 'components/atoms/custom-map';
import {Marker} from 'react-native-maps';
import OrderDetailsCard from 'components/molecules/order-details-card';
import ItemDetailsCard from 'components/molecules/item-details-card';
import {
  getDistance,
  getOrderDetails,
  getOrderDetailsStatusChange,
  getOrderStatusChange,
} from 'services/api/auth-api-actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {UTILS} from 'utils';
import {onCreateConveration} from 'services/api/chat-api-actions';
import {navigate} from 'navigation/navigation-ref';
const OrderDetailsScreen = props => {
  const {id} = props?.route?.params;
  console.log(id);
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [quantityData, setQuantityData] = React.useState({});
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [orderData, setOrderData] = React.useState({});
  const [chatLoading, setChatLoading] = React.useState(false);
  const [total, setTotal] = React.useState({});

  // const [orderStatus, setOrderStatus] = React.useState(
  //   orderData?.driver_status === null
  //     ? 'start'
  //     : orderData?.driver_status || 'start',
  // );
  // const [orderStatus, setOrderStatus] = React.useState(() => {
  //   if (orderData?.driver_status === null) {
  //     return 'start';
  //   } else if (orderData?.driver_status === 'delivered') {
  //     return 'delivered';
  //   } else {
  //     return 'start';
  //   }
  // });

  // console.log('orderStatus', orderStatus);

  // React.useEffect(() => {
  //   setOrderStatus(orderData?.driver_status || 'start');
  // }, [orderData.driver_status]);
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const onMessagePress = async user_id => {
    try {
      setChatLoading(true);
      const res = await onCreateConveration({
        receiver_id: user_id,
      });
      console.log('create message res check karna===>', res);
      navigate('InboxScreen', {
        id: res?.conversation_id,
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

  // const ChangeStatus = async (status, id) => {
  //   try {
  //     // Assuming you have an API call to update the status and receive the new status.
  //     // You can adapt this part according to your API implementation.
  //     let newStatus;

  //     if (status === 'start') {
  //       newStatus = 'delivered';
  //     } else if (status === 'delivered') {
  //       newStatus = 'delivered'; // Change to 'completed' when 'delivered'
  //     }

  //     const res = await getOrderDetailsStatusChange(newStatus, id);

  //     // Update the button title based on the new status
  //     const newTitle =
  //       newStatus === 'start'
  //         ? 'Start'
  //         : newStatus === 'delivered'
  //         ? 'Delivered'
  //         : 'Delivered';

  //     // Update the orderStatus state
  //     setOrderStatus(newStatus);

  //     console.log('New status:', newStatus);
  //     console.log('resp==========>', res);
  //   } catch (error) {
  //     console.log('Error:', UTILS.returnError(error));
  //     Alert.alert('Error', UTILS.returnError(error));
  //   }
  // };

  // const ChangeStatus = async (status, id) => {
  //   try {
  //     const res = await getOrderDetailsStatusChange(status, id);

  //     // Update the button title based on the new status
  //     const newTitle =
  //       status === 'start'
  //         ? 'Start'
  //         : status === 'delivered'
  //         ? 'Delivered'
  //         : 'Delivered';

  //     // Update the orderStatus state
  //     setOrderStatus(status);
  //     getList();

  //     console.log('New status:', status);
  //     console.log('resp==========>', res);
  //   } catch (error) {
  //     console.log('Error:', UTILS.returnError(error));
  //     Alert.alert('Error', UTILS.returnError(error));
  //   }
  // };
  const ChangeStatus = async (status, id) => {
    console.log('id', status, id);
    // return;
    try {
      // const status = isRejected ? 0 : 1;

      const res = await getOrderDetailsStatusChange(status, id);

      console.log('resp==========>', res);
    } catch (error) {
      console.log('Error:', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };

  const onPressAccept = () => {
    // Display an alert to confirm the acceptance
    Alert.alert(
      'Start',
      'Do you want to Start this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: () => {
            // If the user confirms the acceptance, call the ChangeStatus function
            ChangeStatus('start', id);
            // Then, refresh the list
            Alert.alert('Order has been Started');
            getList();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const onPressReject = () => {
    // Display an alert to confirm the acceptance
    Alert.alert(
      'Complete',
      'Are you sure you want to complete this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Completed',
          onPress: () => {
            // If the user confirms the acceptance, call the ChangeStatus function
            ChangeStatus('delivered', id);
            // Then, refresh the list
            Alert.alert('Order has been Completed');
            getList();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetails(id);
      setOrderData(res?.value);

      console.log('data', res?.value);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getList();
  }, []);
  const origin = {
    latitude: orderData?.pickup_lat * 1 || 37.78825,
    longitude: orderData?.pickup_long * 1 || -122.4324,
  };
  console.log(
    'lat',
    orderData?.pickup_lat,
    orderData?.pickup_long,
    orderData?.dropoff_lat,
    orderData?.dropoff_long,
  );
  const destination = {
    latitude: orderData?.dropoff_lat * 1 || 37.7749,
    longitude: orderData?.dropoff_long * 1 || -122.4194,
  };

  const renderAppointmentItem = ({item, index}) => {
    // // Filter out items with type 'hidden' or 'header'
    // const visibleItems = Array.isArray(item.values)
    //   ? item.values.filter(
    //       value => value.type !== 'hidden' && value.type !== 'header',
    //     )
    //   : [];

    // // Find the selected label in visibleItems
    // const selectedValue = visibleItems.find(value => value.selected === 1);
    // const selectedLabel = selectedValue ? selectedValue.label : '';

    // // Find the corresponding quantity_json value based on the selectedLabel
    // const quantityJson = orderData?.quantity_json
    //   ? JSON.parse(orderData.quantity_json)
    //   : {};

    // const quantity = quantityJson[selectedLabel] || '';

    // // Check if there are visible items to render
    // if (visibleItems.length > 0) {
    return (
      <ItemDetailsCard
        item={item}
        // selectedLabel={selectedLabel}
        // quantity={quantity}
      />
    );
    // } else {
    //   return null; // Don't render anything if no visible items
    // }
  };
  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
    Linking.openURL(url);
  };

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  // const origin = {latitude: 37.78825, longitude: -122.4324};
  // const destination = {latitude: 37.7749, longitude: -122.4194};

  // const getTimeDistance = async () => {
  //   try {
  //     const res = await getDistance(
  //       origin?.latitude,
  //       destination?.latitude,
  //       origin?.longitude,
  //       destination?.longitude,
  //     );
  //     setTotalDistance(res);
  //   } catch (error) {
  //     console.log('Error in getdiustance====>', error);
  //     Alert.alert('Error', UTILS.returnError(error));
  //   } finally {
  //   }
  // };
  // useEffect(() => {
  //   getTimeDistance();
  // }, [total]);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('order_details')} />
      {loading ? (
        <Loader color={colors.white} />
      ) : (
        <View style={{flex: 1}}>
          {orderData ? (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{height: mvs(250)}}>
                <CustomMap
                  initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}>
                  <Marker coordinate={origin} />
                  <Marker coordinate={destination} />
                  <MapDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={3}
                    strokeColor="blue"
                  />
                </CustomMap>
              </View>
              <TouchableOpacity
                style={{
                  // width: mvs(120),
                  paddingHorizontal: mvs(10),
                  paddingVertical: mvs(5),
                  backgroundColor: colors.white,
                  position: 'absolute',
                  top: mvs(180),
                  right: mvs(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: mvs(5),
                }}
                onPress={openGoogleMapsDirections}>
                <Row style={{alignItems: 'center'}}>
                  <FontAwesome5
                    name="directions"
                    size={mvs(30)}
                    color={colors.bluecolor}
                  />
                  <Medium
                    label={t('get_direction')}
                    color={colors.primary}
                    fontSize={mvs(12)}
                    style={{marginLeft: mvs(10)}}
                  />

                  {/* <PrimaryButton
                  title="Get Directions"
                  onPress={openGoogleMapsDirections}
                  containerStyle={{backgroundColor: colors.green}}
                /> */}
                </Row>
              </TouchableOpacity>
              <View style={styles.contentContainerStyle}>
                <OrderDetailsCard item={orderData} />

                <Medium
                  label={t('item_details')}
                  color={colors.white}
                  style={{alignSelf: 'center'}}
                />
                <CustomFlatList
                  // emptyList={<EmptyList label={t('no_notification')} />}
                  contentContainerStyle={styles.contentContainerStyleFlatlist}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={orderData?.json}
                  renderItem={renderAppointmentItem}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  // ItemSeparatorComponent={itemSeparatorComponent()}
                  keyExtractor={(_, index) => index?.toString()}
                />
              </View>
            </ScrollView>
          ) : (
            <Medium label={t('no_order_data')} /> // Render an empty state when orderData is not available yet
          )}
          <Row
            style={{
              paddingHorizontal: mvs(20),
              alignItems: 'center',
              marginBottom: mvs(20),
              paddingTop: mvs(16),
            }}>
            {/* {orderData?.status === 'accepted' && (
              <PrimaryButton
                containerStyle={styles.acceptbutton}
                // title={
                //   orderStatus === null || orderStatus === ''
                //     ? 'Start'
                //     : orderStatus === 'start'
                //     ? 'Delivered'
                //     : orderStatus === 'delivered'
                //     ? 'Delivered'
                //     : 'Unknown'
                // }
                title={
                  orderData?.driver_status === null
                    ? 'start'
                    : orderData?.driver_status === 'delivered'
                    ? 'delivered'
                    : 'start'
                }
                // title={orderStatus === 'start' ? 'Delivered' : 'Start'}
                // onPress={() => {
                //   // Calculate the new status based on the current status
                //   const newStatus =
                //     orderStatus === null || orderStatus === ''
                //       ? 'start'
                //       : orderStatus === 'start'
                //       ? 'delivered'
                //       : orderStatus === 'delivered'
                //       ? 'delivered'
                //       : 'unknown';
                //   // Call the ChangeStatus function with the new status and the id
                //   ChangeStatus(newStatus, id);
                // }}
                // onPress={() => {
                //   // Calculate the new status based on the current status
                //   const newStatus =
                //     orderStatus === 'start' ? 'delivered' : 'start';
                //   // Call the ChangeStatus function with the new status and the id
                //   ChangeStatus(newStatus, id);
                // }}
                onPress={() => {
                  if (orderStatus === 'start') {
                    // Call the ChangeStatus function to change status to 'delivered'
                    ChangeStatus('delivered', id);
                  } else if (orderStatus === 'delivered') {
                    // No need to change status, just call the ChangeStatus function
                    ChangeStatus('delivered', id);
                  }
                }}
              />
            )} */}
            {/* {
              orderData?.driver_status === null ? (
                <PrimaryButton
                  containerStyle={styles.acceptbutton}
                  title={'start'}
                  onPress={() => onPressAccept(id)}
                />
              ) : orderData?.driver_status === 'start' ||
                orderData?.driver_status === 'delivered' ? (
                <PrimaryButton
                  containerStyle={styles.acceptbutton}
                  title={'delivered'}
                  onPress={() => onPressReject(id)}
                />
              ) : null // Agar koi aur condition nahi milti to null return karein
            } */}
            {orderData?.status !== 'free' &&
              orderData?.status !== 'paid' &&
              (orderData?.driver_status === null ||
                orderData?.driver_status === 'start' ||
                orderData?.driver_status === 'delivered') && (
                <PrimaryButton
                  containerStyle={styles.acceptbutton}
                  // title={
                  //   orderData?.driver_status === 'delivered' ||
                  //   orderData?.driver_status === 'start'
                  //     ? 'Delivered'
                  //     : 'Start'
                  // }
                  title={
                    orderData?.driver_status === 'delivered'
                      ? 'Completed'
                      : orderData?.driver_status === 'start'
                      ? 'Complete'
                      : 'Start'
                  }
                  disabled={orderData?.driver_status === 'delivered'}
                  onPress={
                    orderData?.driver_status === 'delivered' ||
                    orderData?.driver_status === 'start'
                      ? () => onPressReject(id)
                      : () => onPressAccept(id)
                  }
                />
              )}
            {['start', 'accepted', 'delivered'].includes(orderData?.status) && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  paddingHorizontal: mvs(10),
                  paddingVertical: mvs(5),
                  borderRadius: mvs(6),
                }}
                onPress={() => onMessagePress(orderData?.user_id)}>
                <Row style={{alignItems: 'center'}}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    color={colors.primary}
                    size={mvs(20)}
                  />
                  <Medium
                    label={t('chat')}
                    color={colors.primary}
                    fontSize={mvs(16)}
                    style={{marginLeft: mvs(6)}}
                  />
                </Row>
              </TouchableOpacity>
            )}
            {/* {orderData?.status === 'accepted' && (
              // <Row style={{}}>
              <PrimaryButton
                containerStyle={styles.phonebutton}
                // loading={loading}
                title={t('phone')}
                onPress={() => UTILS.dialPhone('9218223676')}
              />
              // </Row>
            )} */}
            {['start', 'accepted', 'delivered'].includes(orderData?.status) && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.grey,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  paddingHorizontal: mvs(10),
                  paddingVertical: mvs(5),
                  borderRadius: mvs(6),
                }}
                onPress={() => UTILS.dialPhone(orderData?.phone)}>
                <Row style={{alignItems: 'center'}}>
                  <Foundation
                    name="telephone"
                    color={colors.white}
                    size={mvs(20)}
                  />
                  {/* <PrimaryButton
                  containerStyle={styles.rejectbutton}
                  textStyle={{color: colors.primary}}
                  // loading={loading}
                  title={t('chat_now')}
                  onPress={() => {
                    onMessagePress(orderData?.user_id);
                    // Handle the action when the "Start" button is pressed
                    // You can add your logic here
                  }}
                /> */}
                  <Medium
                    label={t('call')}
                    color={colors.white}
                    fontSize={mvs(16)}
                    style={{marginLeft: mvs(6)}}
                  />
                </Row>
              </TouchableOpacity>
            )}
          </Row>
        </View>
      )}
    </View>
  );
};
export default OrderDetailsScreen;
