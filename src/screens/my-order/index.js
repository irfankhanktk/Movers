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

const MyOrderScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState('');
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
      onPressDetails={() => props?.navigation?.navigate('OrderDetailsScreen')}
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
            title={t('new')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'New' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color: selectedOrder === 'New' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'New') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('New');
              }
            }}
          />
          <PrimaryButton
            title={t('processing')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'processing' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'processing' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'processing') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('processing');
              }
            }}
          />
          <PrimaryButton
            title={t('delieverd')}
            containerStyle={{
              width: mvs(88),
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'delieverd' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'delieverd' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'delieverd') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('delieverd');
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
                ? ORDER_LIST
                : ORDER_LIST?.filter(item => item?.type === selectedOrder)
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
