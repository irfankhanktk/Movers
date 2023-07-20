import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {ADVICE_FROM_US_LIST, SERVICE_LIST} from 'config/constants';
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
import AdiviceFromUsCard from 'components/molecules/adivice-from-us-card';
const AdviceFromUsScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderServiceList = ({item}) => (
    <AdiviceFromUsCard
      item={item}
      // onPress={() =>
      //   props?.navigation?.navigate(item?.screen, {title: t(item?.title)})
      // }
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('advice_from_us')} />

      <View style={styles.body}>
        <CustomFlatList
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={ADVICE_FROM_US_LIST}
          renderItem={renderServiceList}
          ItemSeparatorComponent={itemSeparatorComponent()}
        />
      </View>
    </View>
  );
};
export default AdviceFromUsScreen;
