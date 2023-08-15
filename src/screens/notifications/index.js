import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import { EmptyList } from 'components/atoms/empty-list';
import CustomFlatList from 'components/atoms/custom-flatlist';

const Notifications = props => {
  const dispatch = useAppDispatch();
  const { userInfo, notifications } = useAppSelector(s => s.user);
  const { t } = i18n;
  const [loading, setLoading] = React.useState(false);
  const readNotifications = async () => {
    try {

    } catch (error) {
      console.log('error=>', error);
    }
  };

  useEffect(() => {
  }, []);
  const renderAppointmentItem = ({ item, index }) => (
    <View
      key={index}
      style={[
        styles.rendercontainer,
        { backgroundColor: item?.is_read ? colors.white : colors?.blueHalf },
      ]}>
      <Row style={{ justifyContent: 'flex-start' }}>

        <View style={styles.titleandtextview}>
          <Row>
            <Medium label={item.title} />
          </Row>
          <Regular label={item.text} numberOfLines={3} />
        </View>
      </Row>
      <Regular
        label={moment(item.created_at).format('DD MMM, YYYY  hh:mm a')}
        style={{ alignSelf: 'flex-end' }}
        fontSize={mvs(12)}
        color={colors.primary}
      />
    </View>
  );
  const itemSeparatorComponent = () => {
    return <View style={{ paddingVertical: mvs(5) }}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('notifications')} />
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default Notifications;
