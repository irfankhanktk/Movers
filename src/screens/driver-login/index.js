import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
const DriverLoginScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderServiceList = ({item}) => (
    <ServiceCard
      item={item}
      // onPress={() =>
      //   props?.navigation?.navigate(item?.screen, {title: t(item?.title)})
      // }
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('driver_login')} />
      <HomeSwiper />
      <View style={styles.body}>
        <CustomFlatList
          ListHeaderComponent={
            <View style={{marginBottom: mvs(10)}}>
              <Bold label={t('our_services')} style={styles.heading} />
              <Medium
                label={t(
                  'At GetMovers, our goal is to make moving as cheap and hassle-free as it possibly could be. With us, you get:',
                )}
                style={styles.normaltext}
                numberOfLines={2}
              />
              <Image
                source={{
                  uri: 'https://getmovers.co.uk/static/media/banr.ae434e08.png',
                }}
                style={{
                  height: mvs(100),
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: mvs(10),
                }}
              />
            </View>
          }
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={SERVICE_LIST}
          renderItem={renderServiceList}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={itemSeparatorComponent()}
        />
      </View>
    </View>
  );
};
export default DriverLoginScreen;
