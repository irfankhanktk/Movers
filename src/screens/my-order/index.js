import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, Image, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {EmptyList} from 'components/atoms/empty-list';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import MyOrderCard from 'components/molecules/my-order-card';
import {ORDER_LIST} from 'config/constants';
import {getOrderListList} from 'services/api/auth-api-actions';

const MyOrderScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);

  React.useEffect(() => {
    getList();
  }, []);
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
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
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
            title={t('pending')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'pending' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'pending' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'pending') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('pending');
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
