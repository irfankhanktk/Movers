import CustomFlatList from 'components/atoms/custom-flatlist';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
const HomeTab = props => {
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
      <Header1x2x back={false} />
      <SwiperCard />
      <View style={styles.body}>
        <Bold label={t('our_services')} style={styles.heading} />
        <Medium
          label={t(
            'At GetMovers, our goal is to make moving as cheap and hassle-free as it possibly could be. With us, you get:',
          )}
          style={styles.normaltext}
          numberOfLines={2}
        />

        <CustomFlatList
          numColumns={2}
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={SERVICE_LIST}
          renderItem={renderServiceList}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      </View>
    </View>
  );
};
export default HomeTab;
