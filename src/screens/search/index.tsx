import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplashIcon} from 'assets/icons';
import {
  eye,
  profile,
  left,
  profile_pic,
  orders_plus,
  orders,
  inbox,
  setting,
  down,
} from 'assets/images';
import React, {Fragment} from 'react';
import {ImageBackground, Image, View} from 'react-native';
import i18n from 'translation';
import {STORAGEKEYS} from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import {UTILS} from 'utils';
import {useAppDispatch} from 'hooks/use-store';
import styles from './styles';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {Row} from 'components/atoms/row';
import {mvs, width} from 'config/metrices';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import Line from 'components/atoms/line';
import MeCard from 'components/molecules/me-card';
import SearchItemCard from 'components/molecules/search-item-card';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Search = (props: props) => {
  const data = [
    {title: 'Apple juices', icon: left},
    {title: 'Apple juices', icon: left},
    {title: 'Apple juices', icon: left},
    {title: 'Apple juices', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
    {title: 'Pakistani Dishes', icon: left},
  ];
  const {navigation} = props;
  return (
    <View style={{...styles.container}}>
      <Header1x2x
        title={''}
        mtop={47}
        placeholder={'Search for  categories'}
        back={false}
        isSearch
      />
      <Row style={styles.category}>
        <Bold label={'Categories'} fontSize={mvs(15)} color={colors.black} />
        <Row>
          <Bold label={'A-Z'} fontSize={mvs(15)} color={colors.grey} />
          <Image source={down} style={styles.down} />
        </Row>
      </Row>
      {data.map((item, index) => (
        <Fragment key={index}>
          <SearchItemCard item={item} />
          <Line marginVertica={3} />
        </Fragment>
      ))}
      {/* <Bold
        label={'Log Out'}
        color={colors.primary}
        fontSize={mvs(15)}
        onPress={() => {}}
        style={styles.logout}
      /> */}
    </View>
  );
};
export default Search;
