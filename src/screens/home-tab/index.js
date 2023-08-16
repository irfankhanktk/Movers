import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
import * as IMG from 'assets/images';
import {colors} from 'config/colors';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderServiceList = ({item, index}) => (
    <ServiceCard
      backgroundColor={index % 1.5 === 0 ? colors.homecard2 : colors.homecard1}
      item={item}
      onPress={() => props?.navigation?.navigate(item?.screenName)}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={{width: '100%', height: '100%'}}>
        <Header1x2x back={false} />
        <Medium
          label={'Hi Ali Abdullah'}
          fontSize={mvs(20)}
          color={colors.white}
          style={{marginLeft: mvs(25)}}
        />
        <HomeSwiper />
        <View style={styles.body}>
          <CustomFlatList
            ListHeaderComponent={
              <View style={{marginBottom: mvs(10)}}>
                <Bold label={t('quick_tools')} style={styles.heading} />
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
      </ImageBackground>
    </View>
  );
};
export default HomeTab;
