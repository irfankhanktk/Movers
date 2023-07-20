import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {ABOUT_US_LIST, SERVICE_LIST} from 'config/constants';
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
import AboutUsCard from 'components/molecules/about-us-card';
import {colors} from 'config/colors';
import GoogleSearchBar from 'components/atoms/google-auto-place';
import {PrimaryButton} from 'components/atoms/buttons';
const WhereToMoveScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('where_to_move')} />

      <View style={styles.body}>
        <View
          style={{
            alignSelf: 'center',
            paddingVertical: mvs(10),
          }}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/van.9c8fd615.jpg',
            }}
            style={{width: mvs(300), height: mvs(100), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Medium
            label={t('We are saving your money and time by')}
            color={colors.primary}
            fontSize={mvs(16)}
          />
          <Medium
            label={t('moving your goods at your place')}
            fontSize={mvs(14)}
            style={{fontStyle: 'italic'}}
            color={colors.primary}
          />
        </View>
        <View style={{paddingVertical: mvs(10)}}>
          <GoogleSearchBar placeholder={'Pickup Location or PostCode'} />
        </View>
        <GoogleSearchBar placeholder={'DropOff Location or PostCode'} />
        <View style={{justifyContent: 'flex-end'}}>
          <PrimaryButton
            // onPress={() => setCardModal(true)}
            // onPress={() =>
            //   navigate('CarPriceDetailScreen', {
            //     carId: carDetails?.row?.id,
            //     carDetails,
            //   })
            // }
            title={t('next')}
            containerStyle={styles.searchContainer}
          />
        </View>
      </View>
    </View>
  );
};
export default WhereToMoveScreen;
