import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  return (
    <View style={styles.container}>
      <Header1x2x back={false} />
      {/* <SwiperCard /> */}
      <HomeSwiper />
      <View style={styles.body}>
        <Bold label={t('our_services')} style={styles.heading} />
        <Medium
          label={t(
            'At GetMovers, our goal is to make moving as cheap and hassle-free as it possibly could be. With us, you get:',
          )}
          style={styles.normaltext}
          numberOfLines={2}
        />

        {/* <CustomFlatList
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        /> */}
      </View>
    </View>
  );
};
export default HomeTab;
