import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {EmptyList} from 'components/atoms/empty-list';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import MyOrderCard from 'components/molecules/my-order-card';
import {ORDER_LIST, RECENT_ORDER_LIST} from 'config/constants';
import * as IMG from 'assets/images';
import RecentOrderCard from 'components/molecules/recent-order-card';
import {getOrderHistory} from 'services/api/auth-api-actions';
import {useIsFocused} from '@react-navigation/native';
const HistoryScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [orderData, setOrderData] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocus = useIsFocused();
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };

  React.useEffect(() => {
    if (isFocus) {
      getList();
    }
  }, [isFocus]);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getOrderHistory();
      setOrderData(res);

      console.log(res);
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
  const renderAppointmentItem = ({item, index}) => (
    <RecentOrderCard
      item={item}
      onPressDetails={() => props?.navigation?.navigate('OrderDetailsScreen')}
    />
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  const formatNumber = number => {
    // Convert the string to a floating-point number and format it with 2 decimal places
    return parseFloat(number).toFixed(2);
  };
  const formattedTotalEarning = formatNumber(orderData?.total_earing);

  return (
    <View style={styles.container}>
      <Header1x2x title={t('history')} />
      <View style={styles.contentContainerStyle}>
        <Row>
          <TouchableOpacity style={styles.earningtoucbaleview}>
            <Image
              source={IMG.historyearning}
              resizeMode="contain"
              style={styles.earningimg}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('total_earnings')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{paddingHorizontal: mvs(14), marginTop: mvs(10)}}
              />
              <Regular
                label={formattedTotalEarning}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />

              <View style={styles.currencyview}>
                <Regular
                  label={'USD'}
                  color={colors.white}
                  fontSize={mvs(12)}
                  style={{paddingHorizontal: mvs(14)}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.compleetdorderview}>
            <Image
              source={IMG.historyCart}
              resizeMode="contain"
              style={styles.completedorderimage}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('completed_order')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{
                  paddingHorizontal: mvs(14),
                  marginTop: mvs(10),
                  width: mvs(160),
                }}
                numberOfLines={2}
              />
              <Regular
                label={orderData?.total_orders_count}
                color={colors.white}
                fontSize={mvs(20)}
                style={{
                  paddingHorizontal: mvs(14),
                  alignSelf: 'center',
                  marginTop: mvs(6),
                }}
              />

              {/* <Regular
                label={t('latest_delivery')}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />
              <Regular
                label={'Yesterday 02:27 pm'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              /> */}
            </View>
          </TouchableOpacity>
        </Row>
        <Medium
          label={t('recent_orders')}
          fontSize={mvs(16)}
          style={{marginTop: mvs(12)}}
        />
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            // emptyList={<EmptyList label={t('no_notification')} />}
            contentContainerStyle={styles.contentContainerStyleFlatlist}
            showsVerticalScrollIndicator={false}
            data={orderData?.total_orders || []}
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#ff0000', '#00ff00', '#0000ff']}
              />
            }
            keyExtractor={(_, index) => index?.toString()}
          />
        )}
      </View>
    </View>
  );
};
export default HistoryScreen;
