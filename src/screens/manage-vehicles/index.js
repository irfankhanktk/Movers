import {useIsFocused} from '@react-navigation/native';
import {PlusButton} from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import MangeVehcileCard from 'components/molecules/manage-vehicle-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getVehcileList} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import styles from './styles';

const ManageVehicleScreen = props => {
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [vehcileLists, setVehicleLists] = React.useState([]);

  const [selectedOrder, setSelectedOrder] = React.useState('');
  React.useEffect(() => {
    if (isFocus) {
      getList();
    }
  }, [isFocus]);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getVehcileList();
      setVehicleLists(res?.vehicles);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  const renderAppointmentItem = ({item, index}) => (
    <MangeVehcileCard
      // backgroundColor={
      //   index === 0
      //     ? colors.primary
      //     : index === 1
      //     ? colors.bluecolor
      //     : '#434343'
      // }
      backgroundColor={
        index % 2 === 0 ? colors.primary : colors.bluecolor
        // : '#434343'
      }
      item={item}
      // onPressDetails={() => props?.navigation?.navigate('OrderDetailsScreen')}
      onPressEdit={() =>
        props?.navigation?.navigate('AddVehicleScreen', {
          vehicle: item,
        })
      }
    />
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(10)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('manage_vehicle')} />
      <View style={styles.contentContainerStyle}>
        <Medium
          label={t('vehicle_details')}
          fontSize={mvs(16)}
          color={colors.black}
        />
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            // emptyList={<EmptyList label={t('no_notification')} />}
            contentContainerStyle={styles.contentContainerStyleFlatlist}
            showsVerticalScrollIndicator={false}
            data={vehcileLists}
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent()}
            keyExtractor={(_, index) => index?.toString()}
          />
        )}

        <PlusButton
          containerStyle={styles.plusbutton}
          onPress={() => navigate('AddVehicleScreen')}
        />
      </View>
    </View>
  );
};
export default ManageVehicleScreen;
