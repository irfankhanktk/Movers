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

const OrderDetailsScreen = props => {
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
    <ItemDetailsCard item={item} />
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  const origin = {latitude: 37.78825, longitude: -122.4324};
  const destination = {latitude: 37.7749, longitude: -122.4194};
  return (
    <View style={styles.container}>
      <Header1x2x title={t('order_details')} />
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{height: mvs(250)}}>
            <CustomMap>
              <Marker
                // coordinate={{latitude: 37.78825, longitude: -122.4324}}
                coordinate={{latitude: 37.78825, longitude: -122.4324}}
                title="Marker Title"
                description="Marker Description"
              />
              <MapDirections
                origin={origin}
                destination={destination}
                strokeWidth={3}
                strokeColor="blue"
              />
            </CustomMap>
          </View>
          <View style={styles.contentContainerStyle}>
            <OrderDetailsCard item={ORDER_DETAILS_LIST} />

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
              data={ITEM_DETAILS_LIST}
              renderItem={renderAppointmentItem}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              // ItemSeparatorComponent={itemSeparatorComponent()}
              keyExtractor={(_, index) => index?.toString()}
            />
          </View>
        </ScrollView>
        <Row
          style={{
            paddingHorizontal: mvs(20),
            alignItems: 'center',
            marginBottom: mvs(20),
            paddingTop: mvs(16),
          }}>
          <PrimaryButton
            containerStyle={styles.acceptbutton}
            loading={loading}
            // onPress={() => navigate('Signup')}
            title={t('accept')}
          />
          <PrimaryButton
            containerStyle={styles.rejectbutton}
            // textStyle={colors.primary}
            loading={loading}
            textStyle={{color: colors.primary}}
            // onPress={() => navigate('Signup')}
            title={t('reject')}
          />
        </Row>
      </View>
    </View>
  );
};
export default OrderDetailsScreen;
