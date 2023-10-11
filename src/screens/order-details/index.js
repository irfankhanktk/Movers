import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
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
import {getDistance, getOrderDetails} from 'services/api/auth-api-actions';

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
  const [total, setTotal] = React.useState({});
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
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
            {orderData?.status === 'accepted' && (
              <PrimaryButton
                containerStyle={styles.acceptbutton}
                // loading={loading}
                title={t('start')}
                onPress={() => {
                  // Handle the action when the "Start" button is pressed
                  // You can add your logic here
                }}
              />
            )}
            {/* <PrimaryButton
              containerStyle={styles.rejectbutton}
              // textStyle={colors.primary}
              loading={loading}
              textStyle={{color: colors.primary}}
              // onPress={() => navigate('Signup')}
              title={t('reject')}
            /> */}
          </Row>
        </View>
      )}
    </View>
  );
};
export default OrderDetailsScreen;
