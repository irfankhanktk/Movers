import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, Image, View, TouchableOpacity} from 'react-native';
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
const HistoryScreen = props => {
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
    <RecentOrderCard
      item={item}
      onPressDetails={() => props?.navigation?.navigate('OrderDetailsScreen')}
    />
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('history')} />
      <View style={styles.contentContainerStyle}>
        <Row>
          <TouchableOpacity
            style={{
              width: '45%',
              height: mvs(162),
              ...colors.shadow,
              borderRadius: mvs(6),
              backgroundColor: colors.primary,
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <Image
              source={IMG.historyearning}
              resizeMode="contain"
              style={{
                width: mvs(50),
                height: mvs(50),
                alignSelf: 'center',
                marginTop: mvs(12),
              }}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('total_earnings')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{paddingHorizontal: mvs(14), marginTop: mvs(10)}}
              />
              <Regular
                label={'$2500000'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />

              <View
                style={{
                  backgroundColor: '#C21818',
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  paddingVertical: mvs(2),
                  borderRadius: mvs(6),
                }}>
                <Regular
                  label={'USD'}
                  color={colors.white}
                  fontSize={mvs(12)}
                  style={{paddingHorizontal: mvs(14)}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '45%',
              height: mvs(162),
              ...colors.shadow,
              borderRadius: mvs(6),
              backgroundColor: colors.bluecolor,
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <Image
              source={IMG.historyCart}
              resizeMode="contain"
              style={{
                width: mvs(50),
                height: mvs(50),
                alignSelf: 'center',
                marginTop: mvs(12),
              }}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('completed_order')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{paddingHorizontal: mvs(14), marginTop: mvs(10)}}
              />
              <Regular
                label={'100'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />

              <Regular
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
              />
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
            data={RECENT_ORDER_LIST}
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent()}
            keyExtractor={(_, index) => index?.toString()}
          />
        )}
      </View>
    </View>
  );
};
export default HistoryScreen;
