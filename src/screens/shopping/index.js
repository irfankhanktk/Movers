import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {colors} from 'config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row} from 'components/atoms/row';
import {UTILS} from 'utils';
import CustomMap from 'components/atoms/custom-map';
import {getContactUs} from 'services/api/auth-api-actions';
import HtmlView from '../../components/atoms/render-html';
import {Marker} from 'react-native-maps';
import MapDirections from 'components/atoms/map-directions';
import {Loader} from 'components/atoms/loader';
const ShoppingScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  const [orderData, setOrderData] = React.useState({});
  React.useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getContactUs();
      setOrderData(res);

      console.log(res);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const origin = {
    latitude: orderData?.latitude * 1 || 37.78825,
    // latitude: 37.78825,
    longitude: orderData?.longitude * 1 || -122.4324,
    // longitude: -122.4324,
  };
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('contact_us')} />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.body}>
          {orderData ? (
            <>
              <View style={styles.contentContainerStyleNew}>
                <Row
                  style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="content-save-move"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                  <HtmlView html={orderData?.contact_us} />
                </Row>
              </View>
              <View style={styles.contentContainerStyleNew}>
                <Row
                  style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="home"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                  <Medium
                    label={orderData?.contact_address}
                    style={{marginLeft: mvs(6)}}
                    numberOfLines={2}
                  />
                </Row>
              </View>
              <View style={styles.contentContainerStyleNew}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(orderData?.contact_email)}>
                  <Row
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="email"
                      color={colors.primary}
                      size={mvs(26)}
                    />
                    <Medium
                      label={orderData?.contact_email}
                      style={{marginLeft: mvs(6)}}
                      numberOfLines={2}
                    />
                  </Row>
                </TouchableOpacity>
              </View>
              <View style={styles.contentContainerStyleNew}>
                <TouchableOpacity
                  onPress={() => UTILS.dialPhone(orderData?.contact_phone)}>
                  <Row
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="phone"
                      color={colors.primary}
                      size={mvs(26)}
                    />
                    <Medium
                      label={orderData?.contact_phone}
                      style={{marginLeft: mvs(6)}}
                      numberOfLines={2}
                    />
                  </Row>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.contentContainerStyleNew}>
          <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="phone-classic"
              color={colors.primary}
              size={mvs(26)}
            />
            <Medium
              label={'0800 6358889'}
              style={{marginLeft: mvs(6)}}
              numberOfLines={2}
            />
          </Row>
        </View> */}
              <View style={styles.contentContainerStyleNew}>
                <Medium
                  label={t('reach_out_at')}
                  color={colors.primary}
                  style={{marginBottom: mvs(10)}}
                />
                <Row>
                  <MaterialCommunityIcons
                    onPress={() =>
                      Linking?.openURL(orderData?.contact_facebook)
                    }
                    // onPress={() =>
                    //   UTILS.openFacebookLink(orderData?.contact_facebook)
                    // }
                    name="facebook"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                  <MaterialCommunityIcons
                    onPress={() => Linking?.openURL(orderData?.contact_x)}
                    // onPress={() => UTILS.openTwitterLink(orderData?.contact_x)}
                    name="twitter"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                  <MaterialCommunityIcons
                    onPress={() =>
                      Linking?.openURL(orderData?.contact_instagram)
                    }
                    // onPress={() =>
                    //   UTILS.openInstagramLink(orderData?.contact_instagram)
                    // }
                    name="instagram"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                  <MaterialCommunityIcons
                    onPress={() =>
                      Linking?.openURL(orderData?.contact_linkedin)
                    }
                    // onPress={() =>
                    //   UTILS.openLinkedInLink(orderData?.contact_linkedin)
                    // }
                    name="linkedin"
                    color={colors.primary}
                    size={mvs(26)}
                  />
                </Row>
              </View>
              <CustomMap
                initialRegion={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}>
                <Marker coordinate={origin} />
              </CustomMap>
            </>
          ) : (
            <Medium label={t('no_order_data')} /> // Render an empty state when orderData is not available yet
          )}
        </View>
      )}
    </View>
  );
};
export default ShoppingScreen;
