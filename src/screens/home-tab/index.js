import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
import * as IMG from 'assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import {navigate} from 'navigation/navigation-ref';
import {getDirection} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import {setLocation} from 'store/reducers/user-reducer';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  console.log('user', user);
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  React.useEffect(() => {
    UTILS.get_current_location(
      position => {
        const lat = position?.coords?.latitude;
        const long = position?.coords?.longitude;

        // Dispatch the location to Redux
        dispatch(
          setLocation({
            latitude: lat,
            longitude: long,
          }),
        );

        // Set latitude and longitude in component state
        setLatitude(lat);
        setLongitude(long);

        // Console log the latitude and longitude
        console.log('Latitude:', lat);
        console.log('Longitude:', long);
      },
      error => {
        // Handle the error here if needed
        console.error('Error fetching location:', error);
      },
    );
  }, [dispatch]);
  // const latitude = user?.location?.latitude;
  // const longitude = user?.location?.longitude;
  const fetchDirection = async setLoading => {
    try {
      setLoading(true);
      const res = await getDirection(latitude, longitude);
      // setData(res);
    } catch (error) {
      console.log('Error in direction====>', error);
      Alert.alert('get Directioin Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDirection(setLoading);
    const intervalId = setInterval(() => {
      fetchDirection(() => {});
    }, 25000); // 25 seconds in milliseconds
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [latitude, longitude]);
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
        style={styles.backgroundimg}>
        <Header1x2x
          back={false}
          style={{backgroundColor: colors.transparent}}
        />
        <Row
          style={{
            alignItems: 'center',

            paddingHorizontal: mvs(20),
          }}>
          <Medium
            label={`Hi, ${
              userInfo?.first_name +
              ' ' +
              userInfo?.middle_name +
              ' ' +
              userInfo?.surname
            }`}
            fontSize={mvs(20)}
            color={colors.white}
          />
          <TouchableOpacity onPress={() => navigate('Notifications')}>
            <Ionicons
              name={'notifications'}
              color={colors.white}
              size={mvs(25)}
            />
          </TouchableOpacity>
        </Row>
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
